document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('[data-lang]');
  const translatable = document.querySelectorAll('[data-lang-content]');
  const nav = document.getElementById('site-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const toTop = document.getElementById('to-top');

  let currentLang = localStorage.getItem('m1-language') || 'ja';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('m1-language', lang);
    document.documentElement.lang = lang;

    translatable.forEach((element) => {
      element.classList.toggle('is-active', element.dataset.langContent === lang);
    });

    langButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });

    const titles = {
      ja: 'タイと日本をつなぐ人材サポート | エムワン企画 × エムワンプロジェクト',
      en: 'Thai Talent Support between Thailand and Japan | M-One',
      th: 'บริการดูแลบุคลากรไทยระหว่างไทยและญี่ปุ่น | M-One'
    };
    document.title = titles[lang];
  }

  langButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });
  setLanguage(currentLang);

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.innerHTML = open ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-3-line"></i>';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
    });
  });

  const steps = {
    1: {
      ja: ['01 / 相談・募集', '企業様の仕事内容や条件を丁寧にヒアリングし、タイ側で候補者を募集・選考します。', ['企業ヒアリング', '候補者募集', '初期選考']],
      en: ['01 / Brief & recruit', 'We listen carefully to the role and requirements, then recruit and screen candidates in Thailand.', ['Company brief', 'Recruitment', 'Initial screening']],
      th: ['01 / ปรึกษาและรับสมัคร', 'รับฟังรายละเอียดงานและความต้องการ จากนั้นรับสมัครและคัดเลือกผู้สมัครในประเทศไทย', ['รับฟังบริษัท', 'รับสมัคร', 'คัดกรองเบื้องต้น']]
    },
    2: {
      ja: ['02 / 教育・準備', '選考を通過した人材に、日本語・ビジネスマナー・文化理解など、働く前の準備を行います。', ['日本語教育', 'マナー研修', '文化理解']],
      en: ['02 / Train & prepare', 'Selected candidates prepare for work through Japanese, business etiquette and cultural training.', ['Japanese', 'Business etiquette', 'Culture']],
      th: ['02 / ฝึกอบรมและเตรียมตัว', 'ผู้สมัครที่ผ่านการคัดเลือกจะเตรียมความพร้อมด้านภาษา มารยาททางธุรกิจ และวัฒนธรรมญี่ปุ่น', ['ภาษาญี่ปุ่น', 'มารยาทธุรกิจ', 'วัฒนธรรม']]
    },
    3: {
      ja: ['03 / 選考・手続', '面接や必要な手続きを、タイ側と日本側で連携しながら進めます。状況をわかりやすく共有します。', ['面接調整', '書類サポート', '進捗共有']],
      en: ['03 / Select & process', 'Interviews and required procedures move forward with the Thailand and Japan teams working together.', ['Interview coordination', 'Documents', 'Clear updates']],
      th: ['03 / คัดเลือกและดำเนินการ', 'ประสานงานการสัมภาษณ์และขั้นตอนที่จำเป็น โดยทีมไทยและญี่ปุ่นทำงานร่วมกัน', ['ประสานสัมภาษณ์', 'เอกสาร', 'อัปเดตชัดเจน']]
    },
    4: {
      ja: ['04 / 入国・開始', '入国後の住まいや生活立ち上げをサポートし、仕事を始めるまでの不安を減らします。', ['住居・生活', '入国後サポート', '就労開始']],
      en: ['04 / Arrive & start', 'We support housing and the first steps of daily life so people can begin work with fewer worries.', ['Housing & life', 'Arrival support', 'Start work']],
      th: ['04 / เดินทางและเริ่มงาน', 'ดูแลเรื่องที่พักและการเริ่มต้นชีวิต เพื่อให้เริ่มงานได้อย่างมั่นใจมากขึ้น', ['ที่พักและชีวิต', 'หลังเข้าประเทศ', 'เริ่มงาน']]
    },
    5: {
      ja: ['05 / 定着・相談', '働き始めた後も、生活・コミュニケーションの悩みをタイ語で相談できる状態をつくります。', ['タイ語相談', '生活サポート', '継続支援']],
      en: ['05 / Stay & support', 'After work begins, people can continue to discuss life and communication concerns in Thai.', ['Thai support', 'Daily life', 'Ongoing care']],
      th: ['05 / ทำงานต่อเนื่องและดูแล', 'หลังเริ่มงานยังสามารถปรึกษาปัญหาการใช้ชีวิตและการสื่อสารเป็นภาษาไทยได้อย่างต่อเนื่อง', ['ปรึกษาภาษาไทย', 'ชีวิตประจำวัน', 'ดูแลต่อเนื่อง']]
    }
  };

  const stepDetail = document.getElementById('step-detail');
  const stepButtons = document.querySelectorAll('.step-button');
  let activeStep = 1;

  function renderStep(stepNumber) {
    if (!stepDetail || stepButtons.length === 0) return;
    activeStep = stepNumber;
    stepButtons.forEach((button) => button.setAttribute('aria-selected', String(Number(button.dataset.step) === stepNumber)));
    const copy = steps[stepNumber][currentLang] || steps[stepNumber].ja;
    stepDetail.innerHTML = `<span class="step-kicker">${copy[0]}</span><h3>${copy[0].split(' / ')[1]}</h3><p>${copy[1]}</p><ul class="step-tags">${copy[2].map((tag) => `<li>${tag}</li>`).join('')}</ul>`;
  }

  if (stepDetail && stepButtons.length > 0) {
    stepButtons.forEach((button) => button.addEventListener('click', () => renderStep(Number(button.dataset.step))));
    renderStep(activeStep);
    langButtons.forEach((button) => button.addEventListener('click', () => renderStep(activeStep)));
  }

  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const open = item.classList.toggle('is-open');
        question.setAttribute('aria-expanded', String(open));
      });
    });
  }

  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Contact Form Submission Simulation
  const forms = document.querySelectorAll('.form-box form');
  const toast = document.getElementById('success-toast');
  if (forms.length > 0 && toast) {
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show Toast
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
        
        // Reset Form
        form.reset();
      });
    });
  }
});
