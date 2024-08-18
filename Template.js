TEMPLATE_LIST = [
  'product-tooltip',
]

class Template {
  constructor(name) {
    if (TEMPLATE_LIST.includes(name)) {
      throw new Error(`Template name ${name} not found`);
    }
    
    this.templateName = name;
    this.node = null;
  }

  async init() {
    this.node = await this.getTemplate(this.templateName);
  }

  async getTemplate(name) {
    const templateFileUrl = browser.runtime.getURL(`templates/${name}.html`);
    const response = await fetch(templateFileUrl);

    let templateNode = null;

    if (!response.ok) {
      throw new Error(`Could not fetch template: ${response.statusText}`);
    } else {
      const templateText = await response.text();
      const parser = new DOMParser();
      templateNode = parser.parseFromString(templateText, 'text/html')
        .documentElement.querySelector('template').content.cloneNode(true);
    }

    console.log({ templateNode });

    return templateNode;
  }
}