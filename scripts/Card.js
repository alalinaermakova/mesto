export class Card {
    constructor(data, template, handleOpenPopupPhoto) {
       this._title = data.name;
       this._image = data.link;
       this._template = template;
       this._handleOpenPopupPhoto = handleOpenPopupPhoto; 
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

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__button-like').addEventListener('click', _=> {
            this._handleLikeEvt();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', _=> {
            this._handleDeleteCard();
        });

        this._element.querySelector('.element__item_image').addEventListener('click', _=> {
            this._handleOpenPopupPhoto (this._image , this._title);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__item_image').src = this._image;
        this._element.querySelector('.element__description_input').textContent = this._title;


        return this._element;
        
    }

}

