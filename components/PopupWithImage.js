import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(link, name) {
    super.open();
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupTitle = this._popupElement.querySelector(".popup__image-title");
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
  }
  close() {
    super.close();
    this._popupImage.src = "";
    this._popupTitle.textContent = "";
  }
}
