/* ════════════════════════════════════════════
   EvalIQ — grading.js
   Used by: pages/quick-grading.html, pages/review.html
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initInputModeToggle();
  initGradeNowButton();
  initReviewRowActions();
});

/* Quick Grading — "Type / Paste" vs "Upload Scan" toggle */
function initInputModeToggle() {
  const group = document.querySelector('.input-mode');
  if (!group) return;
  const buttons = group.querySelectorAll('.input-mode-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* Quick Grading — "Grade Now" button shows a brief loading state
   then reveals the AI result panel (already in the markup). */
function initGradeNowButton() {
  const btn = document.getElementById('grade-now-btn');
  const result = document.getElementById('ai-result-panel');
  if (!btn || !result) return;

  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⏳ Grading…';
    result.style.opacity = '0.4';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      result.style.opacity = '1';
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

/* Grade Review — clicking the ✓ approve button on a row marks it Published */
function initReviewRowActions() {
  document.querySelectorAll('.js-approve-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      if (!row) return;
      const statusBadge = row.querySelector('.js-row-status');
      if (statusBadge) {
        statusBadge.textContent = '✓ Published';
        statusBadge.className = 'badge bd-green js-row-status';
      }
      btn.remove();
    });
  });
}
