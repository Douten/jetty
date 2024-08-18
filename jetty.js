const productImgs = document.querySelectorAll('div.product img')
// add on hover listener to each product div
productImgs.forEach(productDiv => {
  productDiv.addEventListener('mouseover', (e) => {
    onProductHover(e);
  })
})

const onProductHover = (e) => {
    const productLinkElement = e.target.parentElement;
    // Exit if tooltip is already initialized
    if (productLinkElement.getAttribute('aria-expanded')) return;
    
    const productTooltip = new ProductTooltip(productLinkElement);
    productTooltip.init();
}