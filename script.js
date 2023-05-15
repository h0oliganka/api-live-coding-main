import { renderComments } from "./renderFunction.js";
import { getCommentsLoading, getComments, postComments, host } from "./api.js";

// // GET
// export const fetchAndRenderComment = () => {
//   commentsElement.parentNode.replaceChild(commentsLoading);
//   return getCommentsLoading();
// }

// 2 get
export const fetchAndRenderCommentsTwo = () => {
  return getComments();
}

// fetchAndRenderComment();
fetchAndRenderCommentsTwo();

// кнопка лайка и счетчик
export const initEventListeners = () => {
  const likeElements = document.querySelectorAll('.like-button');
  for (const likeElement of likeElements) {
    likeElement.addEventListener('click', (event) => {
      likeElement.classList.toggle('-active-like');
      const index = [...document.querySelectorAll('.like-button')].indexOf(likeElement);
      const count = document.querySelectorAll('.likes-counter')[index];
      likeElement.classList.contains('-active-like') ? count.innerHTML++ : count.innerHTML--;
      event.stopPropagation();
    })
  }

  // ответ на комментарий
  const commentElementsAnswer = document.querySelectorAll('.comment');
  for (const commentAnswer of commentElementsAnswer) {
    commentAnswer.addEventListener('click', () => {
      const text = commentAnswer.dataset.text;
      const nameComment = commentAnswer.dataset.name;
      const commentInputElement = document.getElementById("comment-input");
      commentInputElement.value = ">" + text + "\n" + nameComment;
    });
  }
}

// массив объектов
window.comments = [];

// дата и время комментария
export function newDate(comment) {
  let date = new Date(comment);
  let monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let myMinute = String(date.getMinutes()).length < 2 ? '0' + date.getMinutes() : date.getMinutes();
  let myHours = String(date.getHours()).length < 2 ? '0' + date.getHours() : date.getHours();
  let myDay = String(date.getDate()).length < 2 ? '0' + date.getDate() : date.getDate();
  let myMonth = monthArray[+date.getMonth()];
  let myYear = String(date.getFullYear()).slice(2);
  let str = myDay + '.' + myMonth + '.' + myYear + ' ' + myHours + ':' + myMinute;
  return str;
}
renderComments();
initEventListeners();