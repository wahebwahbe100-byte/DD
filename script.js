
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
          if (window.innerWidth <= 640) {
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
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));

    const flowLines = document.querySelectorAll('.flow-line');
    const flowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    flowLines.forEach((line) => flowObserver.observe(line));



    const gallerySlider = document.querySelector('[data-gallery-slider]');

    if (gallerySlider) {
      const track = gallerySlider.querySelector('.gallery-track');
      const slides = Array.from(gallerySlider.querySelectorAll('.gallery-slide'));
      const dots = Array.from(gallerySlider.querySelectorAll('.gallery-dot'));
      const prevBtn = gallerySlider.querySelector('.gallery-btn.prev');
      const nextBtn = gallerySlider.querySelector('.gallery-btn.next');
      let currentIndex = 0;
      let autoPlay;
      let startX = 0;
      let endX = 0;

      const updateSlider = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle('active', dotIndex === currentIndex);
        });
      };

      const startAutoPlay = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => updateSlider(currentIndex + 1), 3500);
      };

      if (prevBtn) prevBtn.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
        startAutoPlay();
      });

      if (nextBtn) nextBtn.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
        startAutoPlay();
      });

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          updateSlider(index);
          startAutoPlay();
        });
      });

      gallerySlider.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
      }, { passive: true });

      gallerySlider.addEventListener('touchend', (event) => {
        endX = event.changedTouches[0].clientX;
        const distance = startX - endX;
        if (Math.abs(distance) > 40) {
          updateSlider(distance > 0 ? currentIndex + 1 : currentIndex - 1);
          startAutoPlay();
        }
      }, { passive: true });

      gallerySlider.addEventListener('mouseenter', () => clearInterval(autoPlay));
      gallerySlider.addEventListener('mouseleave', startAutoPlay);

      updateSlider(0);
      startAutoPlay();
    }

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (btn && answer) {
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          faqItems.forEach((other) => {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = '0px';
          });

          if (!isActive) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.querySelector('.faq-answer-inner').scrollHeight + 'px';
          }
        });
      }
    });

    window.addEventListener('resize', () => {
      const activeItem = document.querySelector('.faq-item.active .faq-answer');
      if (activeItem) {
        const inner = activeItem.querySelector('.faq-answer-inner');
        activeItem.style.maxHeight = (inner ? inner.scrollHeight : activeItem.scrollHeight) + 'px';
      }
    });
  