export const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__button-submit',
    inactiveButtonClass: 'pop-up__button-submit_disabled',
    inputErrorClass: 'pop-up__input_error',
    errorClass: 'pop-up__error-visible'
 };
 

export const nameField = '.profile__name';
export const descriptionField = '.profile__description';
export const inputNameField = document.querySelector('.pop-up__input_name');
export const inputDescriptionField = document.querySelector('.pop-up__input_description');

export const formProfile = document.querySelector('.pop-up__form_add');
export const formPost = document.querySelector('.pop-up__form_photo');

export const closePopupButtons = document.querySelectorAll('.pop-up__button-close');
export const editProfileButton = document.querySelector('.profile__button-edit');
export const addPostButton = document.querySelector('.profile__button-add');

export const editProfilePopupSelector = '.pop-up_profile';
export const addPostPopupSelector = '.pop-up_add-card';
export const openedPhotoPopupSelector = '.pop-up_picture';

export const openedPhotoPopupImage = '.pop-up__img';
export const openedPhotoPopupTitle = '.pop-up__post-title';

export const cardTemplateSelector = document.querySelector('#post-template');
export const postContainer = document.querySelector('.elements');

export const initialCards = [
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