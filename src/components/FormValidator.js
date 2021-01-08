export default class FormValidator {

    constructor(config, form) {
        this._form = form;
        this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
        this._submitButton = form.querySelector(config.submitButtonSelector);
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        error.textContent = '';
        error.classList.remove(this._errorClass);
    }

    _isValid(input) {
        if(!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
    }

    _disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', '');
    }

    _hasInvalidInput(){
        return this._inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
          } else {
            this._enableButton();
          }
    }

    _setEventListeners(){
        this._inputList.forEach((input) => {
            input.addEventListener('input', _=> {
                this._isValid(input);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
        this._form.addEventListener('submit', (evt)=> {
            evt.preventDefault();
            this._disableButton();
        });
    }

    reset() {
        const errorMessages = this._form.querySelectorAll(`.${this._errorClass}`);
        errorMessages.forEach((item) => {
            item.textContent = '';
        });
        this._inputList.forEach((input) => {
            input.classList.remove(this._inputErrorClass);
        });
        this._toggleButtonState();
    }
}