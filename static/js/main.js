const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

links?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  links.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const company = String(data.company || '').trim();
  const service = String(data.service || 'General enquiry').trim();
  const message = String(data.message || '').trim();

  if (!name || !email || !message) {
    if (note) note.textContent = 'Please complete your name, email and message.';
    return;
  }
  if (name.length > 100 || email.length > 254 || company.length > 150 || service.length > 100 || message.length > 5000) {
    if (note) note.textContent = 'One or more fields are too long.';
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    if (note) note.textContent = 'Please enter a valid email address.';
    return;
  }

  if (button) button.disabled = true;
  if (note) note.textContent = 'Opening your email app…';
  const subject = `Website enquiry - ${name}`;
  const body = `Name: ${name}\nCompany: ${company}\nService: ${service}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:info@ekdrishtainfotech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.assign(mailto);
  window.setTimeout(() => { if (button) button.disabled = false; }, 1000);
});
