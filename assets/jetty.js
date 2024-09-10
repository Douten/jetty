const productImgs = document.querySelectorAll('div.product img')
// add on hover listener to each product div
productImgs.forEach(productImg => {
    const productLinkElement = productImg.parentElement;    
    const productTooltip = new ProductTooltip(productLinkElement);
    productTooltip.init();

    productImg.addEventListener('click', (e) => {
        const productLinkElement = e.target.parentElement;    
        const productTooltip = productLinkElement._tippy;

        // if alt is pressed show tooltip
        if (e.altKey) {
          productTooltip.show();
        }
    });
})