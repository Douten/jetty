const productImgs = document.querySelectorAll('div.product img')
// add on hover listener to each product div
productImgs.forEach(productDiv => {
  productDiv.addEventListener('mouseover', (e) => {
    onProductHover(e);
  })
})

const onProductHover = (e) => {
    tippy.hideAll();

    const productLink = e.target.parentElement;
    const loaded = e.target.parentElement.dataset.loaded;

    if (loaded) {
        return
    }

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

    fetch(productLink.href).then(function (response) {
        if (response.ok) {
            return response.text();
        }
        throw response;
    }).then(function (text) {
        var parser = new DOMParser();
        var itemPage = parser.parseFromString(text, "text/html");
        const productPageSlideshow = itemPage.querySelector('.slideshow');

        new ProductSlideShow(productPageSlideshow, tooltip);
        e.target.parentElement.dataset.loaded = true;
    });
}