import "../pages/index.css";
import {
  addButton,
  addPopup,
  editPopup,
  editButton,
  cardSection,
  addValidator,
  editValidator,
  imgPopup
} from "../utils/constants.js";

imgPopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
cardSection.renderItems();
editValidator.enableValidation();
addValidator.enableValidation();
editButton.addEventListener("click", () => editPopup.open());
addButton.addEventListener("click", () => addPopup.open());
