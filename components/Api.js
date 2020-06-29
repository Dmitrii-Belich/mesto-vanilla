export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
  }
  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
  }
  setLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {method: 'PUT', headers: this._headers})
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {method: 'DELETE', headers: this._headers})
  }
  setUserInfo(object) {
    return fetch(`${this._baseUrl}/users/me`, {method: 'PATCH', headers: this._headers, body: JSON.stringify(object)})
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {method: 'PATCH', headers: this._headers, body: JSON.stringify(link)})
  }
  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {method: 'POST', headers: this._headers, body: JSON.stringify(card)})
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {method: 'DELETE', headers: this._headers})
  }

}

