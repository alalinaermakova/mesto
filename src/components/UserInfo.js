import { newAvatarField } from "../utils/constants";

export default class UserInfo {
    constructor (nameField, descriptionField, newAvatarField){
        this._nameElement = document.querySelector(nameField);
        this._descriptionElement = document.querySelector(descriptionField);
        this._avatarElement = document.querySelector(newAvatarField);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const description = this._descriptionElement.textContent;
        return {
            name: name,
            description: description,
            userId: this._userId

        };
    }

    setUserInfo(newName, newDescription){
        this._nameElement.textContent = newName;
        this._descriptionElement.textContent = newDescription;
    }

    setAvatar(avatar){
        this._avatarElement.src = avatar;
    }

    updateUserInfo(newName, newAboutInfo, newAvatar, userId){
        this._nameElement.textContent = newName;
        this._descriptionElement.textContent = newAboutInfo;
        this._avatarElement.src = newAvatar;
        this._userId = userId;


    }
}