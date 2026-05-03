/* ==========================================================================
   All Style Cabinets — site script
   - Sticky nav state on scroll
   - Mobile nav toggle
   - IntersectionObserver scroll reveals
   - Quote form: pre-fill from ?category=, validate, simulate submit
   - Footer year
   ========================================================================== */
(function () {
  'use strict';

  // ---------- Footer year ----------
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Nav: scroll state + mobile toggle ----------
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // Close mobile nav when an in-page link is tapped
      links.addEventListener('click', function (e) {
        var t = e.target;
        if (t && t.tagName === 'A' && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // ---------- Scroll reveal ----------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: just show everything
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- Quote form ----------
  var form = document.getElementById('quote-form');
  if (form) {
    // Pre-select category from query string (?category=garage)
    try {
      var params = new URLSearchParams(window.location.search);
      var preset = params.get('category');
      if (preset) {
        var box = form.querySelector('input[type="checkbox"][value="' + preset + '"]');
        if (box) box.checked = true;
      }
    } catch (err) { /* no-op */ }

    var success = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Minimal validation — let native validation do the rest
      var required = form.querySelectorAll('[required]');
      var ok = true;
      required.forEach(function (input) {
        if (!input.value || (input.type === 'email' && !/.+@.+\..+/.test(input.value))) {
          input.style.borderColor = '#ee3042';
          ok = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (!ok) {
        var firstBad = form.querySelector('[required][style*="ee3042"]');
        if (firstBad) firstBad.focus();
        return;
      }

      // No backend yet — capture payload and show confirmation.
      // When the backend lands, replace this block with a fetch() to your endpoint.
      var data = {};
      new FormData(form).forEach(function (value, key) {
        if (data[key] === undefined) {
          data[key] = value;
        } else if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      });
      console.log('[All Style] quote submission:', data);

      if (success) {
        success.classList.add('is-shown');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }
})();
