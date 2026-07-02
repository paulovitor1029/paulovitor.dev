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
const customCursor = document.getElementById('customCursor');
const scrollProgressBar = document.getElementById('scrollProgressBar');
const scrollOrb = document.getElementById('scrollOrb');
const backToTop = document.getElementById('backToTop');

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

const supportsCustomCursor = window.matchMedia('(pointer: fine)').matches;

if (customCursor && supportsCustomCursor) {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let targetX = cursorX;
    let targetY = cursorY;

    const interactiveSelector = [
        'a',
        'button',
        '.btn',
        '.filter-btn',
        '.project-card',
        '.skill-category',
        '.education-card',
        '.certificate-card',
        '.contact-item',
        '.contact-form',
        '.info-item',
        '.profile-links a',
        '.social-link',
        '.back-to-top',
        '.theme-toggle',
        '.mobile-menu'
    ].join(',');

    const renderCursor = () => {
        cursorX += (targetX - cursorX) * 0.24;
        cursorY += (targetY - cursorY) * 0.24;
        customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        requestAnimationFrame(renderCursor);
    };

    document.addEventListener('mousemove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        customCursor.classList.add('is-visible');

        const interactiveTarget = event.target.closest(interactiveSelector);
        customCursor.classList.toggle('is-hover', Boolean(interactiveTarget));
    });

    document.addEventListener('mousedown', () => {
        customCursor.classList.add('is-press');
    });

    document.addEventListener('mouseup', () => {
        customCursor.classList.remove('is-press');
    });

    document.addEventListener('mouseleave', () => {
        customCursor.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', () => {
        customCursor.classList.add('is-visible');
    });

    renderCursor();
}

const updateScrollFx = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    html.style.setProperty('--scroll-progress', `${progress}%`);
    html.style.setProperty('--scroll-tilt', `${Math.sin(scrollTop * 0.0035) * 8}px`);

    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
    }

    if (scrollOrb) {
        const x = 68 + Math.sin(scrollTop * 0.0024) * 12;
        const y = 16 + Math.cos(scrollTop * 0.0032) * 10;
        html.style.setProperty('--orb-x', `${x}vw`);
        html.style.setProperty('--orb-y', `${y}vh`);
        scrollOrb.style.opacity = `${0.42 + Math.min(progress / 140, 0.42)}`;
        scrollOrb.style.transform = `translate3d(0, ${Math.sin(scrollTop * 0.004) * 14}px, 0) scale(${1 + Math.min(progress / 280, 0.18)})`;
    }

    if (backToTop) {
        backToTop.classList.toggle('is-visible', scrollTop > 420);
    }
};

window.addEventListener('scroll', updateScrollFx);
window.addEventListener('resize', updateScrollFx);
updateScrollFx();

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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

const body = document.body;

const openModal = (modal) => {
    if (!modal) {
        return;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
};

const closeModal = (modal) => {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.document-modal.is-open, .certificate-modal.is-open')) {
        body.classList.remove('modal-open');
    }
};

const resumeModal = document.getElementById('resumeModal');
const resumeOpeners = document.querySelectorAll('[data-resume-open]');
const resumeClosers = document.querySelectorAll('[data-resume-close]');
const resumeViewer = document.getElementById('resumeViewer');
const resumePreview = document.getElementById('resumePreview');
const resumeZoomOut = document.getElementById('resumeZoomOut');
const resumeZoomIn = document.getElementById('resumeZoomIn');
const resumeZoomReset = document.getElementById('resumeZoomReset');
const resumeFitWidth = document.getElementById('resumeFitWidth');
const resumeZoomIndicator = document.getElementById('resumeZoomIndicator');
const resumePageIndicator = document.getElementById('resumePageIndicator');
const resumeDownload = document.getElementById('resumeDownload');

let resumeScale = 1;
let resumeFitScale = 1;
let resumeBaseWidth = 0;

const updateResumeIndicators = () => {
    if (resumeZoomIndicator) {
        resumeZoomIndicator.textContent = `${Math.round(resumeScale * 100)}%`;
    }

    if (resumePageIndicator) {
        resumePageIndicator.textContent = 'Página 1 de 1';
    }
};

const applyResumeScale = (nextScale) => {
    if (!resumePreview || !resumeBaseWidth) {
        return;
    }

    resumeScale = Math.min(Math.max(nextScale, 0.5), 3);
    resumePreview.style.width = `${Math.round(resumeBaseWidth * resumeScale)}px`;
    updateResumeIndicators();
};

const calculateResumeFitScale = () => {
    if (!resumePreview || !resumeViewer || !resumeBaseWidth) {
        return 1;
    }

    const availableWidth = Math.max(resumeViewer.clientWidth - 32, 280);
    resumeFitScale = Math.min(3, availableWidth / resumeBaseWidth);
    return resumeFitScale;
};

const setupResumePreview = () => {
    if (!resumePreview) {
        return;
    }

    if (!resumeBaseWidth) {
        resumeBaseWidth = resumePreview.naturalWidth || resumePreview.width;
    }

    calculateResumeFitScale();
    resumeScale = resumeFitScale;
    applyResumeScale(resumeScale);
};

const openResumeModal = () => {
    openModal(resumeModal);
    if (resumeViewer) {
        resumeViewer.scrollTop = 0;
        resumeViewer.scrollLeft = 0;
    }

    if (resumePreview?.complete) {
        setupResumePreview();
    } else if (resumePreview) {
        resumePreview.addEventListener('load', setupResumePreview, { once: true });
    }
};

resumeOpeners.forEach((button) => {
    button.addEventListener('click', () => {
        openResumeModal();
    });
});

resumeClosers.forEach((button) => {
    button.addEventListener('click', () => {
        closeModal(resumeModal);
    });
});

if (resumeZoomOut) {
    resumeZoomOut.addEventListener('click', () => {
        applyResumeScale(resumeScale - 0.15);
    });
}

if (resumeZoomIn) {
    resumeZoomIn.addEventListener('click', () => {
        applyResumeScale(resumeScale + 0.15);
    });
}

if (resumeZoomReset) {
    resumeZoomReset.addEventListener('click', () => {
        applyResumeScale(1);
    });
}

if (resumeFitWidth) {
    resumeFitWidth.addEventListener('click', () => {
        applyResumeScale(calculateResumeFitScale());
    });
}

if (resumeDownload) {
    resumeDownload.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('docs/Curriculo.pdf');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.href = blobUrl;
            tempLink.download = 'Curriculo-Paulo-Vitor-Annunciato-Llata.pdf';
            document.body.appendChild(tempLink);
            tempLink.click();
            tempLink.remove();
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Erro ao baixar o currículo:', error);
        }
    });
}

window.addEventListener('resize', () => {
    if (resumeModal?.classList.contains('is-open') && resumePreview) {
        calculateResumeFitScale();
    }
});

if (resumePreview) {
    resumePreview.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
}

const certificateModal = document.getElementById('certificateModal');
const certificatePreview = document.getElementById('certificatePreview');
const certificateOpeners = document.querySelectorAll('[data-certificate-open]');
const certificateClosers = document.querySelectorAll('[data-certificate-close]');

const openCertificateModal = () => {
    openModal(certificateModal);
};

const closeCertificateModal = () => {
    closeModal(certificateModal);
};

certificateOpeners.forEach((button) => {
    button.addEventListener('click', openCertificateModal);
});

certificateClosers.forEach((button) => {
    button.addEventListener('click', closeCertificateModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
        return;
    }

    if (resumeModal?.classList.contains('is-open')) {
        closeModal(resumeModal);
    }

    if (certificateModal?.classList.contains('is-open')) {
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
