document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.1,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
  });

  lenis.stop();

  function initLoader() {
    gsap.delayedCall(3, hideLoader);
  }

  function hideLoader() {
    const loader = document.querySelector(".loading");
    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.display = "none";
      },
    });

    tl.to(loader, {
      width: "50%",
      height: "100px",
      left: "25%",
      borderRadius: "0 0 50px 50px",
      y: "-100%",
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
    }).add(runInitialAnimations, "-=0.8");
  }

  function runInitialAnimations() {
    const tl = gsap.timeline({
      onComplete: () => {
        lenis.start();
        setupScrollAnimations();

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      },
    });

    tl.to("#nav #logo", {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        "nav a",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.2"
      )

      .to(
        [".line1", ".line2"],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
        },
        "-=0.3"
      )

      .fromTo(
        "#bottle img",
        {
          opacity: 0,
          y: -200,
          scale: 0.6,
          rotation: -45,
          filter: "blur(10px) brightness(0.5)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 20,
          filter:
            "blur(0px) brightness(1) drop-shadow(8px 8px 20px rgba(196, 30, 58, 0.3))",
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
        },
        "+=0.1"
      )

      .to(
        "#brandLogo",
        {
          opacity: 1,
          scale: 1.3,
          duration: 0.3,
          ease: "power3.out",
        },
        "+=0.2"
      )
      .to("#brandLogo", {
        rotation: 20,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

    return tl;
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
      .to(
        "#bottle img",
        { rotate: 10, scale: 0.9, ease: "elastic.out(0.5, 0.2) " },
        "<"
      )
      .to("#bottle", { x: "-25%" })
      .to("#bottle img", { rotate: -10, scale: 1 }, "<");
  }

  initLoader();

  const mailLink = document.getElementById("mail-link");
  if (mailLink) {
    mailLink.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      
      const currentScrollY = window.scrollY;
      
      const email = this.getAttribute("href").replace("mailto:", "");
      
      window.location.href = "mailto:" + email;
      
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
      }, 10);
    });
  }
});