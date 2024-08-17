class ProductSlideShow {
  constructor(productPageSlideshow, tooltip) {
    this.tooltip = tooltip
    this.createSlideShow(productPageSlideshow);
  }

  createSlideShow(productPageSlideshow) {
    productPageSlideshow.classList.add('siema');

    const { container, nextBtn, prevBtn } = this.createSlideShowControls();
    container.append(productPageSlideshow, prevBtn, nextBtn);

    this.tooltip.setContent(container);

    const slideshow = new Siema({
      selector: productPageSlideshow,
      draggable: true,
      loop: true,
    });

    nextBtn.addEventListener('click', () => slideshow.next());
    prevBtn.addEventListener('click', () => slideshow.prev());

    this.slideshow = slideshow;
    this.container = container;
  }

  createSlideShowControls() {
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