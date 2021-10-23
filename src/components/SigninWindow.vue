<template>
    <div class="signin col-4 offset-1">
      <div class="signin-top">
        <div class="signin-head">
            <h2>Вход</h2>
            <div class="social">
              <img src="../assets/icons/FB.svg" alt="FB">
              <img src="../assets/icons/VK.svg" alt="VK">
            </div>
        </div>
        <form @submit.prevent="">
            <div class="input-text">
                <label for="email">E-Mail</label>
                <input type="text" v-model="email" required>
            </div>
            <div class="input-text">
                <label for="password">Пароль</label>
                <input type="password" v-model="password" id="password" required>
                <img src="../assets/icons/Visibility.svg" alt="" @click="changeVisibility">
            </div>
            <div class="form_checkbox">
                <input type="checkbox" v-model="remember" id="remember">
                <label for="remember">Запомнить меня</label>
            </div>
          <div class="error-msg" v-if="error">
            <span class="error">
              {{ error }}
            </span>
          </div>
        </form>
    </div>
      <div class="signin-bottom">
          <Button isLink="false" @action="sendRequest" color="btn-b" textContent="Войти" />
          <a href="#">Забыли пароль?</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'SigninWindow',
        data: function () {
            return {
                email: '',
                password: '',
                remember: false,
                error: ''
            }
        },
        components: {
          Button: () => import('@/components/Buttons/Button.vue')
        },
        methods: {
            sendRequest: function() {
              let myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
              let urlencoded = new URLSearchParams();
              urlencoded.append("password", this.password);
              urlencoded.append("username", this.email.toLowerCase());
              let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
              };
              fetch("http://95.214.62.187/auth/token/create/", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                    let responseData = JSON.parse(result),
                        errors = responseData.errors;
                    if(errors) {
                      this.error = errors[0].detail;
                      if(this.error == 'Unable to login with provided credentials.') {
                        this.error = 'Введен неверный логин или пароль. Повторите попытку.'
                      }
                      return;
                    }
                    let authToken = responseData.data.attributes.auth_token,
                        date = new Date();

                    if(localStorage.getItem('first_name') != null && localStorage.getItem('last_name') != null) {
                      this.updateProfile(authToken);
                      localStorage.removeItem('first_name');
                      localStorage.removeItem('last_name');
                    }

                    date.setDate(date.getDate() + 365);
                    if(this.remember) {
                      document.cookie = `token=${authToken};expires=${date}`;
                    } else {
                      document.cookie = `token=${authToken}`;
                    }
                    this.$router.push({ name: 'Home' });

                  })
                  .catch(error => console.log('error', error));
            },
            updateProfile: function(token) {
              let myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
              myHeaders.append("Authorization", `Token ${token}`);

              let urlencoded = new URLSearchParams();
              urlencoded.append("first_name", localStorage.getItem('first_name'));
              urlencoded.append("last_name", localStorage.getItem('last_name'));

              let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
              };

              fetch("http://95.214.62.187/api/v1/main/users/info", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
            },
            changeVisibility: function () {
              let visibilityState = document.querySelector("#password");
              if(visibilityState.type == "password") {
                visibilityState.type = "text"
              } else {
                visibilityState.type = "password"
              }
            }
        }
    }
</script>

<style scoped>
    .signin {
      padding: 0;
      font-family: "Montserrat", sans-serif;
      height: 461px;
      background: #fff;
      border-radius: 30px 30px 0 0;
      -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.05);
      -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.05);
      box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
    }

    .signin-top {
      display: flex;
      flex-flow: column nowrap;
    }

    .signin-head {
      margin-top: 15px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    .signin-head h2 {
      font-size: 32px;
      font-weight: 600;
      color: #3B405C;
    }

    .signin-top, .signin-bottom {
      padding: 30px;
    }

    .signin-bottom {
      background: #F7F7F7;
      height: 114px;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      border-radius: 0 0 30px 30px;
    }

    .signin-bottom a {
      width: 140px;
      text-align: center;
      color: #C0BFD3;
      font-family: "Source Sans Pro", sans-serif;
      font-weight: 700;
      font-size: 16px;
      margin-left: 30px;
    }

    .signin form {
      margin-top: 15px;
    }
    .input-text {
      margin-top: 30px;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      position: relative;
    }

    .input-text img {
      z-index: 10;
      position: absolute;
      bottom: 10px;
      right: 0;
    }

    .input-text label {
      font-size: 16px;
      color: #C0BFD3;
      font-weight: 600;
      font-family: "Montserrat", sans-serif;
    }

    .input-text input {
      background: none;
      outline: none;
      border: none;
      border-bottom: 2px solid #EEEDF3;
      font-family: "Source Sans Pro", sans-serif;
      color: #6D7188;
      font-size: 18px;
      transition: 0.25s ease-in-out;
    }
    
    .input-text input:focus {
      background: none;
      outline: none;
      border: none;
      border-bottom: 2px solid #9677F1;
    }

    .new-account {
      font-size: 16px;
      font-family: "Source Sans Pro", sans-serif;
    }

    .new-account span {
      margin-right: 8px;
      color: #C0BFD3;
    }

    .new-account {
      color: #9677F1;
    }

    .social {
      align-self: center;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
    }

    .social img:first-child {
      margin-right: 30px;
    }

    .form_checkbox {
      margin-top: 30px;
    }
    .form_checkbox input[type=checkbox] {
      display: none;
    }
    .form_checkbox label {
      display: inline-block;
      cursor: pointer;
      position: relative;
      padding-left: 28px;
      margin-right: 0;
      line-height: 18px;
      user-select: none;
      font-size: 16px;
      font-family: "Source Sans Pro", sans-serif;
      color: #C0BFD3;
    }
    .form_checkbox label:before {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      position: absolute;
      left: 0;
      bottom: 2px;
      border: 2px solid #EEEDF3;
      border-radius: 7px;
    }

    /* Checked */
    .form_checkbox input[type=checkbox]:checked + label:before {
      background: #9677F1;
    }

    .error {
      font-family: "Source Sans Pro", sans-serif;
      color: #EF3986;
      font-size: 16px;
    }

    .error-msg {
      padding: 30px 0 0;
    }
</style>