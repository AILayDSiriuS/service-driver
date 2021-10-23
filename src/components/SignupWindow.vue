<template>
    <div class="signup col-5 offset-1">
      <div class="signup-top">
        <div class="signup-head">
          <h2>Регистрация</h2>
          <div class="social">
            <img src="../assets/icons/FB.svg" alt="FB">
            <img src="../assets/icons/VK.svg" alt="VK">
          </div>
        </div>
        <form @submit.prevent="">
            <div class="input-text">
              <label for="firstname">Имя</label>
              <input type="text" v-model="firstname" required>
            </div>
            <div class="input-text">
              <label for="lastname">Фамилия</label>
              <input type="text" v-model="lastname" required>
            </div>
            <div class="input-text">
              <label for="email">Электронная почта</label>
              <input type="text" v-model="email" required>
            </div>
            <div class="input-text">
              <label for="password">Пароль</label>
              <input type="password" v-model="password" required>
            </div>
            <div class="input-text">
              <label for="confirmpassword">Повторите пароль</label>
              <input type="password" v-model="confirmpassword" required>
            </div>
            <div class="form_checkbox">
              <input type="checkbox" v-model="license" id="license" required>
              <label for="license">Принимаю условия <router-link to="/license">лицензионного соглашения</router-link></label>
            </div>
            <div class="error-msg" v-if="error">
              <span class="error">
                {{ error }}
              </span>
            </div>
        </form>
      </div>
      <div class="signup-bottom">
        <div class="signup-footer">
          <Button class="btn-max" isLink="false" @action="sendRequest" textContent="Продолжить" color="btn-b" />
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'SignupWindow',
        data: function () {
            return {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmpassword: '',
                license: '',
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
              urlencoded.append("email", this.email);
              urlencoded.append("username", this.email);
              urlencoded.append("password", this.password);
              let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
              };
              fetch("http://95.214.62.187/auth/users", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                    let responseData = JSON.parse(result),
                        errors = responseData.errors;
                    if(errors) {
                      this.error = errors[0].detail;
                      return;
                    }
                    localStorage.setItem('first_name', this.firstname);
                    localStorage.setItem('last_name', this.lastname);
                    this.$router.push({ name: 'Signin', params: { needConfirm: true } });
                  })
                  .catch(error => console.log('error', error));
            }
        }
    }
</script>

<style scoped>
    .signup {
      font-family: "Montserrat", sans-serif;
      padding: 0;
      background: #fff;
      height: 715px;
      border-radius: 30px;
      -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.05);
      -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.05);
      box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
    }

    .signup-bottom {
      background: #F7F7F7;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: 30px;
      height: 114px;
      border-radius: 0 0 30px 30px;
    }

    .btn-max {
      width: 100%;
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

    .signup-footer {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    .signup-top {
      padding: 30px;
    }

    .signup-head {
        margin-top: 15px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .signup-head h2 {
        font-size: 32px;
        font-weight: 600;
        color: #3B405C;
    }

    .input-text {
        margin-top: 30px;
        width: 410px;
        display: flex;
        flex-flow: column nowrap;
    }

    .input-checkbox {
      margin-top: 30px;
      width: 365px;
      display: flex;
      flex-flow: row nowrap;
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

    .to-account {
        font-size: 16px;
        font-family: "Source Sans Pro", sans-serif;
    }

    .to-account span {
        margin-right: 8px;
        color: #C0BFD3;
    }

    .to-account {
        color: #9677F1;
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

    .form_checkbox a {
      color: #C0BFD3;
      text-decoration: underline;
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
</style>