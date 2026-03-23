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
  const locations = [
    {
      name: 'Demo 1',
      addressOneLine: '12 High Street, Townsville, TS1 2PH',
      phoneE164: '+441234567890',
      phoneDisplay: '01234 567 890',
      email: 'hello@hathawaypharmacy.co.uk',
      directionsQuery: '12+High+Street+Townsville',
      openByDay: {
        0: null,
        1: [9, 0, 18, 0],
        2: [9, 0, 18, 0],
        3: [9, 0, 18, 0],
        4: [9, 0, 18, 0],
        5: [9, 0, 17, 30],
        6: [9, 30, 14, 0],
      },
      bookingConsultationHours: [
        { label: 'Monday – Thursday', value: '09:00 – 17:00' },
        { label: 'Friday', value: '09:00 – 16:30' },
        { label: 'Saturday', value: '09:30 – 13:00' },
        { label: 'Sunday', value: 'Closed' },
      ],
    },
    {
      name: 'Demo 2',
      addressOneLine: '22 Market Road, Townsville, TS2 3AB',
      phoneE164: '+441234567891',
      phoneDisplay: '01234 567 891',
      email: 'demo2@hathawaypharmacy.co.uk',
      directionsQuery: '22+Market+Road+Townsville',
      openByDay: {
        0: null,
        1: [8, 30, 17, 30],
        2: [8, 30, 17, 30],
        3: [8, 30, 17, 30],
        4: [8, 30, 17, 30],
        5: [9, 0, 16, 0],
        6: null,
      },
      bookingConsultationHours: [
        { label: 'Monday – Thursday', value: '08:30 – 16:30' },
        { label: 'Friday', value: '09:00 – 15:30' },
        { label: 'Saturday', value: 'Closed' },
        { label: 'Sunday', value: 'Closed' },
      ],
    },
    {
      name: 'Demo 3',
      addressOneLine: '5 River Street, Townsville, TS4 5CD',
      phoneE164: '+441234567892',
      phoneDisplay: '01234 567 892',
      email: 'demo3@hathawaypharmacy.co.uk',
      directionsQuery: '5+River+Street+Townsville',
      openByDay: {
        0: null,
        1: [10, 0, 18, 0],
        2: [10, 0, 18, 0],
        3: [10, 0, 18, 0],
        4: [10, 0, 18, 0],
        5: [10, 0, 17, 0],
        6: [10, 0, 14, 0],
      },
      bookingConsultationHours: [
        { label: 'Monday – Thursday', value: '10:00 – 17:00' },
        { label: 'Friday', value: '10:00 – 16:00' },
        { label: 'Saturday', value: '10:00 – 13:00' },
        { label: 'Sunday', value: 'Closed' },
      ],
    },
    {
      name: 'Demo 4',
      addressOneLine: '78 Station Lane, Townsville, TS6 7EF',
      phoneE164: '+441234567893',
      phoneDisplay: '01234 567 893',
      email: 'demo4@hathawaypharmacy.co.uk',
      directionsQuery: '78+Station+Lane+Townsville',
      openByDay: {
        0: null,
        1: [9, 0, 19, 0],
        2: [9, 0, 19, 0],
        3: [9, 0, 19, 0],
        4: [9, 0, 19, 0],
        5: [9, 0, 17, 0],
        6: [9, 0, 13, 30],
      },
      bookingConsultationHours: [
        { label: 'Monday – Thursday', value: '09:00 – 18:00' },
        { label: 'Friday', value: '09:00 – 16:00' },
        { label: 'Saturday', value: '09:00 – 13:00' },
        { label: 'Sunday', value: 'Closed' },
      ],
    },
    {
      name: 'Demo 5',
      addressOneLine: '3 Orchard Way, Townsville, TS8 9GH',
      phoneE164: '+441234567894',
      phoneDisplay: '01234 567 894',
      email: 'demo5@hathawaypharmacy.co.uk',
      directionsQuery: '3+Orchard+Way+Townsville',
      openByDay: {
        0: null,
        1: [9, 0, 17, 0],
        2: [9, 0, 17, 0],
        3: [9, 0, 17, 0],
        4: [9, 0, 17, 0],
        5: [9, 0, 16, 0],
        6: [9, 0, 13, 0],
      },
      bookingConsultationHours: [
        { label: 'Monday – Thursday', value: '09:00 – 16:00' },
        { label: 'Friday', value: '09:00 – 15:30' },
        { label: 'Saturday', value: '09:00 – 12:30' },
        { label: 'Sunday', value: 'Closed' },
      ],
    },
  ];

  let currentLocationIndex = 0;
  try {
    const saved = parseInt(localStorage.getItem('selected_location_index') || '0', 10);
    if (!Number.isNaN(saved) && saved >= 0 && saved < locations.length) currentLocationIndex = saved;
  } catch (e) {
    currentLocationIndex = 0;
  }

  function isOpenNow() {
    const now   = new Date();
    const day   = now.getDay();
    const hours = locations[currentLocationIndex].openByDay[day];
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
     3. MULTI-LOCATION SWITCHING (demo data)
  ══════════════════════════════════════ */
  function pad2(n) { return String(n).padStart(2, '0'); }
  function formatHoursRange(openArr) {
    if (!openArr) return 'Closed';
    const [oh, om, ch, cm] = openArr;
    return `${pad2(oh)}:${pad2(om)} – ${pad2(ch)}:${pad2(cm)}`;
  }

  function applyLocation(index) {
    const loc = locations[index] || locations[0];

    // Visual confirmation that the script is running
    const locSelected = document.getElementById('location-selected-display');
    if (locSelected) locSelected.textContent = `Selected: ${loc.name}`;

    // Top bar
    const topAddr = document.getElementById('topbar-address');
    if (topAddr) topAddr.textContent = loc.addressOneLine;

    const topPhone = document.getElementById('topbar-phone-link');
    if (topPhone) {
      topPhone.href = `tel:${loc.phoneE164}`;
      topPhone.textContent = loc.phoneDisplay;
    }

    const topEmail = document.getElementById('topbar-email-link');
    if (topEmail) {
      topEmail.href = `mailto:${loc.email}`;
      topEmail.textContent = loc.email;
    }

    // Visit Us chips
    const hoursCall = document.getElementById('hours-call-link');
    if (hoursCall) hoursCall.href = `tel:${loc.phoneE164}`;

    const hoursEmail = document.getElementById('hours-email-link');
    if (hoursEmail) hoursEmail.href = `mailto:${loc.email}`;

    const hoursDirs = document.getElementById('hours-directions-link');
    if (hoursDirs) hoursDirs.href = `https://maps.google.com/?q=${loc.directionsQuery}`;

    // Booking panel
    const bookingAddr = document.getElementById('booking-address');
    if (bookingAddr) bookingAddr.innerHTML = loc.addressOneLine.replace(', ', '<br>').replace(', ', '<br>');

    const bookingDirs = document.getElementById('booking-directions-link');
    if (bookingDirs) bookingDirs.href = `https://maps.google.com/?q=${loc.directionsQuery}`;

    const bookingPhone = document.getElementById('booking-phone-link');
    if (bookingPhone) {
      bookingPhone.href = `tel:${loc.phoneE164}`;
      bookingPhone.textContent = `📞 Prefer to call? ${loc.phoneDisplay}`;
    }

    const bookingHoursList = document.getElementById('booking-slot-list');
    if (bookingHoursList) {
      const items = bookingHoursList.querySelectorAll('li');
      loc.bookingConsultationHours.forEach((h, i) => {
        const li = items[i];
        if (!li) return;
        const spans = li.querySelectorAll('span');
        if (spans[0]) spans[0].textContent = h.label;
        if (spans[1]) spans[1].textContent = h.value;
      });
    }

    // Opening hours table
    document.querySelectorAll('.hours-row').forEach(row => {
      const d = parseInt(row.dataset.day, 10);
      const timeEl = row.querySelector('.time');
      if (!timeEl) return;
      const range = formatHoursRange(loc.openByDay[d]);
      timeEl.textContent = range;
    });

    // Top bar hours summary
    const topSummary = document.getElementById('topbar-hours-summary');
    if (topSummary) {
      const mon = formatHoursRange(loc.openByDay[1]);
      const fri = formatHoursRange(loc.openByDay[5]);
      const sat = formatHoursRange(loc.openByDay[6]);
      if (mon === fri) {
        topSummary.textContent = `Mon–Fri: ${mon} | Sat: ${sat}`;
      } else {
        topSummary.textContent = `Mon–Thu: ${mon} | Fri: ${fri} | Sat: ${sat}`;
      }
    }

    // NHS App nomination copy
    const nhsBranch = document.getElementById('nhs-branch-name');
    if (nhsBranch) nhsBranch.textContent = `Hathaway Pharmacy (${loc.name})`;

    // Sync dropdowns (no change events fired by setting value)
    const topbarSel = document.getElementById('topbar-location-select');
    if (topbarSel) topbarSel.value = String(index);
    if (document.getElementById('location-select')) {
      document.getElementById('location-select').value = String(index);
    }
  }

  // Init selector + apply current location
  const locationSelect = document.getElementById('location-select');
  const topbarLocationSelect = document.getElementById('topbar-location-select');

  applyLocation(currentLocationIndex);

  if (locationSelect) {
    locationSelect.value = String(currentLocationIndex);
    locationSelect.addEventListener('change', () => {
      const next = parseInt(locationSelect.value, 10);
      if (Number.isNaN(next)) return;
      currentLocationIndex = next;
      try {
        localStorage.setItem('selected_location_index', String(currentLocationIndex));
      } catch (e) {}
      applyLocation(currentLocationIndex);
      updateOpenStatus();
    });
  }

  if (topbarLocationSelect) {
    topbarLocationSelect.value = String(currentLocationIndex);
    topbarLocationSelect.addEventListener('change', () => {
      const next = parseInt(topbarLocationSelect.value, 10);
      if (Number.isNaN(next)) return;
      currentLocationIndex = next;
      try {
        localStorage.setItem('selected_location_index', String(currentLocationIndex));
      } catch (e) {}
      applyLocation(currentLocationIndex);
      updateOpenStatus();
    });
  }

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
    alert('Account created successfully! Welcome to Hathaway Pharmacy.');
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
    "You can also order prescriptions using the NHS App.",
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
  const cookiePref = localStorage.getItem('hathaway_cookie');
  if (cookiePref) cookieBanner?.classList.add('hidden');

  function dismissCookieBanner(pref) {
    localStorage.setItem('hathaway_cookie', pref);
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
    let toast = document.getElementById('hathaway-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hathaway-toast';
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
  console.log('%c Hathaway Pharmacy — Website loaded ✅', 'color:#6bbf92;font-weight:bold;font-size:14px;');

});

  /* ══════════════════════════════════════
     21. BOOKING SECTION — Appointment type selector
  ══════════════════════════════════════ */
  const bookingTypeCards = document.querySelectorAll('.booking-type-card');
  const selectedTypeLabel = document.getElementById('selected-type-label');
  const bTypeInput = document.getElementById('b-type');

  bookingTypeCards.forEach(card => {
    card.addEventListener('click', () => {
      bookingTypeCards.forEach(c => c.classList.remove('active-type'));
      card.classList.add('active-type');
      const label = card.dataset.label || card.querySelector('h4').textContent;
      const type  = card.dataset.type;
      if (selectedTypeLabel) selectedTypeLabel.textContent = label;
      if (bTypeInput) bTypeInput.value = type;
    });
  });

  /* ══════════════════════════════════════
     22. BOOKING FORM — Validation & Submit
  ══════════════════════════════════════ */
  const bookingForm    = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  const bookingReset   = document.getElementById('booking-reset');
  const bookingSubmit  = document.getElementById('booking-submit');
  const bookingSpinner = document.getElementById('booking-spinner');

  // Set minimum date to today for booking
  const bDateInput = document.getElementById('b-date');
  if (bDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bDateInput.setAttribute('min', today);
  }

  function showBookingError(id, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById(`${id}-error`);
    if (el)  el.classList.add('error');
    if (err) err.textContent = msg;
  }
  function clearBookingError(id) {
    const el  = document.getElementById(id);
    const err = document.getElementById(`${id}-error`);
    if (el)  el.classList.remove('error');
    if (err) err.textContent = '';
  }

  ['b-fname','b-lname','b-email','b-phone','b-date','b-time'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('blur',  () => validateBookingField(id));
    el?.addEventListener('input', () => clearBookingError(id));
    el?.addEventListener('change',() => clearBookingError(id));
  });

  function validateBookingField(id) {
    const val = document.getElementById(id)?.value.trim() || '';
    clearBookingError(id);
    if (!val) { showBookingError(id, 'This field is required.'); return false; }
    if (id === 'b-email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showBookingError(id, 'Please enter a valid email address.'); return false;
    }
    if (id === 'b-phone' && !/^[\d\s\+\-\(\)]{7,15}$/.test(val)) {
      showBookingError(id, 'Please enter a valid phone number.'); return false;
    }
    if (id === 'b-date') {
      const selected = new Date(val);
      const now = new Date(); now.setHours(0,0,0,0);
      if (selected < now) { showBookingError(id, 'Please select a future date.'); return false; }
      const day = selected.getDay();
      if (day === 0) { showBookingError(id, 'We are closed on Sundays.'); return false; }
    }
    return true;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = ['b-fname','b-lname','b-email','b-phone','b-date','b-time'];
      let valid = true;
      fields.forEach(id => { if (!validateBookingField(id)) valid = false; });
      if (!valid) return;

      bookingSubmit.disabled = true;
      bookingSubmit.querySelector('.submit-text').textContent = 'Booking...';
      bookingSpinner.classList.remove('hidden');

      await new Promise(r => setTimeout(r, 1600));

      bookingForm.classList.add('hidden');
      bookingSuccess.classList.remove('hidden');
    });
  }

  if (bookingReset) {
    bookingReset.addEventListener('click', () => {
      bookingForm.reset();
      bookingForm.classList.remove('hidden');
      bookingSuccess.classList.add('hidden');
      bookingSubmit.disabled = false;
      bookingSubmit.querySelector('.submit-text').textContent = 'Confirm Booking';
      bookingSpinner.classList.add('hidden');
    });
  }

