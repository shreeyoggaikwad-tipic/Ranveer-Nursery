import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

function ServiceCard({ service, index, onDelete, onEdit }) {
    const token = localStorage.getItem("token"); 
    const isAdmin = !!token; // if token exists, assume admin is logged in

    const navigate = useNavigate();

    // Parse photos if stored as JSON array
    const photos = service.photos_urls;

     const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this service?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/services/${service.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("✅ Service deleted successfully!");
            if (onDelete) onDelete(service.id); // notify parent to remove from state
        } catch (error) {
            console.error("❌ Error deleting service:", error.response || error);
            alert("Failed to delete service. Check console for details.");
        }
    };

    return (
        <div
            key={service.id}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 group"
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            {/* Service Image */}
            {photos && photos.length > 0 && (
                <img
                    src={photos[0]}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-2xl mb-6"
                />
            )}

            <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>

            <div className="mt-5 flex justify-between items-center">
                {isAdmin ? (
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/admin/editService/${service.id}`)}
                            className="text-green-600 font-semibold hover:text-green-800 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 font-semibold hover:text-red-800 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <Link
                        to={`/services/${service.id}`}
                        className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                        View Details →
                    </Link>
                )}
            </div>
        </div>
    );
}

export default ServiceCard;
