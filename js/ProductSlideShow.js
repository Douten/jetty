class ProductSlideShow {
  constructor(slideshowImages) {
    this.slideshowImages = slideshowImages;
    return this.slideshow;
  }

  init({ tooltip }) {
    const container = tooltip.containers.gallery;
    if (container) {
      const slideshowEl = container.querySelector('.siema');
      slideshowEl.append(...this.slideshowImages);

      tooltip.containers.gallery.classList.remove('d-none');
      tooltip.popper.querySelector('.gallery.button').classList.remove('d-none');

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          console.log('entry', entry);
          if (entry.target.offsetHeight > 300) {
            tooltip.containers.wrapper.classList.remove('loading');
          }
        }
      });
      
      resizeObserver.observe(slideshowEl);
      

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
      container.querySelector('button.next').classList.remove('d-none');
      container.querySelector('button.prev').classList.remove('d-none');

      this.slideshow = slideshow;
    }
  }
}