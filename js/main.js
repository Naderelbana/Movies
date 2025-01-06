const scrollContainer = document.getElementById('scrollable');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    // التمرير لليسار عند النقر على السهم الأيسر
    scrollLeftBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
        left: -300, // تمرير للخلف بمقدار 300 بكسل
        behavior: 'smooth'
      });
    });

    // التمرير لليمين عند النقر على السهم الأيمن
    scrollRightBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
        left: 300, // تمرير للأمام بمقدار 300 بكسل
        behavior: 'smooth'
      });
    });