import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler, specialOpen }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._specialOpen = specialOpen;
  }
  open() {
    super.open();
    this._inputValues = {};
    this._inputs = Array.from(this._popupElement.querySelectorAll("input"));
    this._specialOpen();
  }
  close() {
    super.close();
    setTimeout(() => {
      this._form.reset();
    }, 200);
  }
  _getInputValues() {
    this._inputs.forEach((item) => {
      this._inputValues[item.getAttribute("name")] = item.value;
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupElement.querySelector("form");
    this._form.addEventListener("submit", (evt) => {
      this._formSubmitHandler(evt);
    });
  }
}
