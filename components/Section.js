export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
  addItem(item, renderer) {
    renderer(item, this._container);
  }
  renderItems() {
    this._container = document.querySelector(this._containerSelector);
    this._items.forEach((item) => {
      this.addItem(item, this._renderer);
    });
  }
}
