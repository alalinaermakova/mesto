import './index.css';

import {validationConfig, 
        initialCards,
        nameField,
        descriptionField,
        formProfile,
        formPost,
        editProfileButton,
        addPostButton,
        editProfilePopupSelector,
        addPostPopupSelector,
        openedPhotoPopupSelector,
        openedPhotoPopupImage,
        openedPhotoPopupTitle,
        cardTemplateSelector,
        postContainer,
        inputNameField,
        inputDescriptionField
    }   from '../utils/constants.js';

import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import  Section  from '../components/Section.js';
import  PopupWithImage  from '../components/PopupWithImage.js';
import  PopupWithForm  from '../components/PopupWithForm.js';
import  UserInfo  from '../components/UserInfo.js';


const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();
const newFormPostValidation = new FormValidator(validationConfig, formPost);
newFormPostValidation.enableValidation();

const userInfo = new UserInfo(nameField, descriptionField);
const popupWithImage = new PopupWithImage(openedPhotoPopupSelector, openedPhotoPopupImage, openedPhotoPopupTitle);

function createCardElement(title, image) {
    const card = new Card(title, image, cardTemplateSelector, {
        handleOpenPopupPhoto: (placeTitle, placeImage) => {
            popupWithImage.open(placeTitle, placeImage);
        }
    });
    const cardElement = card.generateCard();
    return cardElement;
}

const popupAddPost = new PopupWithForm(addPostPopupSelector, {
    handleSubmitForm: (values) => {
        console.log(values)
        const title = values[0];
        const image = values[1];
        defaultCardList.addItem(createCardElement(title, image));
        popupAddPost.close();
    }
});

const popupProfile = new PopupWithForm(editProfilePopupSelector, {
    handleSubmitForm: (values) => {
        userInfo.setUserInfo(values[0], values[1]);
        popupProfile.close();
    }
});

const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const placeTitle = item.name;
        const placeImage = item.link;
        defaultCardList.addItem(createCardElement(placeTitle, placeImage));
    }
}, postContainer);

defaultCardList.renderItems();

editProfileButton.addEventListener('click', _=> {
    popupProfile.open();
    const {name, description} = userInfo.getUserInfo();
    inputNameField.value = name;
    inputDescriptionField.value= description;
    formProfileValidation.reset();
});

addPostButton.addEventListener('click', _=> {
    popupAddPost.open();
    newFormPostValidation.reset();
});

popupAddPost.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();

