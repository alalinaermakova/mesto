
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonCLose = this._popup.querySelector('.pop-up__button-close');

        this._handleEscClose = (evt) => {
           if (evt.key === 'Escape') {
                this.close();
            } 
        }
        this._handleCloseOverlay = (evt) => {
            if (evt.target.classList.contains('pop-up')){
                this.close();
            }
        }
        this._handleButtonClose = () => {
            this.close();
        }
    }

    open(){
        this._popup.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(){
        this._buttonCLose.addEventListener('click', this._handleButtonClose);
        this._popup.addEventListener('mouseup', this._handleCloseOverlay);
    }
        
}