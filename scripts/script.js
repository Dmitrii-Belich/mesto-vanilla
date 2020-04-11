let formElement = document.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__exit-button')

function formSubmitHandler (evt) {
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

    let close = document.querySelector('.popup');
    close.classList.remove ('popup_display_opened');
}

function formOpen (){
  let name = document.querySelector('.profile__name');
  let subtitle = document.querySelector('.profile__subtitle'); 
  let nameInput = document.querySelector('.popup_input__el_name');
  let jobInput = document.querySelector('.popup_input__el_subtitle');
  console.log(name.textContent);
  nameInput.value = name.textContent;
  jobInput.value = subtitle.textContent;
  let open = document.querySelector('.popup');
  open.classList.add ('popup_display_opened');
}

function formClose () {
  let close = document.querySelector('.popup');
  close.classList.remove ('popup_display_opened');
}
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', formOpen);
closeButton.addEventListener('click', formClose);
