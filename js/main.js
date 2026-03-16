document.addEventListener('DOMContentLoaded', () => {
    // === Initialize Lucide Icons ===
    lucide.createIcons();

    // === Theme Toggle Logic ===
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const iconSvg = themeToggleBtn.querySelector('svg');
        if (iconSvg) {
            const newIcon = theme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            themeToggleBtn.innerHTML = newIcon;
            lucide.createIcons();
        }
    }


    // === Tab Switching Logic ===
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => {
                t.classList.remove('border-accent-color', 'text-accent-color');
                t.classList.add('border-transparent', 'text-text-secondary', 'hover:text-text-primary', 'hover:border-border-color');
            });
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.remove('border-transparent', 'text-text-secondary', 'hover:text-text-primary', 'hover:border-border-color');
            tab.classList.add('border-accent-color', 'text-accent-color');
            const targetId = tab.dataset.target;
            document.getElementById(targetId).classList.add('active');

            // Re-trigger animations for the new active tab elements
            initIntersectionObserver();
        });
    });


    // === Render Articles ===
    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid && window.articlesData) {
        articlesGrid.innerHTML = window.articlesData.map((article, index) => {
            // Add staggered delay based on index for the observe-item
            const delayClass = `delay-${(index % 3 + 1) * 100}`;
            return `
            <article class="article-card group rounded-xl overflow-hidden observe-item ${delayClass}">
                <div class="h-48 overflow-hidden relative">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover relative z-0" loading="lazy">
                </div>
                <hr>
                <div class="p-6 relative z-10 bg-[var(--bg-secondary)]">
                    <div class="flex items-center gap-2 mb-3 text-xs text-text-secondary font-medium tracking-wide">
                        ${article.tags.map(tag => `<span class="bg-[var(--bg-tertiary)] px-2 py-1 rounded-full text-[var(--accent-color)]">${tag}</span>`).join('')}
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-text-primary leading-tight transition-colors duration-200 group-hover:text-[var(--accent-color)]">${article.title}</h3>
                    <p class="text-text-secondary text-sm mb-4 line-clamp-3">${article.description}</p>
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4">
                        <span class="text-xs text-text-secondary font-medium transition-colors"></span>
                        <a href="?article=${article.slug}" class="read-more-btn text-[var(--accent-color)] text-sm font-semibold hover:underline flex items-center gap-1 group" data-id="${article.id}" data-slug="${article.slug}">
                            Read more <i data-lucide="arrow-up-right" class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                        </a>
                    </div>
                </div>
            </article>
        `}).join('');

        // Attach event listeners to Read More buttons
        const readMoreBtns = document.querySelectorAll('.read-more-btn');
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Allow normal opening in new tab/window if modifier keys are pressed
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;
                e.preventDefault();
                // Find the closest anchor tag that has the data-id attribute, in case the click was on the child icon
                const targetBtn = e.target.closest('a.read-more-btn') || e.target;
                openArticle(targetBtn.dataset.slug || targetBtn.dataset.id);
            });
        });
    }

    // === Render Profile Data ===
    if (window.profileInfo) {
        // Render General Info
        const generalSection = document.getElementById('profile-general');
        if (generalSection) {
            generalSection.innerHTML = `
                <div class="flex flex-col xl:flex-row gap-8 items-center xl:items-start observe-item">
                    <div class="order-2 xl:order-1 flex-1">
                        <h2 class="text-3xl font-bold mb-4 font-display">Hi, I'm <span class="text-[var(--accent-color)]">${window.profileInfo.general.name}</span>.</h2>
                        <p class="text-lg text-text-secondary mb-6 leading-relaxed">
                            I'm working as a <strong class="text-text-primary">${window.profileInfo.general.jobTitle}</strong> @ <strong class="text-text-primary">${window.profileInfo.general.company}</strong>. 
                            I'm part of the <strong class="text-text-primary">${window.profileInfo.general.team}</strong> Team where we are ${window.profileInfo.general.responsibilities}.
                        </p>
                        <p class="text-lg text-text-secondary mb-8 leading-relaxed">
                            I carry over <strong class="text-text-primary">${window.profileInfo.general.experience} years</strong> of experience in the Software Industry 
                            with a focus on ${window.profileInfo.general.skillsFocus}
                        </p>
                        <a href="#" class="btn-animated inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-sm observe-item delay-100">
                            Download Resume <i data-lucide="download" class="w-5 h-5"></i>
                        </a>
                    </div>
                    <div class="order-1 xl:order-2 shrink-0">
                        <div class="w-[320px] h-[320px] rounded-full p-2 border-4 border-transparent hover:border-[var(--accent-color)] hover:-translate-y-3 transition-all duration-700">
                            <img src="./assets/profile.jpeg" alt="Profile Picture" class="w-full h-full rounded-full object-cover shadow-lg">
                        </div>
                    </div>
                </div>
            `;
        }

        // Render Skills
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = window.profileInfo.skills.map((skill, i) => `
                <div class="skill-card group flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] cursor-default observe-item delay-${(i % 5) * 100}">
                    <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                        <img src="${skill.logo}" alt="${skill.name}" class="w-full h-full object-contain filter-none">
                    </div>
                    <span class="text-sm font-bold text-text-primary tracking-wide transition-colors duration-300 group-hover:text-[var(--accent-color)]">${skill.name}</span>
                </div>
            `).join('');

            // Adjust the classes on the container dynamically to form a responsive 3-column grid
            skillsGrid.className = "grid grid-cols-2 sm:grid-cols-3 gap-6 place-items-stretch";
        }

        // Render Contact Info (Location, Email, Socials)
        const contactInfo = document.getElementById('contact-info');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <div class="mb-8 observe-item">
                    <h3 class="text-xl font-bold mb-4">Get in Touch</h3>
                    <div class="flex items-center gap-3 mb-3 text-text-secondary">
                        <i data-lucide="map-pin" class="w-5 h-5 text-[var(--accent-color)]"></i>
                        <span>${window.profileInfo.contact.location}</span>
                    </div>
                    <div class="flex items-center gap-3 mb-6 text-text-secondary">
                        <i data-lucide="mail" class="w-5 h-5 text-[var(--accent-color)]"></i>
                        <a href="mailto:${window.profileInfo.contact.email}" class="hover:text-[var(--accent-color)] transition-colors">${window.profileInfo.contact.email}</a>
                    </div>
                </div>
                <div class="observe-item delay-100">
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">Find me on</h4>
                    <div class="flex gap-4">
                        ${window.profileInfo.contact.socials.map(social => `
                            <a href="${social.url}" aria-label="${social.platform}" class="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-color)] text-text-secondary hover:text-white hover:bg-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all">
                                <i data-lucide="${social.icon}" class="w-5 h-5"></i>
                            </a>
                        `).join('')}
                    </div>
                </div>
             `;
        }

        // Render Icons created dynamically
        lucide.createIcons();
    }


    // === Intersection Observer ===
    function initIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add is-visible to trigger animation
                    entry.target.classList.add('is-visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Find all elements with observe-item that are currently visible in the active tab
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const items = activeTab.querySelectorAll('.observe-item');
            items.forEach(item => {
                // Reset state if needed specifically when re-rendering
                item.classList.remove('is-visible');
                observer.observe(item);
            });
        }
    }

    // Initialize observer for the default open tab
    setTimeout(initIntersectionObserver, 100);

    // Search input (Mock functionality)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.article-card');
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            })
            setTimeout(initIntersectionObserver, 50);
        });
    }

    // === Article Reader Overlay Logic ===
    const articleOverlay = document.getElementById('article-overlay');
    const closeArticleBtn = document.getElementById('close-article');
    const articleHeroImg = document.getElementById('article-hero-img');
    const articleTitle = document.getElementById('article-title');
    const articleMeta = document.getElementById('article-meta');
    const articleBody = document.getElementById('article-body');

    function openArticle(identifier, pushState = true) {
        let article;
        if (typeof identifier === 'number' || (typeof identifier === 'string' && !isNaN(identifier))) {
            article = window.articlesData.find(a => a.id === parseInt(identifier));
        } else {
            article = window.articlesData.find(a => a.slug === identifier);
        }
        if (!article) return;

        // Update URL
        if (pushState) {
            const url = new URL(window.location.href);
            url.searchParams.set('article', article.slug);
            window.history.pushState({ article: article.slug }, '', url);
        }

        // Populate basic overlay data immediately
        if (articleHeroImg) articleHeroImg.src = article.image;
        if (articleTitle) articleTitle.textContent = article.title;

        if (articleMeta) {
            const tagsHtml = article.tags.map(tag => `<span class="bg-[var(--bg-tertiary)] px-2 py-1 rounded-full text-[var(--accent-color)]">${tag}</span>`).join('');
            articleMeta.innerHTML = `<span class="text-text-secondary mr-2">${article.date}</span> ${tagsHtml}`;
        }

        // Show spinner state
        if (articleBody) {
            articleBody.innerHTML = `<div class="flex justify-center py-16"><i data-lucide="loader-2" class="w-10 h-10 animate-spin text-[var(--accent-color)]"></i></div>`;
            lucide.createIcons();
        }

        // Display the overlay with animation
        if (articleOverlay) {
            articleOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Allow display block to apply before adding opacity
            setTimeout(() => {
                articleOverlay.classList.remove('opacity-0');
            }, 10);
        }

        // Fetch dynamic HTML content
        fetch(article.contentUrl)
            .then(response => {
                if (!response.ok) throw new Error('File not found');
                return response.text();
            })
            .then(html => {
                if (articleBody) {
                    // Small artificial delay for visual smoothness of loading
                    setTimeout(() => {
                        articleBody.innerHTML = html;

                        // Dynamically format standard <pre><code> blocks into beautiful Mac-style windows
                        const preBlocks = articleBody.querySelectorAll('pre');
                        preBlocks.forEach(pre => {
                            const codeBlock = pre.querySelector('code');
                            if (!codeBlock) return;

                            // Get raw text and split by newlines, trimming trailing empty line
                            const codeHTML = codeBlock.innerHTML.replace(/\n$/, '');
                            const lines = codeHTML.split('\n');

                            const container = document.createElement('div');
                            container.className = 'code-container';

                            // Generate header and map lines to perfect HTML structure
                            container.innerHTML = `
                                <div class="code-header">
                                    <div class="code-dot red"></div>
                                    <div class="code-dot yellow"></div>
                                    <div class="code-dot green"></div>
                                </div>
                                <div class="code-content">
                                    ${lines.map((line, index) => {
                                // Escape HTML to prevent execution/rendering issues inside code viewer
                                const escapedLine = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                                return `
                                        <div class="code-line">
                                            <span class="line-num">${index + 1}</span>
                                            <span class="line-text">${line || ' '}</span> 
                                        </div>
                                    `}).join('')}
                                </div>
                            `;

                            // Replace raw <pre> with our beautiful new DOM structure
                            pre.parentNode.replaceChild(container, pre);
                        });

                        // Attach lightbox to all images dynamically rendered inside the article
                        const articleImages = articleBody.querySelectorAll('img');
                        articleImages.forEach(img => {
                            img.classList.add('cursor-zoom-in', 'transition-transform', 'duration-300', 'hover:scale-[1.01]', 'hover:shadow-xl');
                            img.addEventListener('click', (e) => {
                                e.stopPropagation(); // Prevent closing overlay
                                openLightbox(img.src, img.alt);
                            });
                        });

                        // Re-initialize any icons that might be inside the article body
                        lucide.createIcons();
                    }, 400);
                }
            })
            .catch(err => {
                console.error("Failed to load article content:", err);
                if (articleBody) {
                    articleBody.innerHTML = `<div class="p-6 bg-red-50 text-red-600 rounded-lg border border-red-200">
                        <h3 class="font-bold mb-2">Error Loading Content</h3>
                        <p>Could not fetch the article file. Ensure you are running via a local web server (e.g. python3 -m http.server).</p>
                    </div>`;
                }
            });
    }

    function closeArticle(pushState = true) {
        if (!articleOverlay || articleOverlay.classList.contains('hidden')) return;

        // Update URL to remove article search param
        if (pushState) {
            const url = new URL(window.location.href);
            url.searchParams.delete('article');
            window.history.pushState({}, '', url);
        }

        // Hide with transition
        articleOverlay.classList.add('opacity-0');

        // Wait for transition before display: none
        setTimeout(() => {
            articleOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            // Clear content
            if (articleBody) articleBody.innerHTML = '';
        }, 300);
    }

    // Close button event
    if (closeArticleBtn) {
        closeArticleBtn.addEventListener('click', () => closeArticle(true));
    }

    // Close when clicking outside of the modal (on the dark backdrop)
    if (articleOverlay) {
        articleOverlay.addEventListener('click', (e) => {
            // Only close if we clicked the overlay background or the close button, not the content
            if (e.target === articleOverlay) {
                closeArticle(true);
            }
        });
    }

    // === Global Image Lightbox Logic ===
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'fixed inset-0 z-[200] bg-[var(--bg-primary)]/95 backdrop-blur-md hidden opacity-0 transition-opacity duration-300 flex items-center justify-center p-4 cursor-zoom-out';
    lightboxOverlay.innerHTML = `<img src="" alt="" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 scale-95" id="lightbox-img">`;
    document.body.appendChild(lightboxOverlay);

    const lightboxImg = lightboxOverlay.querySelector('#lightbox-img');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Expanded Image';
        lightboxOverlay.classList.remove('hidden');

        // Disable scroll even harder if needed, though article overlay already does it
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            lightboxOverlay.classList.remove('opacity-0');
            lightboxImg.classList.remove('scale-95');
            lightboxImg.classList.add('scale-100');
        }, 10);
    }

    // Click anywhere to close lightbox
    lightboxOverlay.addEventListener('click', () => {
        lightboxOverlay.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');

        setTimeout(() => {
            lightboxOverlay.classList.add('hidden');
            // If the article overlay isn't active, restore scroll
            if (articleOverlay && articleOverlay.classList.contains('hidden')) {
                document.body.style.overflow = '';
            }
        }, 300);
    });

    // === Handle Direct Links and Back/Forward Navigation ===
    function handleInitialUrlAndPopState() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleSlug = urlParams.get('article');
        if (articleSlug) {
            openArticle(articleSlug, false);
        } else {
            closeArticle(false);
        }
    }

    // Handle initial load
    handleInitialUrlAndPopState();

    // Handle back/forward buttons
    window.addEventListener('popstate', handleInitialUrlAndPopState);

    // Initialize all icons on initial load
    lucide.createIcons();
});
