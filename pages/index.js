import "../pages/index.css";
import {
  addButton,
  editButton,
  addValidator,
  editValidator,
  editPopupOpen,
  addPopupOpen,
  avatarValidator,
  avatarButton,
  avatarPopupOpen
} from "../utils/constants.js";


editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();
editButton.addEventListener("click", editPopupOpen);
addButton.addEventListener("click", addPopupOpen);
avatarButton.addEventListener("click", avatarPopupOpen);
