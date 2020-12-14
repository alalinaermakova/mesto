import { showPopup } from './index.js';

export class Card {
    constructor(postTitle, postImage) {
       this._title = postTitle;
       this._image = postImage; 
    }

    _getTemplate() {
        const cardElement = document.querySelector('#post-template')
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _handleLikeEvt() {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _openPopupPhoto = () => {
        const openedPhotoPopup = document.querySelector('.pop-up_picture');
        const popupImage = document.querySelector('.pop-up__img');
        const imageTitle = document.querySelector('.pop-up__post-title');

        popupImage.src = this._image;
        imageTitle.textContent = this._title;

        showPopup(openedPhotoPopup);
    }

    _setEventListeners() {
        this._element.querySelector('.element__button-like').addEventListener('click', _=> {
            this._handleLikeEvt();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click', _=> {
            this._handleDeleteCard();
        });

        this._element.querySelector('.element__item_image').addEventListener('click', _=> {
            this._openPopupPhoto();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__item_image').src = this._image;
        this._element.querySelector('.element__text_input').textContent = this._title;

        

        return this._element;
        
    }

}

