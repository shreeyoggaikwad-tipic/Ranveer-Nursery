import React, { useState, useEffect } from "react";
import axios from "axios";
import host from '../utils/host'


function Status() {

    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch projects
                const projectRes = await axios.get(`${host}/api/projects`);
                const completedProjects = projectRes.data.data.filter(
                    (p) => p.status === "completed"
                ).length;

                // Fetch user (assuming 1st user = admin)
                const userRes = await axios.get(`${host}/api/users/1`);
                const user = userRes.data.data;

                setStats([
                    { number: completedProjects + "+", label: "Projects Completed" },
                    { number: user.happy_clients + "+", label: "Happy Clients" },
                    { number: user.years_of_experience + "+", label: "Years of Experience" },
                    { number: "24/7", label: "Support Available" },
                ]);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);


    return (
        <section className="py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Status;
