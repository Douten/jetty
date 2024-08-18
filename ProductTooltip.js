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
    await this.renderProductTemplate();

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

  async renderProductTemplate() {
    const template = new Template('product-tooltip');
    await template.init();
    console.log({ template });
    this.tooltip.setContent(template.node);
    console.log({ popper: this.tooltip.popper });
    this.tooltip.containers = {
      gallery: this.tooltip.popper.querySelector('.gallery.container'),
      spec: this.tooltip.popper.querySelector('.spec.container'),
      review: this.tooltip.popper.querySelector('.review.container'),
    }
  }

  addSlideShow() {
    const slideshowImages = this.productPage?.querySelectorAll('.slideshow li')
    if (!slideshowImages) return;
    
    const slideshow = new ProductSlideShow(slideshowImages);
    slideshow.init({ container: this.tooltip.containers.gallery });
  }

  addReviews() {
    const reviews = this.productPage?.querySelectorAll('.review-container > div:first-child');
    if (!reviews.length) return;

    reviews.forEach(review => review.className = '');
    this.tooltip.containers.review.append(...reviews);
  }
}