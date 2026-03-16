const profileData = {
    general: {
        name: "Ashu", // Placeholder mapped to user folder
        jobTitle: "Senior Software Engineer",
        company: "AlphaTech Systems",
        team: "Platform Engineering",
        responsibilities: "architecting scalable backends and optimizing deployment pipelines",
        experience: "8+",
        skillsFocus: "distributed systems, cloud-native infrastructure, and performance optimization."
    },
    skills: [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
        { name: "Golang", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
        { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "Elasticsearch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" },
        { name: "Ansible", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" }
    ],
    contact: {
        location: "San Francisco, CA",
        email: "hello@example.com",
        socials: [
            { platform: "GitHub", url: "#", icon: "github" },
            { platform: "LinkedIn", url: "#", icon: "linkedin" }
        ]
    }
};

window.profileInfo = profileData;
