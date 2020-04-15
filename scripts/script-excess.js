const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_button_add');
const formAddcard = addForm.querySelector('.popup__container');
const closeAddButton = addForm.querySelector('.popup__exit-button');
const title = document.querySelector('.popup__input_el_title');
const cardContainer = document.querySelector('.card__container');
const imgFile = document.querySelector('.popup__input_el_image');
const fileReader = new FileReader();
let likeButtons = document.querySelectorAll('.card__like');
let deleteButton = document.querySelectorAll('.card__delete');
let img = document.querySelectorAll('.card__image');
let cardTitle = document.querySelectorAll('.card__title');

function like() {
    for (let i = 0; i<likeButtons.length; i++) {
      likeButtons[i].addEventListener('click', likeActive);
  }
}

function formAddOpen () {
  addForm.classList.add ('popup_display_opened');
}
  
function formAddClose () {
  addForm.classList.remove ('popup_display_opened');
}
  
function AddCard (imgFile) {
  let newTitle ='';
  for (let i = 0; i < title.value.length; i++) {
    if (i < 13) {
      newTitle+=title.value[i];
    } else {
      newTitle+='...';
      if (i === 13) {
        break;
      }
    }
  }
  cardContainer.insertAdjacentHTML ('beforeend', `
    <div class="card">
      <img src="${imgFile.target.result}" alt="Изображение карточки" class="card__image">
      <h2 class="card__title">${newTitle}</h2>
      <button class="card__like card__like_mode_unactive"></button>
      <button class="card__delete card__delete_display_hide"></button>
    </div>`);
  formAddElement.reset();
  likeButtons = document.querySelectorAll('.card__like');
  deleteButton = document.querySelectorAll('.card__delete');
  img = document.querySelectorAll('.card__image');
  cardTitle = document.querySelectorAll('.card__title');
  delButton();
  del();
  like();
}
  
function formAddSubmitHandler (event) {
  event.preventDefault();
  fileReader.readAsDataURL(imgFile.files[0]);
  fileReader.addEventListener("load", AddCard);
}
  
function likeActive(event) {
  event.toElement.classList.toggle ("card__like_mode_unactive");
  event.toElement.classList.toggle ("card__like_mode_active");
}
  
function destroyEl (event) {
  event.toElement.parentElement.remove();
}
  
function del () {
  for (let i =0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', destroyEl);
  }
}
  
function delButtonHide(event) {
  if (event.isTrusted === true) {
    event.fromElement.parentElement.querySelector('.card__delete').className = 'card__delete';
    event.fromElement.parentElement.querySelector('.card__delete').classList.add ('card__delete_display_hide');
  } 
}
  
function delButtonShow(event) {
  if (event.isTrusted === true) {
    event.toElement.parentElement.querySelector('.card__delete').className = 'card__delete';
    event.toElement.parentElement.querySelector('.card__delete').classList.add ('card__delete_display_show');    
  } 
}
  
function delButton () { 
  for (let i =0; i < img.length; i++) {
    img[i].addEventListener('mouseover', delButtonShow);
    img[i].addEventListener('mouseout', delButtonHide);
  }
  for (let i =0; i < cardTitle.length; i++) {
    cardTitle[i].addEventListener('mouseover', delButtonShow);
    cardTitle[i].addEventListener('mouseout', delButtonHide);
  }
  for (let i =0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('mouseover', delButtonShow);
    likeButtons[i].addEventListener('mouseout', delButtonHide);
  }
  for (let i =0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('mouseover', delButtonShow);
    deleteButton[i].addEventListener('mouseout', delButtonHide);
  }
}
  
delButton();
del();
like();
addButton.addEventListener('click', formAddOpen);
formAddcard.addEventListener('submit', formAddSubmitHandler);
closeAddButton.addEventListener('click', formAddClose);