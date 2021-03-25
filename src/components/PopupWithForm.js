import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.pop-up__form');
        this._inputs = Array.from(this._form.querySelectorAll('.pop-up__input'));
        this._submitForm = (evt) =>  {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues())
        }
    }
    
    _getInputValues(){
        const values = this._inputs.map((input) => {
            return input.value;
        });
        return values;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    setInputValues(values) {
        this._inputs.forEach((input, i) => {
            input.value = values[i];
        })
    }

    close(){
        super.close();
        this._form.reset();
    }

}