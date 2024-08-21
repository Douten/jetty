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
      });

      container.querySelector('button.next').addEventListener('click', () => slideshow.next());
      container.querySelector('button.prev').addEventListener('click', () => slideshow.prev());

      this.slideshow = slideshow;
    }
  }
}