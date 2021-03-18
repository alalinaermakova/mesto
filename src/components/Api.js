export default class Api {
    contructor({adress, token, groupId}) {
        this._adress = adress;
        this._token = token;
        this._groupId = groupId;
    }

    getCardElement(){
        return fetch(`${this._adress}/messages`, {
            headers: {
                autorization: this._token
            }
        })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }

                return Promise.reject(`Ошибка ${response}`)
            })
    }

    addCardElement(data) {
        return fetch(`${this._adress}/messages`, {
            method: 'POST',
            headers: {
                autorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            }),
        
        })
            .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
    }

    deleteCardElement(){
        return fetch(`${this.url}/cards/${cardid}`, {
            method: 'DELETE',
            headers: {
                autorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
    }
}