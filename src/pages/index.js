import './index.css';

import {validationConfig, 
        nameField,
        descriptionField,
        newAvatarField,
        formProfile,
        formPost,
        formAvatar,
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
        newAvatarPopupSelector,
        editAvatar,
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
import  PopupConfirmation from '../components/PopupConfirmation';


const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();
const newFormPostValidation = new FormValidator(validationConfig, formPost);
newFormPostValidation.enableValidation();
const formEditAvatarValidation = new FormValidator(validationConfig, formAvatar);
formEditAvatarValidation.enableValidation();

const userInfo = new UserInfo(nameField, descriptionField, newAvatarField);
const popupWithImage = new PopupWithImage(openedPhotoPopupSelector, openedPhotoPopupImage, openedPhotoPopupTitle);
const popupRemoveCardConfirm = new PopupConfirmation(confirmationPopupSelector, yesButtonSelector, {
    handleConfirmation: (card) => {
        api.deleteYourCard(card.getCardId());
        popupRemoveCardConfirm.setProgress('Удаляю...');
        card.removeCard()
        popupRemoveCardConfirm.close();
        popupRemoveCardConfirm.resetProgress('Да');
    }
});


const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
    headers: {
        authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995'
    }
});

api.getInfo({
    updInfo: (data) => {
        userInfo.updateUserInfo(data.name, data.about, data.avatar, data._id);
    }
})

const defaultCardList = new Section({
    items: [],
    renderer: (item) => {
        const placeTitle = item.name;
        const placeImage = item.link;
        const ownerId = item.owner._id;
        const cardId = item._id;
        const likes = item.likes;
        defaultCardList.addItem(createCardElement(placeTitle, placeImage, ownerId, cardId, likes));
    }
}, postContainer);

api.getCards({onSuccess: (cards) => {
    defaultCardList.addCards(cards)
}});

function createCardElement(title, image, cardOwnerId, cardId, likes) {
    const card = new Card(title, image, cardTemplateSelector, likes.length, cardId, {
        handleOpenPopupPhoto: (placeTitle, placeImage) => {
            popupWithImage.open(placeTitle, placeImage);
        },
        handleRemoveCardConfirm: () => {
            popupRemoveCardConfirm.setCard(card);
            popupRemoveCardConfirm.open();
        },
        handleLikeEvt: (isLiked) => {
            if (isLiked) {
                api.removeLike(card.getCardId());
                card.removeLike();
            } else {
                api.setLike(card.getCardId());
                card.addLike();
            }
        }
    });

    const userId = userInfo.getUserInfo().userId;
    const belongsToMe = userId == cardOwnerId;
    const likedByMe = likes.some(like => like._id === userId)
    const cardElement = card.generateCard(belongsToMe, likedByMe);

    return cardElement;
}

const popupAddPost = new PopupWithForm(addPostPopupSelector, {
    handleSubmitForm: (values) => {
        const title = values[0];
        const image = values[1];
        api.addNewPost(title, image, {
            onSuccess: (data) => {
                defaultCardList.prependItem(createCardElement(data.name, data.link, userInfo.getUserInfo().userId, data._id, []))
            }
        });
        popupAddPost.setProgress('Создаю...');
        popupAddPost.close();
        popupAddPost.resetProgress('Создать');
    }
});

const popupProfile = new PopupWithForm(editProfilePopupSelector, {
    handleSubmitForm: (values) => {
        api.updateUserInfo(values[0], values[1], {
            setInfo: (data) => {
                userInfo.setUserInfo(data.name, data.about);
            }
        });
        popupProfile.setProgress('Загрузка...');
        popupProfile.close();
        popupProfile.resetProgress('Сохранить');
    }
});

const popupNewAvatar = new PopupWithForm(newAvatarPopupSelector, {
    handleSubmitForm: (values) => {
        const avatar = values[0];
        api.setNewAvatar(avatar);
        popupNewAvatar.setProgress('Сохраняю...');
        userInfo.setAvatar(avatar);
        popupNewAvatar.close();
        popupNewAvatar.resetProgress('Сохранить');
    }
});

editAvatar.addEventListener('click', _=> {
    popupNewAvatar.open();
    formEditAvatarValidation.reset();
})

editProfileButton.addEventListener('click', _=> {
    popupProfile.open();
    const {name, description} = userInfo.getUserInfo();
    inputNameField.value = name;
    inputDescriptionField.value = description;
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
popupNewAvatar.setEventListeners();