export default class Section {
    constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer.bind(this);
    this._container = containerSelector;
    }

    clear() {
        this._container.innerHTML = '';
    }

    addItem(element) {
        this._renderer(element);
    }

    renderItems() {
        this.clear();
        this._items.forEach(element => {
            this.addItem(element);
        });
    }
}