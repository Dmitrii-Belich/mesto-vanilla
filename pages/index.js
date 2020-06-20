import "../pages/index.css";
import {
  addButton,
  editButton,
  cardSection,
  addValidator,
  editValidator,
  editPopupOpen,
  addPopupOpen,
} from "../utils/constants.js";

cardSection.renderItems();
editValidator.enableValidation();
addValidator.enableValidation();
editButton.addEventListener("click", editPopupOpen);
addButton.addEventListener("click", addPopupOpen);
