/* Site copy-protection deterrents.
 * These controls discourage casual copying; no browser-delivered website can
 * completely prevent users from inspecting or reproducing client-side assets.
 */
(() => {
  const isEditable = (el) => {
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    return el.isContentEditable || ['input', 'textarea', 'select'].includes(tag);
  };

  document.addEventListener('contextmenu', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  }, { capture: true });

  document.addEventListener('copy', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  }, { capture: true });

  document.addEventListener('cut', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  }, { capture: true });

  document.addEventListener('dragstart', (event) => {
    if (event.target?.tagName?.toLowerCase() === 'img') event.preventDefault();
  }, { capture: true });

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;
    const devtools = event.key === 'F12' ||
      (modifier && event.shiftKey && ['i', 'j', 'c'].includes(key));
    const sourceOrCopy = modifier && ['c', 'u', 's'].includes(key);

    if (!isEditable(event.target) && (devtools || sourceOrCopy)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, { capture: true });
})();
