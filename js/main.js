/* Fiducia — main.js */
(function(){
  /* Header scroll shadow */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function(){
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
  }

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  /* Scroll-triggered fade-up animations */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.fade-up').forEach(function(el){ observer.observe(el); });
  } else {
    document.querySelectorAll('.fade-up').forEach(function(el){ el.classList.add('visible'); });
  }

  /* Form success handling */
  document.querySelectorAll('form[action*="formspree"]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {'Accept': 'application/json'}
      }).then(function(r){
        if (r.ok) {
          form.reset();
          btn.textContent = 'Sent!';
          setTimeout(function(){ btn.textContent = origText; btn.disabled = false; }, 3000);
        } else {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
        }
      }).catch(function(){
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      });
    });
  });
})();
