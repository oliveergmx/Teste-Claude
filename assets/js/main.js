/* D'Bulltique — interações (vanilla JS, ES5-friendly) */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Menu mobile */
  var burger = document.getElementById('burger');
  var nl = document.getElementById('nl');
  if (burger && nl) {
    burger.addEventListener('click', function () {
      var open = nl.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    var links = nl.querySelectorAll('a');
    for (var k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function () {
        nl.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* Partículas de brasa — apenas hero desktop, sem reduced motion */
  var hero = document.getElementById('triad');
  if (hero && !reduce && window.innerWidth > 640) {
    for (var i = 0; i < 26; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      var s = 2 + Math.random() * 4;
      e.style.width = s + 'px';
      e.style.height = s + 'px';
      e.style.left = (Math.random() * 100) + '%';
      e.style.animationDuration = (7 + Math.random() * 9) + 's';
      e.style.animationDelay = (Math.random() * 10) + 's';
      e.style.setProperty('--drift', ((Math.random() * 120) - 60) + 'px');
      hero.appendChild(e);
    }
  }

  /* Scroll reveal — com fallback: sem IntersectionObserver, mostra tudo */
  var rvs = document.querySelectorAll('.rv');
  function showAll() {
    for (var i = 0; i < rvs.length; i++) { rvs[i].classList.add('in'); }
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('in');
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    for (var j = 0; j < rvs.length; j++) { io.observe(rvs[j]); }
  } else {
    showAll();
  }

  /* Contadores animados dos stats */
  var counted = false;
  function fmt(n) { return n.toLocaleString('pt-BR'); }
  function runCounters() {
    if (counted) return;
    counted = true;
    var els = document.querySelectorAll('[data-count]');
    for (var i = 0; i < els.length; i++) {
      (function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (reduce || !window.requestAnimationFrame) {
          el.textContent = fmt(target);
          return;
        }
        var start = null, dur = 1600;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(target * eased));
          if (p < 1) { requestAnimationFrame(step); }
        }
        requestAnimationFrame(step);
      })(els[i]);
    }
  }
  var statsEl = document.querySelector('.stats');
  if (statsEl && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { runCounters(); io2.disconnect(); }
    }, { threshold: 0.35 });
    io2.observe(statsEl);
  } else {
    runCounters();
  }
})();
