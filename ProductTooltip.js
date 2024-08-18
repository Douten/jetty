class ProductTooltip {
  constructor(productLinkElement) {
    const loadingDiv = document.createElement('div');
    loadingDiv.class = 'slideshow';
    loadingDiv.innerHTML = '<div class="loading">Loading...</div>';

    this.tooltip = new tippy(productLinkElement, {
      content: loadingDiv,
      allowHTML: true,
      interactive: true,
      maxWidth: '100%',
    });

    this.tooltip.show();
    this.tooltipContainer = this.tooltip.popper.querySelector('.tippy-content');
    this.addProduct(productLinkElement.href);
  }

  async addProduct(productLinkElement) {
    fetch(productLinkElement).then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw response;
    }).then((text) => {
        const parser = new DOMParser();
        this.productPage = parser.parseFromString(text, "text/html");

        this.addSlideShow();
        this.addReviews();
    });
  }

  addSlideShow() {
    if (!this.productPage?.querySelector('.slideshow')) return;
    
    const slideshow = new ProductSlideShow(this.productPage
      .querySelector('.slideshow'));
    slideshow.init({ tooltip: this.tooltip });

    this.slideshow = slideshow.slideshow;
  }

  addReviews() {
    if (!this.productPage?.querySelectorAll('.review-container').length) return;

    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-container');

    const reviews = this.productPage
      .querySelectorAll('.review-container > div:first-child');
    reviews.forEach(review => review.className = '');
    reviewContainer.append(...reviews);
    this.tooltip.popper.querySelector('.tippy-content').append(reviewContainer);
  }
}