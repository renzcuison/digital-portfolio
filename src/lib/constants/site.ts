export const SiteConfig = {
    name: "renz cuison - portfolio",
    email: "rbboy099@gmail.com",
    links: {
        github: "https://github.com/renzcuison",
        linkedin: "https://linkedin.com/in/renzcuison",
    },
};

export const AboutContent = {
    label: "Creative Web Developer",
    name: "Renz Cuison",
    description: "I am a Creative Web Developer who aspires to create engaging digital experiences. While I am passionate about creative web development, many of my experiencecs was in full-stack development, building and engineering web systems.",
};

export const TechStack = [
    { name: "Next.js", slug: "nextdotjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Supabase", slug: "supabase" },
    { name: "Framer", slug: "framer" },
    { name: "Laravel", slug: "laravel" },
    { name: "Vue.js", slug: "vuedotjs" },
    { name: "React", slug: "react" },
    { name: "MySQL", slug: "mysql" },
    { name: "Tailwind", slug: "tailwindcss" },
    { name: "Figma", slug: "figma" },
];

export const ProjectsContent = {
    badge: "Selected Projects",
    title: "PROJECTS",
    description: "Here are the projects that highlight my journey in building scalable and user-centric applications.",
    githubUrl: "https://github.com/renzcuison",
};

export const Projects = [
    {
        id: "1",
        year: "2024",
        title: "Greatbuy Web App",
        description: "An integrated inventory and e-commerce web application with real-time stock visibility and a modern UI.",
        image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1000",
        tech: ["Vue", "Laravel", "MySQL"],
        github: "https://github.com/renzcuison",
        isBest: false
    },
    {
        id: "2",
        year: "2025",
        title: "ManPro Payroll System",
        description: "A Payroll System with diverse employee management. Developed an exam-type module (similar to Google Forms) for the payroll system.",
        image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000",
        tech: ["React", "Laravel", "MySQL"],
        github: "https://github.com/renzcuison",
        isBest: false
    },
    {
        id: "3",
        year: "2025",
        title: "SK Davao Del Sur Web App",
        description: "SK Davao Del Sur's own website. Led the UI/UX design for a professional yet modern interface with clean layouts and interactive user flows.",
        image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1000",
        tech: ["Figma"],
        github: "https://github.com/renzcuison",
        isBest: false
    },
    {
        id: "4",
        year: "2026",
        title: "Renz Cuison — Portfolio",
        description: "A Digital Portfolio. This marks the start of my Creative Web Development journey. My newest project paired with my latest knowledge.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
        tech: ["Next", "Framer", "Firebase"],
        github: "https://github.com/renzcuison",
        isBest: true
    }
];

export const Pages = [
    {
        id: "about",
        name: "About",
        path: "/about",
        model: "/three-object.glb"
    },
    {
        id: "projects",
        name: "Projects",
        path: "/projects",
        // model: "/projects-object.glb"
    },
    {
        id: "contact",
        name: "Contact",
        path: "/contact",
        // model: "/contact-mail.glb"
    },
] as const;

export type PageId = typeof Pages[number]["id"];