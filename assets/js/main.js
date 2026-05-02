
(function(){
  "use strict";
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) link.classList.add('active');
  });
  const backTop = document.querySelector('.back-to-top');
  if(backTop){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 500) backTop.classList.add('show'); else backTop.classList.remove('show');
    });
  }
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const alert = form.querySelector('.form-alert');
      if(alert){ alert.classList.remove('d-none'); setTimeout(()=> alert.classList.add('d-none'), 4500); }
      form.reset();
    });
  });
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0); const suffix = el.dataset.suffix || ''; let start = 0; const duration = 1200; const started = performance.now();
    const tick = (now) => { const progress = Math.min((now - started) / duration, 1); const value = Math.floor(progress * target); el.textContent = value + suffix; if(progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if('IntersectionObserver' in window && counters.length){
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting && !entry.target.dataset.done){ entry.target.dataset.done = 'true'; animateCount(entry.target); } }); }, {threshold:.35});
    counters.forEach(counter => observer.observe(counter));
  }
})();
