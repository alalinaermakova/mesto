import Popup from './Popup.js';

export default class PopupConfirmation extends Popup  {
    constructor(popupSelector, submitButtonSelector, {handleConfirmation}) {
        super(popupSelector)
        this._handleConfirmation = handleConfirmation;
        this._deleteCard = (evt) => {
            evt.preventDefault();
            this._handleConfirmation(this._card);
        }
        this._buttonYes = this._popup.querySelector(submitButtonSelector);
    }

    setEventListeners(){
        super.setEventListeners();
        this._buttonYes.addEventListener('click', this._deleteCard);
    }

    setCard(card){
        this._card = card;
    }
}