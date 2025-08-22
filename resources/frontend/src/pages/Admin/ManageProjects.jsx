import React, { useState, useEffect } from 'react';
import { Building2, Filter, Home, Building, Award, Calendar, Plus } from 'lucide-react';
import ProjectCard from '../../components/ProjectCard';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import { Link } from 'react-router-dom';

function ManageProjects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects")
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProject = (deletedId) => {
    setProjects(prev => prev.filter(project => project.id !== deletedId));
  };

  const filterOptions = [
    { key: 'all', label: 'All Projects', icon: <Building2 className="w-4 h-4" /> },
    { key: 'home', label: 'Custom Homes', icon: <Home className="w-4 h-4" /> },
    { key: 'apartment', label: 'Apartments', icon: <Building className="w-4 h-4" /> },
    { key: 'completed', label: 'Completed', icon: <Award className="w-4 h-4" /> },
    { key: 'in-progress', label: 'In Progress', icon: <Calendar className="w-4 h-4" /> }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' ||
      project.type === activeFilter ||
      project.status === activeFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <AdminNav />

      <div className="bg-white py-10 flex flex-col items-center animate-fade-in">
        <h1 className="text-6xl font-bold text-center">
          Manage <span className="text-blue-600">Projects</span>
        </h1>
        {/* Add Project Button */}
        <Link to="/admin/addProject"
          className="mt-10 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="text-gray-500 w-5 h-5" />
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setActiveFilter(option.key)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${activeFilter === option.key
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filteredProjects.length > 0 ? (
          <>
            <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {activeFilter === 'all' ? 'All Projects' : `${filterOptions.find(f => f.key === activeFilter)?.label}`}
              </h2>
              <p className="text-gray-600 text-lg">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
            `}</style>
    </div>
  )
}

export default ManageProjects;
