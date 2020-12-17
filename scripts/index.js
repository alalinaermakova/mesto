import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig, initialCards } from './constants.js';

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
const openedPhotoPopup = document.querySelector('.pop-up_picture');
const cardTemplate = document.querySelector('#post-template');

const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();
const newFormPostValidation = new FormValidator(validationConfig, formPost);
newFormPostValidation.enableValidation();

function addCard(item) {
    const postElement = new Card(item, cardTemplate, openPhoto);
    postContainer.prepend(postElement.generateCard());
}

initialCards.forEach(item => {
    addCard(item);
});

function closePopup(popup) {
    popup.classList.remove('pop-up_opened'); 
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupOnEscapeBtn);
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('pop-up')){
        closePopup(evt.target);
    }
};

function closePopupOnEscapeBtn(evt) {
    if (evt.key === 'Escape') {
        const shownPopup = document.querySelector('.pop-up_opened');
        closePopup(shownPopup);
    } 
};

export function showPopup(popup) {
    popup.classList.add('pop-up_opened');
    popup.addEventListener('mouseup', closePopupOverlay);
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
    const item = { name: postTitle, link: postImage };
    addCard(item);
    closePopup(addPostPopup);
}

function openPhoto(photo, title) {
    showPopup(openedPhotoPopup);
    openedPhotoPopup.querySelector('.pop-up__img').src = photo;
    openedPhotoPopup.querySelector('.pop-up__post-title').textContent = title;
}

formPost.addEventListener('submit', submitNewPostForm);

formProfile.addEventListener('submit', submitEditProfileForm);

editProfileButton.addEventListener('click', _ => {
    showPopup(editProfilePopup);
    
    nameField.value = name.textContent;
    descriptionField.value = description.textContent;
    resetValidation(editProfilePopup);
    
});

addPostButton.addEventListener('click', _ => {
    formPost.reset();
    resetValidation(addPostPopup);
    showPopup(addPostPopup);
    
});

closePopupButtons.forEach (button => {
    button.addEventListener('click', _ => {
        const buttonClosestPopup = button.closest('.pop-up');
        closePopup(buttonClosestPopup);
    } );
});

