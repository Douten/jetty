class ProductTooltip {
  constructor(productLink) {
    const loadingDiv = document.createElement('div');
    loadingDiv.class = 'slideshow';
    loadingDiv.innerHTML = '<div class="loading">Loading...</div>';

    this.tooltip = new tippy(productLink, {
      content: loadingDiv,
      allowHTML: true,
      interactive: true,
      maxWidth: '100%',
    });

    this.tooltip.show();
  }

  addSlideShow(productPageSlideshow) {
    this.slideshow = new ProductSlideShow(productPageSlideshow);
    this.slideshow.init({ tooltip: this.tooltip });
  }
}