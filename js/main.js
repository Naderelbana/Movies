    // التعامل مع جميع الأزرار باستخدام الحدث العام
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.scroll-btn');
      if (btn) {
        const targetId = btn.getAttribute('data-target');
        const direction = btn.getAttribute('data-scroll');
        const scrollContainer = document.getElementById(targetId);

        if (scrollContainer) {
          scrollContainer.scrollBy({
            left: direction === 'left' ? -200 : 200, // اتجاه التمرير
            behavior: 'smooth',
          });
        }
      }
    });