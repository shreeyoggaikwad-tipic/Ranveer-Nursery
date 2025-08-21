import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import AdminNav from "../../components/AdminNav";
import { Plus } from 'lucide-react';


function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/inquiries", {
        headers: {
          Authorization: `Bearer ${token}`, // 🔑 Send Sanctum token
          Accept: "application/json",
        },
        withCredentials: true, // optional if using Sanctum cookies
      })
      .then((res) => {
        setInquiries(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching inquiries:", err.response?.data || err);
      })
      .finally(() => setLoading(false));
  }, []);

  const downloadCSV = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://127.0.0.1:8000/api/inquiries/export", {
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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

      {/* Inquiries Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading inquiries...</div>
        ) : inquiries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {inquiries.map((inq, index) => (
              <div
                key={inq.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {inq.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-gray-600 mb-2">
                  <Mail className="w-5 h-5" />
                  <span>{inq.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 mb-2">
                  <Phone className="w-5 h-5" />
                  <span>{inq.phone}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <span>Message:</span>
                  </div>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">
                    {inq.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Inquiries Found
              </h3>
              <p className="text-gray-500">
                Once clients submit inquiries through the contact form, they
                will appear here.
              </p>
            </div>
          </div>
        )}
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
