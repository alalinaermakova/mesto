let popup = document.querySelector('.pop-up');
let changeButton = document.querySelector('.profile__button_edit');
let closeButton = document.querySelector('.pop-up__button_close');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let form = document.querySelector('.pop-up__form');
let nameField = document.querySelector('.input_form_name');
let descriptionField = document.querySelector('.input_form_description');

changeButton.addEventListener('click', showPopup);

function showPopup() {
    popup.classList.add('pop-up_edit');
    nameField.value = name.textContent;
    descriptionField.value = description.textContent;

}

closeButton.addEventListener('click', closePopup);

function closePopup() {
    popup.classList.remove('pop-up_edit');
}

function submitForm(event) {
    event.preventDefault();
    name.textContent = nameField.value;
    description.textContent = descriptionField.value;
}

form.addEventListener('submit', submitForm);
form.addEventListener('submit', closePopup);