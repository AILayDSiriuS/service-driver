<template>
  <div id="exam-page">
    <Header/>
    <Aside active="Главная"/>
    <Overlay v-if="isOverlayVisible" @close="closeOverlay" @doFinish="doFinishTest"/>
    <div class="container">
      <div class="row first">
        <div class="col-10" v-if="!finishTest">
          <div class="exam-frame">
            <div class="exam-align">
              <div class="exam-content">
                <div class="exam-header">
                  <h2>Вопрос {{questionNumber}}</h2>
                </div>
                <div class="question-title">
                  <h3>{{currentQuestion.text}}</h3>
                </div>
                <div class="exam-body">
                  <div>
                    <div class="inputItem form_radio" @click="chooseAnswer(answer)" v-for="answer in currentQuestion.answers" :key="answer">
                      <input type="radio" :value="answer" name="answer" :id="answer"> <label :for="answer">{{answer}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="exam-footer">
                <div class="actions">
                  <span v-if="!isFinalQuestion" @click="skipQuestion">Пропустить</span>
                  <Button isLink="false" @action="showOverlay" textContent="Завершить" color="btn-r" v-if="isFinalQuestion" />
                  <Button isLink="false" @action="pushAnswer" textContent="Ответить" color="btn-b" v-if="!isFinalQuestion" />
                </div>
              </div>
            </div>
          </div>
          </div>

        <div class="col-2" v-if="!finishTest">
          <div class="exam-side-panel">
            <KPI v-bind:time="time" v-bind:totalQuestions.sync="allQuestions.length" v-bind:currentQuestion.sync="Object.keys(answers).length - 2" v-if="kpiReady" />
          </div>
          <div class="exam-side-panel">
            <div class="questions-nav row">
              <div v-for="question in allQuestions.length" :key="question">
                <div class="question-nav-link" @click="switchQuestion(question)">
                  {{ question }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div v-if="finishTest" class="col-12 exam-frame">
        <div class="exam-align">
          <div class="exam-content">
            <div class="exam-header">
              <h2>Тест завершен</h2>
            </div>
            <div class="exam-body">
              <div class="result">
                <h3>Ваш результат</h3>
                <span>{{ Math.round(correctAnswers / allQuestions.length * 100) }}%</span>
              </div>
              <div class="tips">
                <span>Ваши ответы проходят модерацию.</span>
                <span>Окончательный результат вы сможете посмотреть позже в разделе <a href="#">Статистика</a></span>
              </div>
            </div>
          </div>
          <div class="exam-footer">
            <div class="actions">
              <Button isLink="true" link="/" textContent="Продолжить" color="btn-b" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamPage',
  data:
      function () {
        return {
          id: this.$route.params['id'],
          finishTest: false,
          isFinalQuestion: false,
          isOverlayVisible: false,
          questionNumber: 1,
          correctAnswers: 0,
          time: [1, 30, 0],
          allQuestions: {
            type: Array,
            default: ''
          },
          currentQuestion: {
            type: Object,
            default: ''
          },
          answers: {
            type: Array,
            default: ''
          },
          user: {
            type: Object,
            default: ''
          },
          kpiReady: false
        }
      },
  watch: {
    $route(toRoute) {
      this.id = toRoute.params['id']
    }
  },
  beforeMount: async function() {
    if(document.cookie) {
      let cookie = document.cookie,
          token = cookie.replace(/token=/g, '');
      this.getData(token);
      await this.getQuestions(token);
    } else {
      await this.$router.push({ name: 'Signin' });
    }
  },
  methods: {
    getData: function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://95.214.62.187/auth/me/", requestOptions)
        .then(response => response.text())
        .then(result => {
          let profileData = JSON.parse(result);
          this.user = profileData;
        })
        .catch(error => console.log('error', error));
    },
    getQuestions: async function(token) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`http://95.214.62.187/api/v1/exams/questions/${this.id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            this.allQuestions = JSON.parse(result).data.data;
            for(let i = 0; i < this.allQuestions.length; i++) {
              this.allQuestions[i].answers = this.allQuestions[i].answers.split(', ');
            }
            this.currentQuestion = this.allQuestions[0];
            this.kpiReady = true;
          })
          .catch(error => {
            console.log('error', error);
            this.$router.push({ name: 'Home' });
          });
    },
    pushAnswer: function() {
          let inputs = document.querySelectorAll("input[name=answer]")
          let questionLinks = document.querySelectorAll(".question-nav-link");
          for(let i = 0; i < this.currentQuestion.answers.length; i++) {
            if(inputs[i].checked) {
              this.answers[this.questionNumber] = inputs[i].value;
              questionLinks[this.questionNumber - 1].classList.add('question-nav-link-active');
              questionLinks[this.questionNumber - 1].classList.remove('question-nav-link-current');
              this.questionNumber++;
              this.nextQuestion();
              return;
            }
          }
          alert('Выберите вариант ответа или пропустите вопрос!');
    },
    skipQuestion: function () {
      this.questionNumber++;
      this.nextQuestion();
    },
    nextQuestion: function () {
      let questionLinks = document.querySelectorAll(".question-nav-link");
      if(this.questionNumber == this.allQuestions.length) {
        this.currentQuestion = this.allQuestions[this.questionNumber - 1];
        this.isFinalQuestion = true;
      } else {
        this.currentQuestion = this.allQuestions[this.questionNumber - 1];
      }
      questionLinks[this.questionNumber - 1].classList.add('question-nav-link-current');
    },
    showOverlay: function() {
      this.isOverlayVisible = true;
    },
    closeOverlay: function() {
      this.isOverlayVisible = false
    },
    doFinishTest: function() {
      let inputs = document.querySelectorAll("input[name=answer]")
      for(let i = 0; i < this.currentQuestion.answers.length; i++) {
        if(inputs[i].checked) {
          this.answers[this.questionNumber] = inputs[i].value
          this.isOverlayVisible = false;
          this.finishTest = true;
          this.checkAnswers();
          return;
        }
      }
      alert('Выберите вариант ответа или пропустите вопрос!');
    },
    switchQuestion: function(question) {
      let questionLinks = document.querySelectorAll(".question-nav-link");
      questionLinks[this.questionNumber - 1].classList.remove('question-nav-link-current');
      console.log(questionLinks)
      this.questionNumber = question;
      if(this.questionNumber == this.allQuestions.length) {
        this.currentQuestion = this.allQuestions[question - 1];
        this.isFinalQuestion = true;
      } else {
        this.currentQuestion = this.allQuestions[question - 1];
        this.isFinalQuestion = false;
      }
      questionLinks[this.questionNumber - 1].classList.add('question-nav-link-current');
    },
    checkAnswers: function () {
      for(let i = 0; i < this.allQuestions.length; i++) {
        if(this.answers[i + 1] == this.allQuestions[i].correct_answer) {
          this.correctAnswers++;
        }
      }
    },
    chooseAnswer: function (id) {
      let item = document.getElementById(id);
      item.checked = true;
    },
    setFirstQuestionActive: function () {
      let questionLinks = document.querySelectorAll(".question-nav-link");
      console.log(questionLinks)
      questionLinks[this.cu - 1].classList.add('question-nav-link-current');
    }
  },
  components: {
    Header: () => import('@/components/Header.vue'),
    Overlay: () => import('@/components/Overlay/FinishTestAlert.vue'),
    Button: () => import('@/components/Buttons/Button'),
    KPI: () => import('@/components/Blocks/KPI')
  }
}
</script>

<style>
  .exam-frame, .exam-side-panel {
    background: #ffffff;
    border: 2px solid #EEEDF3;
    border-radius: 7px;
    padding: 0;
  }

  .exam-side-panel {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 30px;
  }

  .exam-side-panel:nth-child(2) {
    margin-top: 30px
  }

  .exam-align {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  .push-answer {
    height: 54px;
    width: 170px;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 700;
    border: none;
    background: #9677F1;
  }

  .finish-test {
    height: 54px;
    width: 170px;
  }

  .exam-header {
    height: 54px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 2px solid #EEEDF3;
  }

  .exam-header h2 {
    margin-left: 30px;
    font-family: "Montserrat", sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: #3B405C;
  }

  .question-title {
    padding: 0 30px;
  }

  .question-title h3 {
    margin-top: 45px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #3B405C;
    border-left: 2px solid #9677F1;
    padding-left: 16px;
    line-height: 24px;
  }

  .exam-body {
    padding: 30px;
    margin-top: 30px;
  }

  .exam-body .inputItem {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 104px;
    border-radius: 18px;
    transition: 0.15s ease-in-out;
  }

  .exam-footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    height: 114px;
    padding: 30px;
    background: rgba(0,0,0,0.02);
  }

  .exam-footer .actions span {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #C0BFD3;
    margin-right: 30px;
    cursor: pointer;
  }

  .inputItem input {
    margin-left: 24px;
  }

  input[type="radio"]:checked + label {
    color: #000000 !important;
  }

  .exam-body .inputItem:hover {
    background: rgba(0,0,0, 0.02);
  }

  .exam-body label {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 18px;
    color: #6D7188;
    padding-left: 74px;
    line-height: 25px;
    transition: 0.15s ease-in-out;
  }

  .result {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .result h3 {
    font-size: 16px;
    font-family: "Source Sans Pro", sans-serif;
    color: #C0BFD3;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
  }

  .result span {
    margin: 0;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    color: #3B405C;
    font-size: 46px;
  }

  .tips {
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .tips span {
    font-family: "Source Sans Pro", sans-serif;
    color: #C0BFD3;
    font-size: 16px;
  }

  .questions-nav {
    margin-top: -15px;
  }

  .question-nav-link {
    margin-top: 16px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 2px solid #C0BFD3;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: #C0BFD3;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  div:nth-child(2n) > .question-nav-link, div:nth-child(2n +1) > .question-nav-link {
    margin-left: 8px;
  }

  .question-nav-link-active {
    border-color: #9677F1;
    color: #9677F1;
  }

  .question-nav-link-current {
    border: none;
    background: #9677F1;
    color: #fff;
  }


  .form_radio {
    position: relative;
  }

  .form_radio input[type=radio] {
    display: none;
  }

  .form_radio label:before {
    content: "";
    display: inline-block;
    width: 26px;
    height: 26px;
    position: absolute;
    left: 24px;
    border: 2px solid #EEEDF3;
    background: #fff;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.15s ease-in-out;
  }

  /* Checked */
  .form_radio input[type=radio]:checked + label:before {
    background: #9677F1;

  }
</style>