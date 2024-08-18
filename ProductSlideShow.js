class ProductSlideShow {
  constructor(productPageSlideshow) {
    this.productPageSlideshow = productPageSlideshow;
    this.initContainer();
    return this.slideshow;
  }

  init({ tooltip }) {
    if (tooltip) {
      tooltip.setContent(this.container);

      this.productPageSlideshow.classList.add('siema');
      const slideshow = new Siema({
        selector: this.productPageSlideshow,
        draggable: true,
        loop: true,
      });

      this.nextBtn.addEventListener('click', () => slideshow.next());
      this.prevBtn.addEventListener('click', () => slideshow.prev());

      this.slideshow = slideshow;
    }
  }

  initContainer() {
    if (this.container && this.nextBtn && this.prevBtn) return;

    const { container, nextBtn, prevBtn } = this.createSlideShowControls();
    container.append(this.productPageSlideshow, prevBtn, nextBtn);

    this.container = container;
    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;
  }

  createSlideShowControls() {
    if (this.container && this.nextBtn && this.prevBtn) return;
    
    const slideshowContainer = document.createElement('div');
    slideshowContainer.classList.add('slideshow-container');

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next');
    nextBtn.innerHTML = 'Next';
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('prev');
    prevBtn.innerHTML = 'Prev';

    return { container: slideshowContainer, nextBtn, prevBtn }
  }
}