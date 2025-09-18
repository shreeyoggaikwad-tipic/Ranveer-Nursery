import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import host from "../../utils/host";
import { Loader2, FileDown, Trash2 } from "lucide-react"; // add Trash icon

function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [inquiries2, setInquiries2] = useState([]);
  // 🆕 Track which nursery is selected
  const [selectedCompany, setSelectedCompany] = useState("ranveer");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${host}/api/inquiries1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        const filtered = (res.data.data || []).filter(
          (inq) => inq.company_id === 1
        );
        setInquiries(filtered);
      })

      .catch((err) => {
        console.error("Error fetching inquiries:", err.response?.data || err);
      })
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${host}/api/inquiries2`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        const filtered = (res.data.data || []).filter(
          (inq) => inq.company_id === 2
        );
        setInquiries2(filtered);
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
        return updated.sort((a, b) =>
          a.request_served === b.request_served ? 0 : a.request_served ? 1 : -1
        );
      });
    } catch (err) {
      console.error("Failed to toggle:", err);
    }
  };

  // 🆕 Delete inquiry
  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${host}/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      setInquiries2((prev) => prev.filter((inq) => inq.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete inquiry. Please try again.");
    }
  };

  // const downloadCSV = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`${host}/api/inquiries/export`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "inquiries.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("CSV download failed:", error);
  //     alert("Failed to export inquiries. Please try again.");
  //   }
  // };

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

            {/* CSV Export button - keep commented if not needed */}
            {/* <button ...>Export</button> */}

            {/* 🆕 Filter Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setSelectedCompany("ranveer")}
                className={`px-6 py-2 rounded-xl font-semibold shadow-md transition ${
                  selectedCompany === "ranveer"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Ranveer Nursery
              </button>
              <button
                onClick={() => setSelectedCompany("amar")}
                className={`px-6 py-2 rounded-xl font-semibold shadow-md transition ${
                  selectedCompany === "amar"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Amar Nursery
              </button>
            </div>
          </div>
        </section>

        {/* Inquiries Table */}
        <div className="w-[90%] lg:w-[80%] mb-20 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
            {(
              selectedCompany === "ranveer" ? inquiries : inquiries2
            ).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-green-100 text-green-800 text-left text-sm font-semibold uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-4 border-b">Sr. No.</th>
                      <th className="px-6 py-4 border-b">Name</th>
                      <th className="px-6 py-4 border-b">Email</th>
                      <th className="px-6 py-4 border-b">Phone</th>
                      <th className="px-6 py-4 border-b">Message</th>
                      {/* {selectedCompany=='amar' ? null : <th className="px-6 py-4 border-b text-center">Status</th>} */}
                      <th className="px-6 py-4 border-b text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-600">
                    {(selectedCompany === "ranveer" ? inquiries : inquiries2).map(
                      (inq, index) => (
                        <tr
                          key={inq.id}
                          className="hover:bg-green-50 transition-colors"
                        >
                          <td className="px-6 py-4 border-b">{index + 1}</td>
                          <td className="px-6 py-4 border-b">{inq.name}</td>
                          <td className="px-6 py-4 border-b">
                            {inq.email ? inq.email : "N/A"}
                          </td>
                          <td className="px-6 py-4 border-b">{inq.phone}</td>
                          <td className="px-6 py-4 border-b">{inq.message}</td>
                          {/* {selectedCompany=='amar' ? null :<td className="px-6 py-4 border-b text-center">
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
                                    inq.request_served
                                      ? "translate-x-9"
                                      : "translate-x-1"
                                  }`}
                                />
                              </button>
                              <span
                                className={`ml-3 text-sm font-semibold ${
                                  inq.request_served
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }`}
                              >
                                {inq.request_served ? "Served" : "Pending"}
                              </span>
                            </div>
                          </td>} */}
                          {/* Delete Action */}
                          <td className="px-6 py-4 border-b text-center">
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
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
    </div>
  );
}

export default ManageInquiries;
