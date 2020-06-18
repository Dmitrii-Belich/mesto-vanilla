export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("popup_display_opened");
  }
  close() {
    this._popupElement.classList.remove("popup_display_opened");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".popup__exit-button");
    this._overlay = this._popupElement.querySelector(".popup__overlay");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._overlay.addEventListener("click", () => {
      this.close();
    });
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
