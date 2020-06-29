import "../pages/index.css";
import {
  addButton,
  editButton,
  initialRender,
  addValidator,
  editValidator,
  editPopupOpen,
  addPopupOpen,
} from "../utils/constants.js";


editValidator.enableValidation();
addValidator.enableValidation();
editButton.addEventListener("click", editPopupOpen);
addButton.addEventListener("click", addPopupOpen);
