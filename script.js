document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
        lerp: 0.06
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);


    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });

    lenis.stop();

    function runInitialAnimations() {
        const tl = gsap.timeline({
            onComplete: () => {
                lenis.start();
            }
        });

        tl.from("#nav #logo", {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        })
        .from("nav a", {
            y: 20,
            skewY: 7,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1
        }, "-=0.2")
        .from(["#bottle img", ".line1", ".line2"], {
            opacity: 0,
            y: 50,
            skewY: 3,
            scale: 0.8,
            duration: 1,
            ease: "expo.out",
            stagger: 0.15
        }, "-=0.5")
        .to("#bottle img", {
            rotation: 20,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.75")
        .from("#brandLogo", {
            opacity: 0,
            scale: 20,
            duration: 0.4,
            ease: "power4.out"
        }, "-=0.8")
        .to("#brandLogo", {
            rotation: 20,
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)"
        }, "-=0.1");
    }
   
    function setupScrollAnimations() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#main-content",
                pin: "#bottle",
                start: "top top",
                endTrigger: "#page3",
                end: "bottom top",
                scrub: 1,
                anticipatePin: 1,
            },
        });

        tl.to("#bottle img", {
            rotate: 0,
            scale: 0.9,
        })
        .to("#bottle", { x: "30%" })
        .to("#bottle img", { rotate: 10, scale: 0.9, ease: "elastic.out(0.5, 0.2) "}, "<")
        .to("#bottle", { x: "-25%"})
        .to("#bottle img", { rotate: -10, scale: 1 }, "<");
    }
 
    runInitialAnimations();
    setupScrollAnimations();

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});