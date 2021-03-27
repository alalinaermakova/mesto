
export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._token = config.headers.authorization;
    }

    _getResponseData(res){
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    getCards(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    updateUserInfo(name, description) {
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: description
              })
            })
            .then(res => {
                return this._getResponseData(res)
            })
    }

    setNewAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
              })
            })
            .then(res => {
                return this._getResponseData(res)
            })
    }

    addNewPost(title, image){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                link: image
            })
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    deleteYourCard(cardId){
        return fetch (`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    setLike(cardId){
        return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._getResponseData(res)
        })

    }

    removeLike(cardId){
        return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }



}