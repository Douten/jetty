class ProductSlideShow {
  constructor(slideshowImages) {
    this.slideshowImages = slideshowImages;
    return this.slideshow;
  }

  init({ container }) {
    if (container) {
      const slideshowEl = container.querySelector('.siema');
      slideshowEl.append(...this.slideshowImages);

      const slideshow = new Siema({
        selector: slideshowEl,
        draggable: true,
        loop: true,
        duration: 550,
      });

      this.slideshowTimer = setInterval(() => slideshow.next(), 4500)

      container.querySelector('button.next').addEventListener('click', () => { 
        slideshow.next();
        clearTimeout(this.slideshowTimer);
        this.slideshowTimer = setInterval(() => slideshow.next(), 4500)
      });
      container.querySelector('button.prev').addEventListener('click', () => {
        slideshow.prev();
        clearTimeout(this.slideshowTimer);
        this.slideshowTimer = setInterval(() => slideshow.next(), 4500)
      });

      this.slideshow = slideshow;
    }
  }
}