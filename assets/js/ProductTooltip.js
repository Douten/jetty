class ProductTooltip {
  constructor(productLinkElement) {
    this.productLinkElement = productLinkElement;
    this.addToCartBtn = productLinkElement.closest('.product')
      .querySelector('.add-to-cart') || productLinkElement.closest('.product')
      .querySelector('.button-secondary') 
    this.addToCartBtn = this.addToCartBtn.cloneNode(true);
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
      allowHTML: true,
      appendTo: this.productLinkElement.closest('.product')
        .querySelector('div:last-child'),
      arrow: false,
      content: template.node,
      delay: [1000, 500],
      interactive: true,
      interactiveBorder: 50,
      trigger: 'manual',
      maxWidth: '100%',
      offset: [0, -220],
      placement: 'bottom',
      onShow: (instance) => {
        tippy.hideAll({ exclude: instance });
        window.addEventListener('keyup', (e) => {
          // unable to limit to this instance and have it hide right away
          if (e.key === 'Escape') tippy.hideAll();
        });

        if (!this.loaded) {
          this.addProduct();
        }
      },
      onHide: () => {
        window.removeEventListener('keyup', (e) => {
          if (e.key === 'Escape') tippy.hideAll();
        });
      }
    });

    // containers to insert product components
    this.tooltip.containers = {
      wrapper: this.tooltip.popper.querySelector('.product-tooltip-wrapper'),
      toolbar: this.tooltip.popper.querySelector('.toolbar'),
      gallery: this.tooltip.popper.querySelector('.gallery.container'),
      description: this.tooltip.popper.querySelector('.description.container'),
      review: this.tooltip.popper.querySelector('.review.container'),
    }

    this.tooltip.closeButton = this.tooltip.popper.querySelector('.close.button');
    this.tooltip.closeButton.addEventListener('click', () => this.tooltip.hide());
    this.addToCartBtn.addEventListener('click', () => this.tooltip.hide());
    this.tooltip.containers.toolbar.querySelector('.action').append(this.addToCartBtn);
  }

  async addProduct() {
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
    slideshow.init({ tooltip: this.tooltip });
    this.enableNavButton('gallery');
  }

  addDescription() {
    const description = this.productPage?.querySelector('.description');
    if (!description) return;

    this.tooltip.containers.description.append(description);
    this.tooltip.containers.description.classList.remove('d-none');
    this.enableNavButton('description');
  }

  addReviews() {
    const reviews = this.productPage?.querySelectorAll('.review-container > div:first-child');
    if (!reviews.length) return;

    
    reviews.forEach(review => review.className = '');
    this.tooltip.containers.review.append(...reviews);
    this.tooltip.containers.review.classList.remove('d-none');
    this.enableNavButton('review');
  }

  enableNavButton(name) {
    const container = this.tooltip.containers;
    const button = this.tooltip.popper.querySelector(`.${name}.button`);

    button.addEventListener('click', () => {
      const scrollTo = container[name].offsetTop
        - container.toolbar.scrollHeight - 10;
      container.wrapper.scrollTo({ top: scrollTo, behavior: 'smooth' });
    });

    button.classList.remove('d-none');
  }
}