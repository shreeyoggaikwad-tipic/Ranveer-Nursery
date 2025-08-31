import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import host from "../../utils/host";
import { Loader2, FileDown } from "lucide-react";

function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${host}/api/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const res = await axios.patch(
        `${host}/api/inquiries/${id}/toggle-served`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInquiries((prev) => {
        const updated = prev.map((inq) =>
          inq.id === id
            ? { ...inq, request_served: res.data.request_served }
            : inq
        );
        // Sort by pending first
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
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inquiries.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("CSV download failed:", error);
      alert("Failed to export inquiries. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-500"></div>
          <p className="text-green-700 font-medium">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <AdminNav />
      <div className="flex flex-col justify-center items-center">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-green-600 mb-4">
              Client <span className="bg-black bg-clip-text text-transparent">Inquiries</span>
            </h1>
            <p className="text-green-700 max-w-xl">
              Manage and track all customer inquiries in one place.
            </p>

            <button
              onClick={downloadCSV}
              className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              <FileDown className="w-5 h-5" />
              Export to CSV
            </button>
          </div>
        </section>

        {/* Inquiries Table */}
        <div className="w-[90%] lg:w-[80%] mb-20 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
            {inquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-green-100 text-green-800 text-left text-sm font-semibold uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-4 border-b">#</th>
                      <th className="px-6 py-4 border-b">Name</th>
                      <th className="px-6 py-4 border-b">Email</th>
                      <th className="px-6 py-4 border-b">Phone</th>
                      <th className="px-6 py-4 border-b">Message</th>
                      <th className="px-6 py-4 border-b text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-600">
                    {inquiries.map((inq, index) => (
                      <tr
                        key={inq.id}
                        className="hover:bg-green-50 transition-colors"
                      >
                        <td className="px-6 py-4 border-b">{index + 1}</td>
                        <td className="px-6 py-4 border-b">{inq.name}</td>
                        <td className="px-6 py-4 border-b">{inq.email}</td>
                        <td className="px-6 py-4 border-b">{inq.phone}</td>
                        <td className="px-6 py-4 border-b">{inq.message}</td>
                        <td className="px-6 py-4 border-b text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => toggleRequestServed(inq.id)}
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ease-in-out ${
                                inq.request_served
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                              role="switch"
                              aria-checked={inq.request_served}
                            >
                              <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                                  inq.request_served ? "translate-x-9" : "translate-x-1"
                                }`}
                              />
                            </button>
                            <span
                              className={`ml-3 text-sm font-semibold ${
                                inq.request_served ? "text-green-600" : "text-gray-500"
                              }`}
                            >
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
      </div>

      {/* Animations */}
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
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ManageInquiries;
