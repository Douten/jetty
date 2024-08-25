class ProductTooltip {
  constructor(productLinkElement) {
    this.productLinkElement = productLinkElement;
  }

  async init() {
    await this.renderTooltip();
  }

  async renderTooltip() {
    // Create Tooltip Template, including loading state
    this.loaded = false
    const template = new Template('product-tooltip');
    await template.init();

    this.tooltip = new tippy(this.productLinkElement, {
      content: template.node,
      allowHTML: true,
      placement: 'bottom',
      interactive: true,
      appendTo: this.productLinkElement.closest('.product')
        .querySelector('div:last-child'),
      maxWidth: '100%',
      offset: [0, -220],
      delay: [750, 100],
      arrow: false,
      onShow: () => {
        if (!this.loaded) {
          this.addProduct();
        }
      }
    });

    // containers to insert product components
    this.tooltip.containers = {
      wrapper: this.tooltip.popper.querySelector('.product-tooltip-wrapper'),
      gallery: this.tooltip.popper.querySelector('.gallery.container'),
      description: this.tooltip.popper.querySelector('.description.container'),
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
        
        this.loaded = true;
        this.addSlideShow();
        this.addDescription();
        this.addReviews();
    });
  }

  addSlideShow() {
    const slideshowImages = this.productPage?.querySelectorAll('.slideshow li img')
    if (!slideshowImages) return;
    
    const slideshow = new ProductSlideShow(slideshowImages);
    slideshow.init({ container: this.tooltip.containers.gallery });
    // update to remove when each section is loaded
    this.tooltip.containers.wrapper.classList.remove('loading');
  }

  addDescription() {
    const description = this.productPage?.querySelector('.description');
    if (!description) return;

    this.tooltip.containers.description.append(description);
  }

  addReviews() {
    const reviews = this.productPage?.querySelectorAll('.review-container > div:first-child');
    if (!reviews.length) return;

    reviews.forEach(review => review.className = '');
    this.tooltip.containers.review.append(...reviews);
  }
}