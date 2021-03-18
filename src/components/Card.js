export default class Card {
    constructor(name, link, template, likesCount, {handleOpenPopupPhoto, handleRemoveCardConfirm}) {
       this._title = name;
       this._image = link;
       this._template = template;
       this._likes = likesCount;
       this._handleOpenPopupPhoto = handleOpenPopupPhoto; 
       this._handleRemoveCardConfirm = handleRemoveCardConfirm;
    }

    _getTemplate() {
        const element = this._template
        .content
        .querySelector('.element')
        .cloneNode(true);

        return element;
    }

    _handleLikeEvt() {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__button-like').addEventListener('click', _=> {
            this._handleLikeEvt();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', _=> {
            this._handleRemoveCardConfirm();
        });

        this._element.querySelector('.element__item_image').addEventListener('click', _=> {
            this._handleOpenPopupPhoto (this._title, this._image);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__description_input').textContent = this._title;
        this._element.querySelector('.element__item_image').src = this._image;
        this._element.querySelector('.element__likes-number').textContent = this._likes;
    
        return this._element;        
    }

}

