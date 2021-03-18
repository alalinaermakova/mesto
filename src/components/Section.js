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
        this._container.append(element);
    }

    prependItem(element){
        this._container.prepend(element);
    }

    addCards(cards){
        this._items = this._items.concat(cards);
        this.renderItems()
    }

    renderItems() {
        this.clear();
        this._items.forEach(element => {
            this._renderer(element);
        });
    }
}