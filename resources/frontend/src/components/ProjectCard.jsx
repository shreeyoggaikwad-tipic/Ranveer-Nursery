import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import host from '../utils/host'


function ProjectCard({ project, index, onDelete }) {
    const token = localStorage.getItem("token"); // 👈 check admin auth
    const isAdmin = !!token;

    const navigate = useNavigate();


    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;

        try {
            await axios.delete(`${host}/api/projects/${project.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("✅ Project deleted successfully!");
            if (onDelete) onDelete(project.id); // notify parent to remove from state
        } catch (error) {
            console.error("❌ Error deleting project:", error.response || error);
            alert("Failed to delete project. Check console for details.");
        }
    };

    return (
        <div
            key={project.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            style={{ animationDelay: `${index * 0.2}s` }}
        >
            <div className="relative overflow-hidden">
                <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                    >
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h4>
                <p className="text-gray-600 mb-3">{project.location}</p>
                <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-orange-100 text-orange-500 rounded-full text-sm font-medium">
                        {project.type === 'home' ? 'Home' : 'Apartment'}
                    </span>

                    {isAdmin ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(`/admin/editProject/${project.id}`)}
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
                            to={`/projects/${project.id}`}
                            className="text-orange-400 font-semibold hover:text-orange-600 transition-colors"
                        >
                            View Details →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
