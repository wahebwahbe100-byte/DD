
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    const willOpen = !item.classList.contains('active');
    faqItems.forEach((other) => {
      other.classList.remove('active');
      const otherBtn = other.querySelector('.faq-question');
      const otherAnswer = other.querySelector('.faq-answer');
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      if (otherAnswer) otherAnswer.style.maxHeight = '0px';
    });
    if (willOpen) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.querySelector('.faq-answer-inner').scrollHeight + 'px';
    }
  });
});

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const city = (data.get('city') || '').toString().trim();
    const pest = (data.get('pest') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const text = [
      'Hallo, ich möchte eine Anfrage senden.',
      name ? `Name: ${name}` : '',
      phone ? `Telefon: ${phone}` : '',
      email ? `E-Mail: ${email}` : '',
      city ? `Ort: ${city}` : '',
      pest ? `Befall: ${pest}` : '',
      message ? `Beschreibung: ${message}` : ''
    ].filter(Boolean).join('\n');

    const whatsappUrl = 'https://wa.me/4915141527842?text=' + encodeURIComponent(text);
    window.open(whatsappUrl, '_blank', 'noopener');
  });
}
