function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
}



function checkInputValidity (form, input, config) {
    if(!input.validity.valid) {
        showError(form, input, config);
    } else {
        hideError(form, input, config);
    }
}

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}


function setEventListeners(form, config) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    const inputsList = form.querySelectorAll(config.inputSelector);
    setButtonState(submitButton, form.checkValidity(), config);
    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    })

}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // resetState(form);
          });
      
        setEventListeners(form, config);
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    });
}

const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__button-submit',
    inactiveButtonClass: 'pop-up__button-submit_disabled',
    inputErrorClass: 'pop-up__input_error',
    errorClass: 'popup__error_visible'
 };

 enableValidation(validationConfig);