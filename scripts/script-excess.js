const addButton = document.querySelector('.profile__add-button');
const formAddElement = document.querySelector('.popup_button_add').querySelector('.popup__container');
const closeAddButton = document.querySelector('.popup_button_add').querySelector('.popup__exit-button');

function like() {
  const like = document.querySelectorAll('.element__like');
    for (let i = 0; i<like.length; i++) {
      like[i].addEventListener('click', likeActive);
  }
}

function formAddOpen () {
  const open = document.querySelector('.popup_button_add');
  open.classList.add ('popup_display_opened');
}
  
function formAddClose () {
  const close = document.querySelector('.popup_button_add');
  close.classList.remove ('popup_display_opened');
}
  
function AddCard (file) {
  const title = document.querySelector('.popup__input_el_title');
  const elements = document.querySelector('.elements');
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
  elements.insertAdjacentHTML('beforeend', `<div class="element">
    <img src="${file.target.result}" alt="Изображение карточки" class="element__image">
    <h2 class="element__title">${newTitle}</h2>
    <img src="./images/like.svg" alt="Иконка лайка" class="element__like">
    <img src="./images/close.svg" alt="Иконка закрыть" class="element__delete element__delete_display_hide">
    </div>`);
  formAddElement.reset();
  like();
  del ();
  delButton();
}
  
function formAddSubmitHandler (event) {
  event.preventDefault();
  const file = document.querySelector('.popup__input_el_image');
  const fr = new FileReader();
  fr.readAsDataURL(file.files[0]);
  fr.addEventListener("load", AddCard);
}
  
function likeActive(event) {
  if (event.toElement.src.indexOf('/images/like.svg') !== -1) {
    event.toElement.setAttribute('src', './images/like-active.svg');
  } else {
    event.toElement.setAttribute('src', './images/like.svg');
  }
}
  
function destroyEl (event) {
  event.toElement.parentElement.classList.add ('element_display_none');
}
  
function del () {
  const button = document.querySelectorAll('.element__delete');
  for (let i =0; i < button.length; i++) {
    button[i].addEventListener('click', destroyEl);
  }
}
  
function delButtonHide(event) {
  if (event.isTrusted === true) {
    event.fromElement.parentElement.querySelector('.element__delete').className = 'element__delete';
    event.fromElement.parentElement.querySelector('.element__delete').classList.add ('element__delete_display_hide');
  } 
}
  
function delButtonShow(event) {
  if (event.isTrusted === true) {
    event.toElement.parentElement.querySelector('.element__delete').className = 'element__delete';
    event.toElement.parentElement.querySelector('.element__delete').classList.add ('element__delete_display_show');    
  } 
}
  
function delButton () { 
  const img = document.querySelectorAll('.element__image');
  const title = document.querySelectorAll('.element__title');
  const like = document.querySelectorAll('.element__like');
  const del = document.querySelectorAll('.element__delete');
  for (let i =0; i < img.length; i++) {
    img[i].addEventListener('mouseover', delButtonShow);
    img[i].addEventListener('mouseout', delButtonHide);
  }
  for (let i =0; i < title.length; i++) {
    title[i].addEventListener('mouseover', delButtonShow);
    title[i].addEventListener('mouseout', delButtonHide);
  }
  for (let i =0; i < like.length; i++) {
    like[i].addEventListener('mouseover', delButtonShow);
    like[i].addEventListener('mouseout', delButtonHide);
  }
  for (let i =0; i < del.length; i++) {
    del[i].addEventListener('mouseover', delButtonShow);
    del[i].addEventListener('mouseout', delButtonHide);
  }
}
  
delButton();
del();
like();
addButton.addEventListener('click', formAddOpen);
formAddElement.addEventListener('submit', formAddSubmitHandler);
closeAddButton.addEventListener('click', formAddClose);