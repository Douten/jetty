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
    const loaded = productLink.dataset.loaded;

    if (loaded) return;

    const productTooltip = new ProductTooltip(productLink)

    fetch(productLink.href).then(function (response) {
        if (response.ok) {
            return response.text();
        }
        throw response;
    }).then(function (text) {
        const parser = new DOMParser();
        const itemPage = parser.parseFromString(text, "text/html");
        const productPageSlideshow = itemPage.querySelector('.slideshow');

        productTooltip.addSlideShow(productPageSlideshow);

        if (productTooltip.slideshow.innerElements.length > 1) {
            productLink.dataset.loaded = true;
        }
    });
}