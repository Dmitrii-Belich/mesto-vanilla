import "../pages/index.css";
import {
  addButton,
  addPopup,
  editPopup,
  editButton,
  cardSection,
  addValidator,
  editValidator,
} from "../utils/constants.js";

cardSection.renderItems();
editValidator.enableValidation();
addValidator.enableValidation();
editButton.addEventListener("click", () => editPopup.open());
addButton.addEventListener("click", () => addPopup.open());
