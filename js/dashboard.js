/* ════════════════════════════════════════════
   EvalIQ — dashboard.js
   Used by: pages/dashboard.html
   Animates the stat tiles on load (count-up effect).
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isFloat = !Number.isInteger(target);
    const duration = 700;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isFloat ? value.toFixed(2) : Math.round(value);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isFloat ? target.toFixed(2) : target;
    }
    requestAnimationFrame(tick);
  });
});
