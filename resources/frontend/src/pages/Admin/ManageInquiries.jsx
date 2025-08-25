import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import AdminNav from "../../components/AdminNav";
import host from '../../utils/host'


function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${host}/api/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`, // 🔑 Send Sanctum token
          Accept: "application/json",
        },
      })
      .then((res) => {
        setInquiries(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching inquiries:", err.response?.data || err);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleRequestServed = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`${host}/api/inquiries/${id}/toggle-served`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInquiries((prev) => {
        const updated = prev.map((inq) =>
          inq.id === id ? { ...inq, request_served: res.data.request_served } : inq
        );
        // Sort updated list
        return updated.sort((a, b) => {
          return a.request_served === b.request_served ? 0 : a.request_served ? 1 : -1;
        });
      });
    } catch (err) {
      console.error("Failed to toggle:", err);
    }
  };



  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${host}/api/inquiries/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // very important!
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inquiries.csv"); // default filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("CSV download failed:", error);
      alert("Failed to export inquiries. Check your token or backend.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AdminNav />

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Client <span className="text-blue-600">Inquiries</span>
          </h1>
          <p className="text-gray-600">
            View and manage all the inquiries received from your website.
          </p>

          <button
            onClick={downloadCSV}
            className="mt-10 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Export to CSV
          </button>
        </div>
      </section>

      <div className="w-[80%] mb-20">
        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading inquiries...</span>
            </div>
          ) : inquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-left text-sm font-semibold">
                  <tr>
                    <th className="px-6 py-3 border-b">Sr. No.</th>
                    <th className="px-6 py-3 border-b">Name</th>
                    <th className="px-6 py-3 border-b">Email</th>
                    <th className="px-6 py-3 border-b">Phone</th>
                    <th className="px-6 py-3 border-b">Message</th>
                    <th className="px-6 py-3 border-b">Request Served</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  {inquiries.map((inq, index) => (
                    <tr
                      key={inq.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3 border-b">{index + 1}</td>
                      <td className="px-6 py-3 border-b">{inq.name}</td>
                      <td className="px-6 py-3 border-b">{inq.email}</td>
                      <td className="px-6 py-3 border-b">{inq.phone}</td>
                      <td className="px-6 py-3 border-b">
                        {inq.message}
                      </td>
                      <td className="px-6 py-3 border-b text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => toggleRequestServed(inq.id)}
                            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ease-in-out ${inq.request_served ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                            role="switch"
                            aria-checked={inq.request_served}
                          >
                            <span
                              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${inq.request_served ? 'translate-x-9' : 'translate-x-1'
                                }`}
                            />
                          </button>
                          <span className={`ml-3 text-sm font-medium ${inq.request_served ? 'text-green-600' : 'text-gray-500'
                            }`}>
                            {inq.request_served ? "Served" : "Pending"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No inquiries found.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ManageInquiries;
