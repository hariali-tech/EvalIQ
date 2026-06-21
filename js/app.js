/* ════════════════════════════════════════════
   EvalIQ — app.js
   Shared behaviour used across every page:
   role tabs (login/signup), dismissible notification
   banners, and small generic helpers.
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initRoleTabs();
  initNotifDismiss();
});

/* Role tab switcher used on login.html / signup.html
   Markup: <div class="role-tabs"><div class="role-tab [active]">...</div>...</div> */
function initRoleTabs() {
  document.querySelectorAll('.role-tabs').forEach(group => {
    group.querySelectorAll('.role-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        group.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

/* Lets any .notif banner be dismissed with a ✕ button
   Markup: <div class="notif">text <button class="notif-close">✕</button></div> */
function initNotifDismiss() {
  document.querySelectorAll('.notif-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const banner = btn.closest('.notif');
      if (banner) banner.remove();
    });
  });
}

/* Convenience helper other page scripts can reuse */
function goBack() {
  window.history.back();
}
