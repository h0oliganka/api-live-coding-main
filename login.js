import { loginUser, registerUser } from "./api.js";
import { fetchAndRenderCommentsTwo, initEventListeners } from "./script.js";
import { renderComments, } from "./renderFunction.js";

export function renderLoginComponent({ appEl, setToken }) {
  let isLoginMode = true;
  const renderForm = () => {
    const appHtml = `
    <div class="container">
      <div class="login-form">
            <div id= "add-form"  class="add-form">
            <h3 class="login-form-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
              ${isLoginMode ? '' : `<input
              type="text"
              id="name-input"
              class="login-form-name"
              placeholder="Имя"
            />
            <br>`}
            <input
                type="text"
                id="login-input"
                class="login-form-login"
                placeholder="Логин"
              />
              <br>
              <input 
              type="password"
              id="password-input" 
              class="login-form-password" 
              placeholder="Введите пароль" 
              />
              <div class="add-form-row login-form-enter">
                <button id="login-button" class="add-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>&nbsp;
                <button id="toggle-button" class="add-form-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>&nbsp;
                </div>
            </div>
            </div>
           </div>
           `
    appEl.innerHTML = appHtml;
    document.getElementById('login-button').addEventListener('click', () => {
      if(isLoginMode) {
      const login = document.getElementById('login-input').value;
      const password = document.getElementById('password-input').value;
      if (!login) {
        alert("Введите логин")
        return;
      }
      if (!password) {
        alert("Введите пароль")
        return;
      }
      loginUser({
        login: login,
        password: password,
      }).then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        renderComments(app, initEventListeners, comments);
        fetchAndRenderCommentsTwo();
      })
      } else {
      const name = document.getElementById('name-input').value;
      const login = document.getElementById('login-input').value;
      const password = document.getElementById('password-input').value;
      
      if (!name) {
        alert("Введите имя")
        return;
      }

      if (!login) {
        alert("Введите логин")
        return;
      }

      if (!password) {
        alert("Введите пароль")
        return;
      }

      registerUser({
        name: name,
        login: login,
        password: password,
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        renderComments();
        fetchAndRenderCommentsTwo();
      })
      }
      
    })
    document.getElementById("toggle-button").addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      renderForm();
    })
  };

  renderForm();
}