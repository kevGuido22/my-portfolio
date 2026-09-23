"use client";

import { useState } from "react";
import Card from "./Card.tsx";

const projects = [
    {
        number: "01",
        title: "SpringBoot Microservices",
        img: "/images/micro-services.webp",
        description: "Microservices architecture with Docker, API Gateway, Flyway, and Resilience4j for resilient distributed systems.",
        categories: ["backend"],
        tags: ["SpringBoot", "Docker", "API Gateway", "Flyway", "Keycloak"],
        gitHub: "https://github.com/kevGuido22/microservices-project",
    },
    {
        number: "02",
        title: "Spotify Clone",
        img: "/images/spotify.webp",
        description: "Spotify clone with Astro, React, TypeScript, and Zustand for global state management.",
        categories: ["frontend"],
        tags: ["Astro", "React", "TypeScript", "Tailwind", "Zustand"],
        web: "https://spotify-clone-rho-bay.vercel.app/",
        gitHub: "https://github.com/kevGuido22/spotify-clone",
    },
    {
        number: "03",
        title: "Suru - Frontend",
        img: "/images/suru-frontend.webp",
        description: "Real estate platform with React, React Router, and Tailwind CSS featuring login, settings, and dashboard.",
        categories: ["frontend"],
        tags: ["React", "TailwindCSS", "React Router"],
        web: "https://suru-development.vercel.app/",
        gitHub: "https://github.com/Agile-Innovators/SURU-Development",
    },
    {
        number: "04",
        title: "Suru - Backend",
        img: "/images/api-laravel.webp",
        description: "RESTful API with Laravel, MySQL, JWT authentication, and Cloudinary for image management.",
        categories: ["backend"],
        tags: ["Laravel", "PHP", "MySQL", "JWT", "Cloudinary"],
        gitHub: "https://github.com/Agile-Innovators/suru-backend",
    },
];

export default function ProjectSection() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all"
        ? projects
        : projects.filter((p) => p.categories.includes(activeFilter));

    const hasOtherProjects = activeFilter !== "all" && projects.some((p) => p.categories.includes(activeFilter));

    return (
        <section className="section" id="projects">
            <div className="max-w-screen-lg m-auto">
                <h2 className="text-white text-5xl text-center font-primary font-semibold mb-16">Projects</h2>

                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-surface border border-border rounded-lg p-1 gap-1">
                        {["all", "frontend", "backend"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-md text-sm font-primary transition-all duration-300 ${
                                    activeFilter === filter
                                        ? "bg-gold/10 text-gold border border-gold"
                                        : "text-text-muted hover:text-text-secondary"
                                }`}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 && hasOtherProjects ? (
                    <p className="text-text-muted text-center font-primary text-lg">Aun no hay proyectos por mostrar</p>
                ) : (
                    <div className="flex flex-col gap-8">
                        {filtered.map((project) => (
                            <Card key={project.number} {...project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
