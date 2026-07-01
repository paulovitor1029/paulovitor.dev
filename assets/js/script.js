window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (!loading) {
        return;
    }

    setTimeout(() => {
        loading.classList.add('hidden');
    }, 400);
});

const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const expanded = navLinks.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', String(expanded));

        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');

            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (!header) {
        return;
    }

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function updateThemeIcon(theme) {
    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector('i');
    if (!icon) {
        return;
    }

    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeIcon(nextTheme);
    });
}

const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let index = 0; index < 36; index += 1) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 18}s`;
        particle.style.animationDuration = `${Math.random() * 8 + 12}s`;
        particlesContainer.appendChild(particle);
    }
}

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 90) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href) {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        event.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach((card) => {
            const category = card.getAttribute('data-category');
            const visible = filter === 'all' || category === filter;

            if (visible) {
                card.style.display = 'block';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
                return;
            }

            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 220);
        });
    });
});

const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || skillsAnimated) {
        return;
    }

    const sectionTop = skillsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 160) {
        skillBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 120);
        });
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', animateSkills);
animateSkills();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();

        const subject = encodeURIComponent(`Contato pelo portfólio - ${name}`);
        const body = encodeURIComponent(
            `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
        );

        window.location.href = `mailto:pv.annunciatollata@gmail.com?subject=${subject}&body=${body}`;
    });
}

const currentYear = document.getElementById('currentYear');
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

const certificateModal = document.getElementById('certificateModal');
const certificatePreview = document.getElementById('certificatePreview');
const certificateOpeners = document.querySelectorAll('[data-certificate-open]');
const certificateClosers = document.querySelectorAll('[data-certificate-close]');

const openCertificateModal = () => {
    if (!certificateModal) {
        return;
    }

    certificateModal.classList.add('is-open');
    certificateModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
};

const closeCertificateModal = () => {
    if (!certificateModal) {
        return;
    }

    certificateModal.classList.remove('is-open');
    certificateModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

certificateOpeners.forEach((button) => {
    button.addEventListener('click', openCertificateModal);
});

certificateClosers.forEach((button) => {
    button.addEventListener('click', closeCertificateModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certificateModal?.classList.contains('is-open')) {
        closeCertificateModal();
    }
});

if (certificatePreview) {
    certificatePreview.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    certificatePreview.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

revealElements.forEach((element) => {
    observer.observe(element);
});
