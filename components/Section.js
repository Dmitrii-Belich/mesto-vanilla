export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(item, isInnitial = false) {
    if (isInnitial) {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
  }
  
  renderItems() {
    this._container = document.querySelector(this._containerSelector);
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
