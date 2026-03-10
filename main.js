/* ════════════════════════════════════════
   ZAIPHAR — main.js
   All interactive functionality
   ════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. TOP BAR — Close button
  ══════════════════════════════════════ */
  const topbar      = document.getElementById('topbar');
  const topbarClose = document.getElementById('topbar-close');
  const navbar      = document.getElementById('navbar');

  if (topbarClose && topbar) {
    topbarClose.addEventListener('click', () => {
      topbar.style.transition = 'max-height 0.35s ease, opacity 0.3s ease, padding 0.3s ease';
      topbar.style.maxHeight  = '0';
      topbar.style.opacity    = '0';
      topbar.style.paddingTop = '0';
      topbar.style.paddingBottom = '0';
      topbar.style.overflow   = 'hidden';
      // give navbar full top position
      setTimeout(() => { topbar.style.display = 'none'; }, 350);
    });
  }

  /* ══════════════════════════════════════
     2. TOPBAR / NAVBAR — Open status
  ══════════════════════════════════════ */
  const hoursData = {
    // day index (0=Sun) → [openHH, openMM, closeHH, closeMM] or null
    0: null,
    1: [9, 0, 18, 0],
    2: [9, 0, 18, 0],
    3: [9, 0, 18, 0],
    4: [9, 0, 18, 0],
    5: [9, 0, 17, 30],
    6: [9, 30, 14, 0],
  };

  function isOpenNow() {
    const now   = new Date();
    const day   = now.getDay();
    const hours = hoursData[day];
    if (!hours) return false;

    const [oh, om, ch, cm] = hours;
    const nowMins  = now.getHours() * 60 + now.getMinutes();
    const openMins = oh * 60 + om;
    const closeMins= ch * 60 + cm;
    return nowMins >= openMins && nowMins < closeMins;
  }

  function updateOpenStatus() {
    const open = isOpenNow();
    const statusEls = [
      { badge: document.getElementById('topbar-status'), text: document.getElementById('open-status-text') },
      { badge: document.getElementById('hours-badge'),   text: document.getElementById('hours-status-text') },
    ];

    statusEls.forEach(({ badge, text }) => {
      if (!badge || !text) return;
      if (open) {
        badge.className = 'topbar-badge open';
        text.textContent = 'Open Now';
      } else {
        badge.className = 'topbar-badge closed';
        text.textContent = 'Closed';
      }
    });

    // Also update the hours-badge classes
    const hb = document.getElementById('hours-badge');
    if (hb) hb.className = open ? 'open-badge open' : 'open-badge closed';
  }

  updateOpenStatus();
  setInterval(updateOpenStatus, 60000); // refresh every minute

  /* ══════════════════════════════════════
     3. HOURS TABLE — Highlight today
  ══════════════════════════════════════ */
  const today = new Date().getDay();
  document.querySelectorAll('.hours-row').forEach(row => {
    const d = parseInt(row.dataset.day, 10);
    if (d === today) {
      row.classList.add('today');
      const dayEl = row.querySelector('.day');
      if (dayEl) dayEl.textContent += ' ★';
    }
  });

  /* ══════════════════════════════════════
     4. NAVBAR — Scroll shadow + active link
  ══════════════════════════════════════ */
  const navbarEl = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbarEl.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Active nav link on scroll
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active-link', href === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ══════════════════════════════════════
     5. MOBILE DRAWER
  ══════════════════════════════════════ */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay= document.getElementById('mobile-overlay');
  const drawerClose  = document.getElementById('drawer-close');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('show');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('show');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  drawerClose?.addEventListener('click', closeDrawer);
  mobileOverlay?.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ══════════════════════════════════════
     6. SMOOTH SCROLL for all anchor links
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbarEl.offsetHeight + 20;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════
     7. SCROLL REVEAL ANIMATION
  ══════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════════════
     8. COUNTER ANIMATION (hero stats)
  ══════════════════════════════════════ */
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step   = Math.ceil(target / (duration / 16));
      let current  = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
      }, 16);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ══════════════════════════════════════
     9. PRESCRIPTION FORM — Validation & Submit
  ══════════════════════════════════════ */
  const prescForm    = document.getElementById('prescription-form');
  const formSuccess  = document.getElementById('form-success');
  const formReset    = document.getElementById('form-reset');
  const submitBtn    = document.getElementById('form-submit');
  const submitSpinner= document.getElementById('submit-spinner');

  function showFieldError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (field)  field.classList.add('error');
    if (error)  error.textContent = msg;
  }
  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (field)  field.classList.remove('error');
    if (error)  error.textContent = '';
  }

  // Live validation on blur
  ['fname','lname','email','phone','dob'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('blur', () => validateField(id));
    el?.addEventListener('input', () => clearFieldError(id));
  });

  function validateField(id) {
    const val = document.getElementById(id)?.value.trim() || '';
    clearFieldError(id);
    if (!val) { showFieldError(id, 'This field is required.'); return false; }
    if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showFieldError(id, 'Please enter a valid email address.'); return false;
    }
    if (id === 'phone' && !/^[\d\s\+\-\(\)]{7,15}$/.test(val)) {
      showFieldError(id, 'Please enter a valid phone number.'); return false;
    }
    return true;
  }

  if (prescForm) {
    prescForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fields = ['fname','lname','email','phone','dob'];
      let valid = true;
      fields.forEach(id => { if (!validateField(id)) valid = false; });

      if (!valid) return;

      // Show loading state
      submitBtn.disabled = true;
      document.querySelector('.submit-text').textContent = 'Submitting...';
      submitSpinner.classList.remove('hidden');

      // Simulate async submission
      await new Promise(resolve => setTimeout(resolve, 1800));

      prescForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    });
  }

  if (formReset) {
    formReset.addEventListener('click', () => {
      prescForm.reset();
      prescForm.classList.remove('hidden');
      formSuccess.classList.add('hidden');
      submitBtn.disabled = false;
      document.querySelector('.submit-text').textContent = 'Submit Request';
      submitSpinner.classList.add('hidden');
    });
  }

  /* ══════════════════════════════════════
     10. LOGIN MODAL
  ══════════════════════════════════════ */
  const loginModal  = document.getElementById('login-modal');
  const openLoginBtn= document.getElementById('open-login-btn');
  const closeLogin  = document.getElementById('close-login');

  function openModal()  { loginModal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function closeModal() { loginModal.classList.add('hidden');    document.body.style.overflow = ''; }

  openLoginBtn?.addEventListener('click', openModal);
  closeLogin?.addEventListener('click', closeModal);
  loginModal?.addEventListener('click', (e) => { if (e.target === loginModal) closeModal(); });

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeDrawer(); }
  });

  /* ── Modal tabs ── */
  const modalTabs = document.querySelectorAll('.modal-tab');
  const panelLogin = document.getElementById('panel-login');
  const panelSignup= document.getElementById('panel-signup');

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      if (target === 'login') {
        panelLogin.classList.remove('hidden');  panelLogin.classList.add('active');
        panelSignup.classList.add('hidden');    panelSignup.classList.remove('active');
      } else {
        panelSignup.classList.remove('hidden'); panelSignup.classList.add('active');
        panelLogin.classList.add('hidden');     panelLogin.classList.remove('active');
      }
    });
  });

  /* ── Toggle password visibility ── */
  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input    = document.getElementById(targetId);
      if (!input) return;
      const isPass = input.type === 'password';
      input.type   = isPass ? 'text' : 'password';
      btn.textContent = isPass ? '🙈' : '👁';
    });
  });

  /* ── Login form submit ── */
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-pass').value;
    if (!email || !pass) return alert('Please fill in all fields.');
    // Demo: show success
    alert(`Welcome back! Logged in as ${email}`);
    closeModal();
  });

  /* ── Signup form submit ── */
  document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Account created successfully! Welcome to Zaiphar.');
    closeModal();
  });

  /* ── Forgot password link ── */
  document.getElementById('forgot-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    if (!email) {
      alert('Please enter your email address first, then click Forgot Password.');
      return;
    }
    alert(`Password reset link sent to: ${email}`);
  });

  /* ══════════════════════════════════════
     11. LIVE CHAT WIDGET
  ══════════════════════════════════════ */
  const chatFab    = document.getElementById('chat-fab');
  const chatWidget = document.getElementById('chat-widget');
  const chatClose  = document.getElementById('chat-close');
  const chatInput  = document.getElementById('chat-input');
  const chatSend   = document.getElementById('chat-send');
  const chatBody   = document.getElementById('chat-body');
  const liveChatBtn= document.getElementById('live-chat-btn');

  const botResponses = [
    "Thank you for your message! A member of our team will respond shortly. 😊",
    "We typically respond within a few minutes during opening hours.",
    "For urgent matters, please call us on 01234 567 890.",
    "You can also order prescriptions using our online form above.",
    "Is there anything else I can help you with?",
  ];
  let botIndex = 0;

  function openChat()  { chatWidget.classList.add('open'); chatInput?.focus(); }
  function closeChat() { chatWidget.classList.remove('open'); }

  chatFab?.addEventListener('click', () => {
    chatWidget.classList.contains('open') ? closeChat() : openChat();
  });
  chatClose?.addEventListener('click', closeChat);
  liveChatBtn?.addEventListener('click', openChat);

  function appendMsg(text, type) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    appendMsg(msg, 'user');
    chatInput.value = '';
    chatInput.focus();

    // Bot reply with delay
    setTimeout(() => {
      const reply = botResponses[botIndex % botResponses.length];
      appendMsg(reply, 'bot');
      botIndex++;
    }, 900);
  }

  chatSend?.addEventListener('click', sendMessage);
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  /* ══════════════════════════════════════
     12. BACK TO TOP BUTTON
  ══════════════════════════════════════ */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('hidden', window.scrollY < 400);
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ══════════════════════════════════════
     13. COOKIE BANNER
  ══════════════════════════════════════ */
  const cookieBanner  = document.getElementById('cookie-banner');
  const cookieAccept  = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');

  // Show banner only if not already accepted/declined
  const cookiePref = localStorage.getItem('zaiphar_cookie');
  if (cookiePref) cookieBanner?.classList.add('hidden');

  function dismissCookieBanner(pref) {
    localStorage.setItem('zaiphar_cookie', pref);
    cookieBanner.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    cookieBanner.style.opacity    = '0';
    cookieBanner.style.transform  = 'translateX(-50%) translateY(20px)';
    setTimeout(() => cookieBanner.classList.add('hidden'), 400);
  }

  cookieAccept?.addEventListener('click',  () => dismissCookieBanner('accepted'));
  cookieDecline?.addEventListener('click', () => dismissCookieBanner('declined'));

  /* ══════════════════════════════════════
     14. FOOTER YEAR
  ══════════════════════════════════════ */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════
     15. NAV LINK UNDERLINE on scroll position
  ══════════════════════════════════════ */
  // Add active underline indicator to current section's nav item
  const allSections = document.querySelectorAll('[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(sec => {
      const secTop = sec.offsetTop - navbarEl.offsetHeight - 30;
      if (window.scrollY >= secTop) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active-link', href === current);
    });
  });

  /* ══════════════════════════════════════
     16. PILLAR / SERVICE CARD click-to-scroll
         (clicking a card scrolls to its section)
  ══════════════════════════════════════ */
  document.querySelectorAll('.pillar-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const link = card.querySelector('.pillar-link');
      const href = link?.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (target) {
        const offset = navbarEl.offsetHeight + 20;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════
     17. MINI CARD click-to-scroll
  ══════════════════════════════════════ */
  const miniCardTargets = ['#nhs','#private','#pharmacy-first','#prescription'];
  document.querySelectorAll('.mini-card').forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const target = document.querySelector(miniCardTargets[i]);
      if (target) {
        const offset = navbarEl.offsetHeight + 20;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════
     18. CONDITION PILLS — tooltip on click
  ══════════════════════════════════════ */
  const conditionInfo = {
    'Ear Infection':          'Our pharmacist can assess and prescribe antibiotic ear drops for acute otitis externa.',
    'Impetigo':               'We can prescribe topical or oral antibiotics for impetigo without a GP visit.',
    'Insect Bite':            'Get advice and treatment for infected or allergic insect bite reactions.',
    'Shingles':               'Early antiviral treatment is key — we can prescribe directly under Pharmacy First.',
    'Sinusitis':              'Advice and treatment for sinusitis that hasn\'t cleared with self-care.',
    'Sore Throat':            'Strep throat assessment and, where appropriate, antibiotic prescription.',
    'Urinary Tract Infection':'UTI assessment and antibiotic treatment for uncomplicated cases.',
    'Health Advice':          'General health advice from our qualified pharmacists — no appointment needed.',
  };

  document.querySelectorAll('.condition-pill').forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.addEventListener('click', () => {
      const name = pill.querySelector('span:last-child')?.textContent?.trim();
      const info = conditionInfo[name];
      if (info) {
        showToast(`${name}: ${info}`);
      }
    });
  });

  /* ══════════════════════════════════════
     19. TOAST NOTIFICATION utility
  ══════════════════════════════════════ */
  let toastTimeout;
  function showToast(msg, duration = 4000) {
    let toast = document.getElementById('zaiphar-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'zaiphar-toast';
      toast.style.cssText = `
        position:fixed; top:5.5rem; right:1.5rem; z-index:700;
        background:#0a2e1f; color:#c2e8d3;
        padding:1rem 1.5rem; border-radius:14px;
        font-size:0.85rem; max-width:320px; line-height:1.5;
        box-shadow:0 12px 40px rgba(0,0,0,0.25);
        border:1px solid rgba(107,191,146,0.2);
        transition:opacity 0.3s ease, transform 0.3s ease;
        transform:translateY(-8px); opacity:0;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(-8px)';
    }, duration);
  }

  /* ══════════════════════════════════════
     20. SERVICE ITEMS — highlight on hover with colour
  ══════════════════════════════════════ */
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.si-icon').style.background = '#0a2e1f';
      item.querySelector('.si-icon').style.color = '#6bbf92';
      item.querySelector('.si-icon').style.fontSize = '1.3rem';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.si-icon').style.background = '';
      item.querySelector('.si-icon').style.color = '';
      item.querySelector('.si-icon').style.fontSize = '';
    });
  });

  /* ══════════════════════════════════════
     INIT COMPLETE LOG
  ══════════════════════════════════════ */
  console.log('%c Zaiphar — Website loaded ✅', 'color:#6bbf92;font-weight:bold;font-size:14px;');

});
