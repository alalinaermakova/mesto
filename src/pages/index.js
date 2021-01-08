import {validationConfig, 
        initialCards,
        nameField,
        descriptionField,
        formProfile,
        formPost,
        closePopupButtons,
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

const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const placeTitle = item.name;
        const placeImage = item.link;
        const cardElement = new Card(placeTitle, placeImage, cardTemplateSelector, {
            handleOpenPopupPhoto: (placeTitle, placeImage) => {
                const popupWithImage = new PopupWithImage(openedPhotoPopupSelector, placeTitle, placeImage, openedPhotoPopupImage, openedPhotoPopupTitle);
                popupWithImage.open();
            }
        });
        const generateCards = cardElement.generateCard();
        defaultCardList._container.prepend(generateCards);
    }
}, postContainer);

defaultCardList.renderItems();

editProfileButton.addEventListener('click', function(){
    const popupProfile = new PopupWithForm(editProfilePopupSelector, {
        handleSubmitForm: (evt) => {
            evt.preventDefault();
            const values = popupProfile._getInputValues();
            userInfo.setUserInfo(values[0], values[1]);
            popupProfile.close();
        }
    });
    popupProfile.open();
    const {name, description} = userInfo.getUserInfo();
    inputNameField.value = name;
    inputDescriptionField.value= description;
    formProfileValidation.reset();
});

addPostButton.addEventListener('click', function(){
    const popupAddPost = new PopupWithForm(addPostPopupSelector, {
        handleSubmitForm: (evt) => {
            evt.preventDefault();
            const values = popupAddPost._getInputValues();
            const post = {
                name: values[0],
                link: values[1]
            };
            defaultCardList.addItem(post);
            popupAddPost.close();
        }
    });
    popupAddPost.open();
    
});