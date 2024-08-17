class ProductTooltip {
  constructor(productLink) {
    const loadingDiv = document.createElement('div');
    loadingDiv.class = 'slideshow';
    loadingDiv.innerHTML = '<div class="loading">Loading...</div>';

    const tooltip = new tippy(productLink, {
      content: loadingDiv,
      allowHTML: true,
      interactive: true,
      maxWidth: '100%',
    });

    tooltip.show();

    return tooltip;
  }

}