/* ════════════════════════════════════════════
   EvalIQ — rubric.js
   Used by: pages/rubric-select.html, pages/rubric-builder.html
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initRubricOptionSelect();
  initCriterionRows();
});

/* Select Rubric — clicking a "Build manually / Upload PDF / Use saved"
   card highlights it (the click still navigates via its <a> wrapper,
   this just gives instant visual feedback before the page changes). */
function initRubricOptionSelect() {
  const options = document.querySelectorAll('.rubric-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
}

/* Rubric Builder — add / remove criterion rows and keep the
   running total of marks up to date. */
function initCriterionRows() {
  const list = document.getElementById('criteria-list');
  const addBtn = document.getElementById('add-criterion-btn');
  const totalEl = document.getElementById('criteria-total');
  if (!list) return;

  function recalcTotal() {
    let sum = 0;
    list.querySelectorAll('.criterion-marks').forEach(input => {
      sum += parseFloat(input.value) || 0;
    });
    if (totalEl) totalEl.textContent = sum + ' marks';
  }

  function bindRow(row) {
    row.querySelectorAll('.criterion-marks').forEach(input => {
      input.addEventListener('input', recalcTotal);
    });
    const removeBtn = row.querySelector('.js-remove-criterion');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        row.remove();
        recalcTotal();
      });
    }
  }

  list.querySelectorAll('.criterion-row').forEach(bindRow);

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'criterion-row';
      row.innerHTML =
        '<input placeholder="What to check..." />' +
        '<input class="criterion-marks" type="number" value="0" />' +
        '<button class="btn btn-ghost btn-sm js-remove-criterion" type="button">✕</button>';
      list.appendChild(row);
      bindRow(row);
      row.querySelector('input').focus();
    });
  }

  recalcTotal();
}
