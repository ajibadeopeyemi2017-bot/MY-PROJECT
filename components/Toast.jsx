'use client';

/**
 * Trigger glassmorphic toast notifications
 * @param {string} message - Message text to display
 * @param {'success'|'error'|'info'|'warning'} type - Visual alert type
 * @param {number} duration - Milliseconds before auto-dismiss
 */
export function showNotification(message, type = 'info', duration = 4000) {
  if (typeof document === 'undefined') return;

  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const icon = iconMap[type] || 'ℹ';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" aria-label="Close Notification">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dismissToast(toast);
    });
  }

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  const timer = setTimeout(() => {
    dismissToast(toast);
  }, duration);

  function dismissToast(element) {
    clearTimeout(timer);
    element.classList.remove('visible');
    element.classList.add('hiding');
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300);
  }
}

export default function Toast() {
  return null; // Mount container via RootLayout
}
