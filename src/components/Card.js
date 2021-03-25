export default class Card {
    constructor(name, link, template, likesCount, cardId, {handleOpenPopupPhoto, handleRemoveCardConfirm, handleLikeEvt}) {
       this._title = name;
       this._image = link;
       this._template = template;
       this._likes = likesCount;
       this._id = cardId;
       this._handleOpenPopupPhoto = handleOpenPopupPhoto; 
       this._handleRemoveCardConfirm = handleRemoveCardConfirm;
       this._handleLikeEvt = () => {
           handleLikeEvt(this._element.querySelector('.element__button-like').classList.contains('element__button-like_active'))
       };

    }

    _getTemplate() {
        const element = this._template
        .content
        .querySelector('.element')
        .cloneNode(true);

        return element;
    }

    addLike() {
        this._element.querySelector('.element__button-like').classList.add('element__button-like_active');
        this._element.querySelector('.element__likes-number').textContent = ++this._likes;
    }

    removeLike() {
        this._element.querySelector('.element__button-like').classList.remove('element__button-like_active');
        this._element.querySelector('.element__likes-number').textContent = --this._likes;
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__button-like').addEventListener('click', this._handleLikeEvt);

        this._element.querySelector('.element__button-delete').addEventListener('click', _=> {
            this._handleRemoveCardConfirm();
        });

        this._element.querySelector('.element__item_image').addEventListener('click', _=> {
            this._handleOpenPopupPhoto (this._title, this._image);
        });
    }

    generateCard(belongsToMe, likedByMe) {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__description_input').textContent = this._title;
        this._element.querySelector('.element__item_image').src = this._image;
        this._element.querySelector('.element__likes-number').textContent = this._likes;
        if (!belongsToMe){
             this._element.querySelector('.element__button-delete').classList.add('element__button-delete_hidden');
        } else {
            this._element.querySelector('.element__button-delete').classList.remove('element__button-delete_hidden'); 
        }

        if (likedByMe) {
            this._element.querySelector('.element__button-like').classList.add('element__button-like_active');
        } else {
            this._element.querySelector('.element__button-like').classList.remove('element__button-like_active');
        }
    
        return this._element;        
    }

    getCardId() {
        return this._id
    }

}

