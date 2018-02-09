import map from 'lodash.map';

export default class {
  /**
   * The options to configure an element with.
   * @typedef {Object} ElementOptions
   * @property {HTMLElement} parent
   * @property {string} tagName
   * @property {string} textContent
   * @property {Object.<string, string>} attributes
   * @property {Object.<string, string>} style
   * @property {ElementOptions[]} children
   */

  /**
   * @param {ElementOptions} options
   */
  static add(options) {
    let element = options.tagName === `svg` || options.tagName === `path` ?
      document.createElementNS(`http://www.w3.org/2000/svg`, options.tagName) :
      document.createElement(options.tagName || `div`);

    map(options.attributes, function (value, key) {
      element.setAttribute(key, value);
    });

    map(options.style, function (value, key) {
      element.style[key] = value;
    });

    if (options.textContent) {
      element.appendChild(document.createTextNode(options.textContent));
    }

    (options.parent || document.body)
      .appendChild(element);

    let elemancer = this;
    map(options.children, function (child) {
      child.parent = element;
      elemancer.add(child);
    });
    return element;
  }
};