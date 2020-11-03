let popup = document.querySelector('.pop-up');
let changeButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.pop-up__button-close');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let form = document.querySelector('.pop-up__form');
let nameField = document.querySelector('.input__name');
let descriptionField = document.querySelector('.input__description');

function showPopup() {
    nameField.value = name.textContent;
    descriptionField.value = description.textContent;
    popup.classList.add('pop-up_edit');
}

function closePopup() {
    popup.classList.remove('pop-up_edit');
}

function submitForm(event) {
    event.preventDefault();
    name.textContent = nameField.value;
    description.textContent = descriptionField.value;
    closePopup();
}

form.addEventListener('submit', submitForm);
changeButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);