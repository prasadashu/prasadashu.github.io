const articles = [
    {
        id: 1,
        slug: "setting-static-ip-address-for-servers",
        title: "Setting Static IP Address for Servers",
        description: "Understanding what a static IP Address is and how to set a static IP Address on CentOS 8.",
        image: "./articles/setting-static-ip-address-for-servers/cover.jpg",
        contentUrl: "./articles/setting-static-ip-address-for-servers/content.html",
        tags: ["Network", "Engineering"],
        date: "Oct 15, 2023"
    },
    {
        id: 2,
        slug: "tech-stack-review",
        title: "The Modern Tech Stack Review",
        description: "Evaluating the current landscape of frontend and backend technologies. Is React still king? What about Rust for the backend? Let's discuss.",
        image: "./articles/tech-stack-review/cover.jpg",
        contentUrl: "./articles/tech-stack-review/content.html",
        tags: ["React", "Rust", "Architecture"],
        date: "Nov 02, 2023"
    },
    {
        id: 3,
        slug: "learning-rust",
        title: "Learning Rust in 2024",
        description: "My personal notes and project experiences while learning Rust over the weekend. A guide for Python/JS developers making the jump.",
        image: "./articles/learning-rust/cover.jpg",
        contentUrl: "./articles/learning-rust/content.html",
        tags: ["Rust", "Learning"],
        date: "Nov 20, 2023"
    }
];

// Export for use if needed in modules, but we will likely just load this globally before main.js
window.articlesData = articles;
