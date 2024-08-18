class ProductTooltip {
  constructor(productLinkElement) {
    this.productLinkElement = productLinkElement;
  }

  async init() {
    await this.renderTooltip();
    this.tooltip.show();
    this.addProduct();
  }

  async renderTooltip() {
    // Create Tooltip Template, including loading state
    const template = new Template('product-tooltip');
    await template.init();

    this.tooltip = new tippy(this.productLinkElement, {
      content: template.node,
      allowHTML: true,
      interactive: true,
      maxWidth: '100%',
    });

    // containers to insert product components
    this.tooltip.containers = {
      wrapper: this.tooltip.popper.querySelector('.product-tooltip-wrapper'),
      gallery: this.tooltip.popper.querySelector('.gallery.container'),
      spec: this.tooltip.popper.querySelector('.spec.container'),
      review: this.tooltip.popper.querySelector('.review.container'),
    }
  }

  async addProduct() {
    this.tooltip.containers.wrapper.classList.add('loading');

    fetch(this.productLinkElement.href).then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw response;
    }).then((text) => {
        const parser = new DOMParser();
        this.productPage = parser.parseFromString(text, "text/html");
        this.tooltip.containers.wrapper.classList.remove('loading');

        this.addSlideShow();
        this.addReviews();
    });
  }

  addSlideShow() {
    const slideshowImages = this.productPage?.querySelectorAll('.slideshow li img')
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