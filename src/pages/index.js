import './index.css';

import {validationConfig, 
        nameField,
        descriptionField,
        newAvatarField,
        formProfile,
        formPost,
        editProfileButton,
        addPostButton,
        yesButtonSelector,
        editProfilePopupSelector,
        addPostPopupSelector,
        openedPhotoPopupSelector,
        openedPhotoPopupImage,
        openedPhotoPopupTitle,
        confirmationPopupSelector,
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
import  Api  from '../components/Api.js';
import PopupConfirmation from '../components/PopupConfirmation';


const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();
const newFormPostValidation = new FormValidator(validationConfig, formPost);
newFormPostValidation.enableValidation();

const userInfo = new UserInfo(nameField, descriptionField, newAvatarField);
const popupWithImage = new PopupWithImage(openedPhotoPopupSelector, openedPhotoPopupImage, openedPhotoPopupTitle);
const popupRemoveCardConfirm = new PopupConfirmation(confirmationPopupSelector, yesButtonSelector, {
    handleConfirmation: (card) => {
        card.removeCard()
        popupRemoveCardConfirm.close();
    }
});
const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-19/',
    headers: {
        authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995'
    }
    
});

function createCardElement(title, image, likesCount) {
    const card = new Card(title, image, cardTemplateSelector, likesCount, {
        handleOpenPopupPhoto: (placeTitle, placeImage) => {
            popupWithImage.open(placeTitle, placeImage);
        },
        handleRemoveCardConfirm: () => {
            popupRemoveCardConfirm.setCard(card);
            popupRemoveCardConfirm.open();
        }
    });
    const cardElement = card.generateCard();
    return cardElement;
}

const popupAddPost = new PopupWithForm(addPostPopupSelector, {
    handleSubmitForm: (values) => {
        const title = values[0];
        const image = values[1];
        addNewPost(title, image);
        popupAddPost.close();
    }
});

const popupProfile = new PopupWithForm(editProfilePopupSelector, {
    handleSubmitForm: (values) => {
        updateUserInfo(values[0], values[1]);
        popupProfile.close();
    }
});


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
popupRemoveCardConfirm.setEventListeners();


fetch('https://mesto.nomoreparties.co/v1/cohort-19/users/me', {
    method: 'GET',
    headers: {
        authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995'
    }
})
.then(res => res.json())
.then((data) => {
    userInfo.updateUserInfo(data.name, data.about, data.avatar, data._id);
});

const defaultCardList = new Section({
    items: [],
    renderer: (item) => {
        const placeTitle = item.name;
        const placeImage = item.link;
        const likesCount = item.likes.length;
        defaultCardList.addItem(createCardElement(placeTitle, placeImage, likesCount));
    }
}, postContainer);

fetchCards(defaultCardList);

function fetchCards(cardSection){
    fetch('https://mesto.nomoreparties.co/v1/cohort-19/cards', {
    method: 'GET',
    headers: {
        authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995'
        }
    })
    .then(res => res.json())
    .then((cards) => {
        cardSection.addCards(cards);
    });
}

function updateUserInfo(name, description){
    fetch('https://mesto.nomoreparties.co/v1/cohort-19/users/me', {
    method: 'PATCH',
    headers: {
        authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(res => res.json())
    .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
    });
}

function addNewPost(title, image){
    fetch('https://mesto.nomoreparties.co/v1/cohort-19/cards', {
        method: 'POST',
        headers: {
            authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: title,
            link: image
          })
    })
    .then(res => res.json())
    .then((data) => {
        defaultCardList.prependItem(createCardElement(data.name, data.link));
    })
}

function deleteYourCard(card, cardId) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-19/cards/cardId', {
        method: 'DELETE',
        headers: {
            authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995',
            'Content-Type': 'application/json'
        },

    })
}



