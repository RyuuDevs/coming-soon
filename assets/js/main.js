/* ===================================================================
 *  Knox 1.0.0 - Main JS
 *
 *
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + "js";

  /* Preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const body = document.querySelector("body");
    const preloader = document.querySelector("#preloader");
    const details = document.querySelector(".s-details");
    const footer = document.querySelector("footer");

    if (!(preloader && footer)) return;

    window.addEventListener("load", function () {
      body.classList.remove("ss-preload");
      body.classList.add("ss-loaded");

      // page scroll position to top
      preloader.addEventListener("transitionstart", function gotoTop(e) {
        if (e.target.matches("#preloader")) {
          window.scrollTo(0, 0);
          preloader.removeEventListener(e.type, gotoTop);
        }
      });

      preloader.addEventListener("transitionend", function afterTransition(e) {
        if (e.target.matches("#preloader")) {
          footer.style.bottom = window.innerHeight - footer.offsetHeight + "px";
          body.classList.add("ss-show");
          e.target.style.display = "none";
          preloader.removeEventListener(e.type, afterTransition);
        }
      });
    });

    window.addEventListener("beforeunload", function () {
      body.classList.remove("ss-show");
    });
  };

  /* Swiper
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    const mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      effect: "fade",
      speed: 2000,
      autoplay: {
        delay: 5000,
      },
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  const ssMoveTo = function () {
    const easeFunctions = {
      easeInQuad: function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
      },
      easeOutQuad: function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      },
      easeInOutQuad: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      easeInOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      },
    };

    const triggers = document.querySelectorAll(".smoothscroll");

    const moveTo = new MoveTo(
      {
        tolerance: 0,
        duration: 1200,
        easing: "easeInOutCubic",
        container: window,
      },
      easeFunctions
    );

    triggers.forEach(function (trigger) {
      moveTo.registerTrigger(trigger);
    });
  };

  /* Back to Top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 800;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    // Show or hide the button
    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        if (!goTopButton.classList.contains("link-is-visible"))
          goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  };

  /* Revealing Effect
   * ---------------------------------------------------- */
  const ssRevealingEffect = function () {
    const intro = document.querySelector(".s-intro");
    const details = document.querySelector(".s-details");

    if (!(intro && details)) return;

    const checkpoint = intro.offsetHeight;
    let opacity;

    details.style.bottom = window.innerHeight - details.offsetHeight + "px";

    window.addEventListener("resize", function () {
      details.style.bottom = window.innerHeight - details.offsetHeight + "px";
    });

    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= checkpoint) {
        opacity = 1 - currentScroll / checkpoint;
      } else {
        opacity = 0;
      }

      details.style.setProperty("--overlay-opacity", opacity);
    });
  };

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssCountdown();
    ssModal();
    ssSwiper();
    ssMailChimpForm();
    sstabs();
    ssAlertBoxes();
    ssMoveTo();
    ssBackToTop();
    ssRevealingEffect();
  })();
})(document.documentElement);
