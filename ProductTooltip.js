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
    });
  }

  addSlideShow() {
    const slideshow = new ProductSlideShow(this.productPage.querySelector('.slideshow'));
    slideshow.init({ tooltip: this.tooltip });

    this.slideshow = slideshow.slideshow;
  }
}