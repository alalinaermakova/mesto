import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector, titleSelector) {
        super(popupSelector);
        this._imageElement =  this._popup.querySelector(imageSelector);
        this._titleElement = this._popup.querySelector(titleSelector);
    }

    open(title, image){
        this._imageElement.src = image;
        this._titleElement.textContent = title;
        super.open();
    }
}