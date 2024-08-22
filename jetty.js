const productImgs = document.querySelectorAll('div.product img')
// add on hover listener to each product div
productImgs.forEach(productImg => {
    const productLinkElement = productImg.parentElement;    
    const productTooltip = new ProductTooltip(productLinkElement);
    productTooltip.init();
})