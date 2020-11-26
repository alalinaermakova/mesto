const popupList = document.querySelectorAll('.pop-up');
const editProfilePopup = popupList[0];
const addPostPopup = popupList[1];
const openPhotoPopup = popupList[2];
const editProfileButton = document.querySelector('.profile__button-edit');
const addPostButton = document.querySelector('.profile__button-add');
const addButtonPost = document.querySelector('.pop-up__button-submit_photo');
const closePopupButtons = document.querySelectorAll('.pop-up__button-close');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const form = document.querySelector('.pop-up__form');
const formPost = document.querySelector('.pop-up__form_photo');
const nameField = document.querySelector('.pop-up__input_name');
const descriptionField = document.querySelector('.pop-up__input_description');
const postContainer = document.querySelector('.elements');
const postName = document.querySelector('.pop-up__input_post-name');
const postLink = document.querySelector('.pop-up__input_post-link');
const postTemplate = document.querySelector('#post-template').content;

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

function addCard(name, link){
    const postElement = postTemplate.cloneNode(true);
    const photoElement = postElement.querySelector('.element__item_input');
    const textElement = postElement.querySelector('.element__text_input');
    const likeButton = postElement.querySelector('.element__button-like');
    const deleteButton = postElement.querySelector('.element__button-delete');

    photoElement.src = link;
    textElement.textContent = name;

    addLikeEvent(likeButton);
    postContainer.prepend(postElement);
    deleteButton.addEventListener('click', deletePosts);
    photoElement.addEventListener('click', _ => {
        openPhoto(link, name);
    });
    closePopup(addPostPopup);
}

initialCards.forEach(item => {
    addCard(item.name, item.link);
});

function closePopup(popup) {
    popup.classList.toggle('pop-up_opened'); 
    document.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupOnEscapeBtn);
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

function showPopup(popup) {
    popup.classList.add('pop-up_opened');
    document.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupOnEscapeBtn);
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    name.textContent = nameField.value;
    description.textContent = descriptionField.value;
    closePopup(editProfilePopup);
}

function submitNewPostForm(evt) {
    evt.preventDefault();
    const name = postName.value;
    const link = postLink.value;
    addCard(name, link);
}

function addLikeEvent(element) {
    element.addEventListener('click', evt => {
        evt.target.classList.toggle('element__button-like_active');
    })
};

function deletePosts(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
};
  
function openPhoto(photo, title) {
    showPopup(openPhotoPopup);
    openPhotoPopup.querySelector('.pop-up__img').src = photo;
    openPhotoPopup.querySelector('.pop-up__post-title').textContent = title;
};

formPost.addEventListener('submit', submitNewPostForm);
form.addEventListener('submit', submitEditProfileForm);
editProfileButton.addEventListener('click', _ => {
    showPopup(editProfilePopup);
    nameField.value = name.textContent;
    descriptionField.value = description.textContent;
    enableValidation();
});
addPostButton.addEventListener('click', _ => {
    showPopup(addPostPopup);
    enableValidation();
});

closePopupButtons.forEach (button => {
    button.addEventListener('click', _ => {
        const buttonClosestPopup = button.closest('.pop-up');
        closePopup(buttonClosestPopup);
    } );
});

