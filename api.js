import { newDate } from "./script.js";
import { renderComments } from "./renderFunction.js";
import { initEventListeners } from "./script.js";

const commentsElement = document.getElementById("comments");
export let host = "https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments";

// GET
export function getCommentsLoading(token) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    }
  }).then((response) => {
    if (response.status === 401) {
      // token = prompt("Введите верный пароль");
      // getCommentsLoading();
      throw new Error("Нет авторизации");
    }
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {

      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: newDate(comment),
          text: comment.text,
          likesCounter: 0,

        }

      })
      window.comments = appComments;
      renderComments();
      initEventListeners();

    });

  }).then(() => {
    return commentsLoading.parentNode.replaceChild(commentsElement, commentsLoading);

  }).catch((error) => {

    alert('Кажется, у вас сломался интернет, попробуйте позже');
    console.warn(error);
  });
}

// 2 GET
export function getComments(token) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: newDate(comment.date),
          text: comment.text,
          likesCounter: 0,
        }
      })
      comments = appComments;
      renderComments();
      initEventListeners();
      console.log(window.comments);
    });

  })
}

// POST
export function postComments({ nameInputElement, commentInputElement, token }) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      text: commentInputElement.value,
      date: newDate(),
      likesCounter: 0,
      forceError: true,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    }
      if (response.status === 500) {
      alert('Сервер сломался, попробуй позже');
      throw new Error('Сервер сломался, попробуй позже');
    } 
      if (response.status === 400) {
      alert("Имя и комментарий должны быть не короче 3 символов");
    }
  })
}

//вход
export function loginUser({ login, password, token }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      token,
    })
  }).then((response) => {
    if (response.status === 400) {
      alert('Неверный логин или пароль')
      throw new Error('Неверный логин или пароль');
    }
    return response.json();
  })
}

//регистрация
export function registerUser({ name, login, password, token }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
      login: name,
      login,
      password,
      token,
    })
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует');
    }
    return response.json();
  })
}
