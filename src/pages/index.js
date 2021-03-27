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
        popupRemoveCardConfirm.setProgress('Удаляю...');
        api.deleteYourCard(card.getCardId())
            .then(() => {
                card.removeCard()
                popupRemoveCardConfirm.close();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupRemoveCardConfirm.resetProgress('Да');
            })
    }
});


const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
    headers: {
        authorization: 'b473b6d5-1b9c-4d92-98e7-7dbd1658e995'
    }
});

Promise.all([
    api.getInfo(),
    api.getCards()
])
.then(([data, cards]) => {
    userInfo.updateUserInfo(data.name, data.about, data.avatar, data._id);
    defaultCardList.addCards(cards);
})
.catch((err) => {
    console.log(err)
})

const popupProfile = new PopupWithForm(editProfilePopupSelector, {
    handleSubmitForm: (values) => {
        popupProfile.setProgress('Загрузка...');
        api.updateUserInfo(values[0], values[1])
            .then((data) => {
                userInfo.setUserInfo(data.name, data.about);
                popupProfile.close();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupProfile.resetProgress('Сохранить');
            })
                
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
                api.removeLike(card.getCardId())
                .then(() => {
                    card.removeLike();
                })
            } else {
                api.setLike(card.getCardId())
                .then(() => {
                    card.addLike();
                })
                
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
        popupAddPost.setProgress('Создаю...');
        api.addNewPost(values[0], values[1])
            .then((data) => {
                defaultCardList.prependItem(createCardElement(data.name, data.link, userInfo.getUserInfo().userId, data._id, []))
                popupAddPost.close();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupAddPost.resetProgress('Создать');
            })
    }
});

const popupNewAvatar = new PopupWithForm(newAvatarPopupSelector, {
    handleSubmitForm: (values) => {
        popupNewAvatar.setProgress('Сохраняю...');
        api.setNewAvatar(values[0])
            .then((data) => {
                userInfo.setAvatar(data.avatar);
                popupNewAvatar.close();
            })
            .catch((err) => {
                console.log(err + ' что-то пошло не так')
            })
            .finally(() => {
                popupNewAvatar.resetProgress('Сохранить');
            })
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