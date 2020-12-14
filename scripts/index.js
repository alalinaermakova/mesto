import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupList = document.querySelectorAll('.pop-up');
const editProfilePopup = document.querySelector('.pop-up_profile');
const addPostPopup = document.querySelector('.pop-up_add-card');
const editProfileButton = document.querySelector('.profile__button-edit');
const addPostButton = document.querySelector('.profile__button-add');
const closePopupButtons = document.querySelectorAll('.pop-up__button-close');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const formProfile = document.querySelector('.pop-up__form_add');
const formPost = document.querySelector('.pop-up__form_photo');
const nameField = document.querySelector('.pop-up__input_name');
const descriptionField = document.querySelector('.pop-up__input_description');
const postContainer = document.querySelector('.elements');
const postName = document.querySelector('.pop-up__input_post-name');
const postLink = document.querySelector('.pop-up__input_post-link');

const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__button-submit',
    inactiveButtonClass: 'pop-up__button-submit_disabled',
    inputErrorClass: 'pop-up__input_error',
    errorClass: 'popup__error-visible'
 };

const formProfileValidation = new FormValidator(validationConfig, formProfile);
const newFormPostValidation = new FormValidator(validationConfig, formPost);
newFormPostValidation.enableValidation();

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCard(postTitle, postImage) {
    const postElement = new Card(postTitle, postImage);
    postContainer.prepend(postElement.generateCard());
}

initialCards.forEach(item => {
    addCard(item.name, item.link);
});

function closePopup(popup) {
    popup.classList.remove('pop-up_opened'); 
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupOnEscapeBtn);
    resetValidation(popup);
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('pop-up')){
        closePopup(evt.target);
    }
};

function closePopupOnEscapeBtn(evt) {
    if (evt.key === 'Escape') {
        const shownPopup = Array.from(popupList).find(element => element.classList.contains('pop-up_opened'));
        closePopup(shownPopup);
    } 
};

export function showPopup(popup) {
    popup.classList.add('pop-up_opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupOnEscapeBtn);
}

function resetValidation(popup) {
    if (popup.classList.contains('pop-up_profile')) {
        formProfileValidation.reset();
    } else if (popup.classList.contains('pop-up_add-card')) {
        newFormPostValidation.reset();
    }
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    name.textContent = nameField.value;
    description.textContent = descriptionField.value;
    closePopup(editProfilePopup);
}

function submitNewPostForm(evt) {
    evt.preventDefault();
    const postTitle = postName.value;
    const postImage = postLink.value;
    addCard(postTitle, postImage);
    closePopup(addPostPopup);
}

formPost.addEventListener('submit', submitNewPostForm);

formProfile.addEventListener('submit', submitEditProfileForm);

editProfileButton.addEventListener('click', _ => {
    showPopup(editProfilePopup);
    nameField.value = name.textContent;
    descriptionField.value = description.textContent;
    formProfileValidation.enableValidation();
});

addPostButton.addEventListener('click', _ => {
    newFormPostValidation.reset();
    showPopup(addPostPopup);
});

closePopupButtons.forEach (button => {
    button.addEventListener('click', _ => {
        const buttonClosestPopup = button.closest('.pop-up');
        closePopup(buttonClosestPopup);
    } );
});

