let formEditElement = document.querySelector('.popup_button_edit').querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeEditButton = document.querySelector('.popup_button_edit').querySelector('.popup__exit-button');

function formEditOpen () {
  let name = document.querySelector('.profile__name');
  let subtitle = document.querySelector('.profile__subtitle'); 
  let nameInput = document.querySelector('.popup_input__el_name');
  let jobInput = document.querySelector('.popup_input__el_subtitle');
  nameInput.value = name.textContent;
  jobInput.value = subtitle.textContent;
  let open = document.querySelector('.popup_button_edit');
  open.classList.add ('popup_display_opened');
}

function formEditClose () {
  let close = document.querySelector('.popup_button_edit');
  close.classList.remove ('popup_display_opened');
}

function formEditSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup_input__el_name').value;
    let jobInput = document.querySelector('.popup_input__el_subtitle').value;
    console.log(nameInput, jobInput);
    let name = document.querySelector('.profile__name');
    let subtitle = document.querySelector('.profile__subtitle');
    name.textContent = nameInput;
    subtitle.textContent = jobInput;
    name.className = 'profile__name';
    if (name.textContent.length > 25) {
      name.classList.add('profile__name_size_xs');
    }
    else if (name.textContent.length > 20) {
      name.classList.add('profile__name_size_s');
    } else {
      name.classList.add('profile__name_size_m');
    }
    formEditClose();
}


formEditElement.addEventListener('submit', formEditSubmitHandler);
editButton.addEventListener('click', formEditOpen);
closeEditButton.addEventListener('click', formEditClose);

