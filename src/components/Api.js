
export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._token = config.headers.authorization;
    }

    getInfo({updInfo}){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка ${res.status}`)
            }
        })
        .then((data) => {
            updInfo(data)
        })
        .catch((err) => {
            console.log(err);
          })
    }

    getCards({onSuccess}){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
            .then((cards) => {
                onSuccess(cards)
            })
            .catch((err) => {
                console.log(err);
              })
    }

    updateUserInfo(name, description, {setInfo}) {
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
                if(res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
            .then((data) => {
                setInfo(data)
            })
            .catch((err) => {
                console.log(err);
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
                if(res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка ${res.status}`)
                }
            })
            .catch((err) => {
                console.log(err);
              })
    }

    addNewPost(title, image, {onSuccess}){
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
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка ${res.status}`)
            }
        })
        .then((data) => {
            onSuccess(data)
        })
        .catch((err) => {
            console.log(err);
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
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка ${res.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
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
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка ${res.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
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
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка ${res.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
          })
    }



}