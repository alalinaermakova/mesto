export default class UserInfo {
    constructor (nameField, descriptionField){
        this._nameElement = document.querySelector(nameField);
        this._descriptionElement = document.querySelector(descriptionField);
    }

    getUserInfo() {
        const name = this._nameElement.textContent;
        const description = this._descriptionElement.textContent;
        return {
            name: name,
            description: description
        };
    }

    setUserInfo(newName, newDescription){
        this._nameElement.textContent = newName;
        this._descriptionElement.textContent = newDescription;
    }
}