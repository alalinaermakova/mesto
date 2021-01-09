export default class Section {
    constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    }

    clear() {
        this._container.innerHTML = '';
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this.clear();
        this._items.forEach(element => {
            this._renderer(element);
        });
    }
}