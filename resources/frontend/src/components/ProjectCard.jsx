import React from 'react'

function ProjectCard({ project, index }) {
    return (
        <div
            key={project.id}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            style={{ animationDelay: `${index * 0.2}s` }}
        >
            <div className="relative overflow-hidden">
                <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h4>
                <p className="text-gray-600 mb-3">{project.location}</p>
                <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {project.type === 'home' ? 'Home' : 'Apartment'}
                    </span>
                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        View Details →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
