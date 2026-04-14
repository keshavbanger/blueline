// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial Page Load Animations
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.hero-content span', {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, '-=0.5')
    .from('.hero h1', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power4.out'
    }, '-=0.4')
    .from('.hero p', {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, '-=0.4')
    .from('.hero-btns', {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, '-=0.4')
    .to('.dashboard-preview', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=0.2');

    // Stats Counter Animation
    gsap.from('.stat-num', {
        scrollTrigger: {
            trigger: '.stats',
            start: 'top 80%',
        },
        innerHTML: 0,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power1.out'
    });

    // Reveal animations for sections
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Background Removal for Logo
    const logos = document.querySelectorAll('.logo img');
    logos.forEach(img => {
        removeWhiteBackground(img);
    });

    // Blob Movement
    gsap.to('.blob-1', {
        x: 100,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.blob-2', {
        x: -80,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});

/**
 * Removes white background from an image using Canvas
 */
function removeWhiteBackground(img) {
    if (!img.complete) {
        img.addEventListener('load', () => removeWhiteBackground(img));
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        // If color is very close to white
        if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0; // Set alpha to 0
        }
    }

    ctx.putImageData(imgData, 0, 0);
    img.src = canvas.toDataURL();
}



// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
