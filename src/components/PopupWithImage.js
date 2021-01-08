import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, title, image, imageSelector, titleSelector) {
        super(popupSelector);
        this._image = image;
        this._title = title;
        this._imageSelector = imageSelector;
        this._titleSelector = titleSelector;
    }

    open(){
        const popupImage = this._popup.querySelector(this._imageSelector);
        const popupTitle = this._popup.querySelector(this._titleSelector);
        popupImage.src = this._image;
        popupTitle.textContent = this._title;
        console.log('open');
        super.open();
    }
}