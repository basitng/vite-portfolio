import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import locomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
window.addEventListener("DOMContentLoaded", runApp());

function runApp() {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new locomotiveScroll({
    el: document.querySelector("body"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform
      ? "transform"
      : "fixed",
  });

  const closeMenu = document.querySelector("[data-menu-close]");
  const openMenu = document.querySelector("[data-menu-open]");
  const sideBar = document.querySelector("[data-sidebar]");

  const menuTimeline = gsap.timeline();
  menuTimeline.pause();
  menuTimeline
    .fromTo(
      ".main-menu",
      {
        opacity: 0,
        visibility: "hidden",
        clipPath: "circle(0%)",
      },
      {
        opacity: 1,
        visibility: "visible",
        duration: 2,
        ease: "power2",
        clipPath: "circle(100%)",
      }
    )
    .fromTo(
      ".main-menu a",
      { x: "-100%", opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.5,
      }
    )
    .fromTo(
      ".main-menu .menu-close",
      { y: "100px", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "bounce", stagger: 0.5 }
    );

  openMenu.addEventListener("click", () => {
    console.log("opened");
    menuTimeline.play();
  });

  closeMenu.addEventListener("click", () => {});

  const tl = gsap.timeline();
  tl.fromTo(
    ".circle .svg",
    {
      transform: "scale(200)",
      opacity: 0,
    },
    {
      transform: "scale(1)",
      duration: 2,
      opacity: 3,
      // linear and power
      ease: "circ.inOut",
    },
    "<"
  )
    .fromTo(
      ".h1-block h1",
      { y: "100px", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.easIn(0.5)",
        stagger: 0.5,
      }
    )
    .fromTo(
      ".p-block p",
      { y: "100px", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "slowMo", stagger: 0.5 }
    )
    .fromTo(
      ".button-block button",
      { y: "100px", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "ease.out", stagger: 0.3 }
    )
    .fromTo(
      ".social-block svg",
      { y: "100px", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "ease.out", stagger: 0.3 }
    )
    .fromTo(
      ".fixed-blocks .menu",
      { x: "100%", opacity: 0 },
      { x: 0, duration: 0.5, opacity: 1, ease: "slowMo(2)", zIndex: 5 }
    );
  AboutSection();

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function AboutSection() {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-container",
      scroller: ".smooth-scroll",
      // enters viewport, forward pass the endpoint, comes back to the viewport
      toggleActions: "restart pause reverse pause",
      start: "80px center",
      end: "+=300",
      scrub: true,
    },
  });
  tl.fromTo(
    ".about-container h1",
    {
      transform: "translateY(56px)",
      opacity: 0,
    },
    {
      opacity: 1,
      transform: "translateY(0px)",
      ease: "power4.out",
      duration: 3,
    }
  )
    .fromTo(
      ".about-container p",
      { opacity: 0, translateY: "64px", duration: 1 },
      {
        opacity: 1,
        translateY: 0,
        duration: 4,
        ease: "power2.",
      }
    )
    .fromTo(
      ".about-container .image img",
      {
        translateY: "64px",
        opacity: 0,
        duration: 3,
      },
      { translateY: 0, opacity: 1, duration: 10 }
    )
    .fromTo(
      ".about-container .offset",
      {
        translateY: "64px",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".offset",
          scrub: true,
          start: "-80px center",

          scroller: ".smooth-scroll",
        },
        translateY: 0,
        opacity: 1,
        duration: 2,
      }
    )
    .fromTo(
      ".work h3",
      { x: "-180px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".work",
          // start when is 80px about the trigger elem and when it stays at the center of viewport
          start: "-400px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".work p",
      { x: "180px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".work",
          // start when is 80px about the trigger elem and when it stays at the center of viewport
          start: "-400px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".client h3",
      { y: "180px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".work",
          // start when is 80px about the trigger elem and when it stays at the center of viewport
          start: "-100px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".client p",
      { y: "180px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".work",
          // start when is 80px about the trigger elem and when it stays at the center of viewport
          start: "-100px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".clients .card",
      { y: "80px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".clients",
          // start when is 80px about the trigger elem and when it stays at the center of viewport
          start: "-800px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.2,
      }
    )
    .fromTo(
      ".portfolio-container .section .col",
      { y: "60px", opacity: 0, marginBottom: "0rem" },
      {
        scrollTrigger: {
          trigger: ".portfolio-container",
          // start when is -30% above the trigger elem and when it stays at the center of viewport
          start: "-30% center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        marginBottom: "4rem",
      }
    )
    .fromTo(
      ".portfolio-container .portfolio-card .image img",
      { x: "-10%", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".portfolio-card",
          // start when is -30% above the trigger elem and when it stays at the center of viewport
          start: "-500px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".portfolio-container .portfolio-card .number h1",
      { y: "60px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".portfolio-card",
          // start when is -30% above the trigger elem and when it stays at the center of viewport
          start: "-30% center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".portfolio-container .portfolio-card-2 .number h1",
      { y: "60px", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".portfolio-card-2",
          // start when is -30% above the trigger elem and when it stays at the center of viewport
          start: "-30% center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    )
    .fromTo(
      ".portfolio-container .portfolio-card-2 .image img",
      { x: "-10%", opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".portfolio-card-2",
          // start when is -30% above the trigger elem and when it stays at the center of viewport
          start: "-500px center",
          scrub: true,
          scroller: ".smooth-scroll",
        },
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      }
    );
  const tl2 = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "-50px center",
        scroller: ".smooth-scroll",
        toggleActions: "restart pause reverse pause ",
      },
    })
    .fromTo(
      ".footer .content .block",
      { y: "65px", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
}
