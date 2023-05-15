import { initEventListeners, newDate } from "./script.js";
import { fetchAndRenderCommentsTwo } from "./script.js";
import { postComments } from "./api.js";
import { renderLoginComponent } from "./login.js";

export let token = null;

// рендер функция
export const renderComments = () => {
  const appEl = document.getElementById("app")
  if (!token) {
    const commentsHtml = window.comments.map((comment) => {
      return ` <li class="comment" data-text="${comment.text}" data-name="${comment.name}"
    data-date= "${comment.date}" data-counter="${comment.likesCounter}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div  class="comment-text" >
             ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span  class="likes-counter" data-counter="${comment.likesCounter}">${comment.likesCounter}</span>
              <button class="like-button" ></button>
            </div>
          </div>
        </li>`;
    }).join('');

    const appHtml = `
    <div class="container">
    <ul id="comments" class="comments">${commentsHtml} </ul>
    <div> Что бы добавить комментарий, <a id='authorization-link' href="#">авторизуйтесь</a></div>`

    appEl.innerHTML = appHtml;

    document.getElementById('authorization-link').addEventListener('click', () => {
      renderLoginComponent({
        appEl, setToken: (newToken) => {
          token = newToken
        },
        fetchAndRenderCommentsTwo,
      });
    });
    return;
  }
  const commentsHtml = window.comments.map((comment) => {
    return ` <li class="comment" data-text="${comment.text}" data-name="${comment.name}"
  data-date= "${comment.date}" data-counter="${comment.likesCounter}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div  class="comment-text" >
           ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span  class="likes-counter" data-counter="${comment.likesCounter}">${comment.likesCounter}</span>
            <button class="like-button" ></button>
          </div>
        </div>
      </li>`;
  }).join('');
  const appHtml = `<div class="container">
       <ul id="comments" class="comments">${commentsHtml} </ul>
    <div id= "addFormLoading" class="addFormLoading">
      <div id= "add-form" class="add-form">
        <input
          type="text"
          id="name-input"
          class="add-form-name"
          placeholder="Введите ваше имя"
          
        />
        <textarea
          type="textarea"
          id="comment-input"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
      </div>`

  initEventListeners();

  appEl.innerHTML = appHtml;

  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");

  // проверка ввода
  buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove('error');

    if (nameInputElement.value === '') {
      nameInputElement.classList.add('error');
      return;
    }

    commentInputElement.classList.remove('error');

    if (commentInputElement.value === '') {
      commentInputElement.classList.add('error');
      return;
    }

    // рендер нового коммента
    comments.push({
      name: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      date: newDate(),
      text: commentInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      likesCounter: 0,
    });

    // POST
    const postAndRenderComments = () => {
      return postComments({ nameInputElement, commentInputElement })
        .then(() => {
          return fetchAndRenderCommentsTwo();
        }).catch((error) => {
          if (response.status === 201) {
          }
            if (response.status === 500) {
            alert('Сервер сломался, попробуй позже');
            throw new Error('Сервер сломался, попробуй позже');
          } 
            if (response.status === 400) {
            alert("Имя и комментарий должны быть не короче 3 символов");
          } 
          console.warn(error);
        });
    }
    postAndRenderComments();

    nameInputElement.value = '';
    commentInputElement.value = '';

    renderComments();
    initEventListeners();
  });
}