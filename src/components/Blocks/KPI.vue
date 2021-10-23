<template>
    <div class="kpi-container">
      <div class="wrapper">
        <div class="question-counter">
          <svg class="question-counter-svg" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle class="question-counter-bg" cx="50%" cy="50%" r="10" fill="#EEEDF3"></circle>
            <circle class="question-counter-spinner" cx="50%" cy="50%" r="5" fill="transparent" stroke="#9677F1" stroke-width="10" :stroke-dasharray="spinCounter" transform-origin="center" transform="rotate(270)"></circle>
            <circle class="question-counter-cover" cx="50%" cy="50%" r="9" fill="#FFFFFF"></circle>
          </svg>
          <span class="question-counter-text">
                <span class="question-counter-current">{{ currentQuestion }}</span>/<span class="question-counter-total">{{ totalQuestions }}</span>
            </span>
        </div>
        <div class="time-counter">
          <svg class="time-counter-svg" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle class="time-counter-bg" cx="50%" cy="50%" r="10" fill="#6D7188"></circle>
            <circle class="time-counter-spinner" cx="50%" cy="50%" r="5" fill="transparent" stroke="#EEEDF3" stroke-width="10" stroke-dasharray="0 31.4" transform-origin="center" transform="rotate(270)"></circle>
            <circle class="time-counter-cover" cx="50%" cy="50%" r="9" fill="#FFFFFF"></circle>
          </svg>
          <span class="time-counter-text">
                <span class="time-counter-hours">01</span>:<span class="time-counter-minutes">30</span>:<span class="time-counter-seconds">00</span>
            </span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'KPI',
      props: {
        time: Array,
        totalQuestions: Number,
        currentQuestion: Number
      },
      data: function() {
        return {
          questionCounter: ''
        }
      },
      computed: {
        spinCounter: function () {
          let i = +this.currentQuestion / (+this.totalQuestions / 100);
          console.log(i);
          let k = i * 31.4 / 100;
          console.log(k);
          return `${k} 31.4`;
        }
      },
      methods: {
        doStart: function () {
          let questionDefaultOptions = {
            questionSet: {
              current: +this.currentQuestion,
              total: +this.totalQuestions
            },
            nodes: {
              spinnerNode: document.querySelector(".question-counter-spinner"),
              currentNode: document.querySelector(".question-counter-current"),
              totalNode: document.querySelector(".question-counter-total")
            }
          }
          let timeDefaultOptions = {
            timeSet: {
              current: [0, 0, 0],
              end: [+this.time[0], +this.time[1], +this.time[2]]
            },
            nodes: {
              spinnerNode: document.querySelector(".time-counter-spinner"),
              hoursNode: document.querySelector(".time-counter-hours"),
              minutesNode: document.querySelector(".time-counter-minutes"),
              secondsNode: document.querySelector(".time-counter-seconds")
            },
            frameRate: 60
          }

          class QuestionCounter {
            constructor(options = questionDefaultOptions) {
              this.options = options;
              this.questionCurrent = +options.questionSet.current;
              this.questionTotal = +options.questionSet.total;
              this.updateCounter();
            }

            updateCounter() {
              this.spin(this.questionCurrent / (this.questionTotal / 100));
              this.write(this.questionCurrent);
            }

            spin(percent = this.percent) {
              this.options.nodes.spinnerNode.attributes["stroke-dasharray"].value = `${percent * 31.4 / 100} 31.4`;
            }

            write(questionCurrent) {
              this.options.nodes.currentNode.textContent = questionCurrent;
              this.options.nodes.totalNode.textContent = this.questionTotal;
            }
          }

          class TimeCounter {
            constructor(options = timeDefaultOptions) {
              this.options = options;
              this.timeCurrent = this.toMs(options.timeSet.current);
              this.timeEnd = this.toMs(options.timeSet.end);
              this.spin(this.timeCurrent / (this.timeEnd / 100));
              this.write(this.timeEnd - this.timeCurrent);
            }

            toMs(timeSetter) {
              let timeMs = timeSetter[0] * 1000 * 60 * 60 + timeSetter[1] * 1000 * 60 + timeSetter[2] * 1000;
              return timeMs;
            }

            toTimeSetter(timeMs) {
              let timeSetter = [0, 0, 0];
              timeSetter[0] = Math.floor(timeMs / 1000 / 60 / 60 % 24);
              timeSetter[1] = Math.floor(timeMs / 1000 / 60 % 60);
              timeSetter[2] = Math.floor(timeMs / 1000 % 60);
              return timeSetter;
            }

            startCount() {
              this.countInterval = setInterval(() => {
                if(this.timeCurrent < this.timeEnd) {
                  this.spin(this.timeCurrent / (this.timeEnd / 100));
                  this.write(this.timeEnd - this.timeCurrent);
                  this.timeCurrent += 1000 / this.options.frameRate;
                } else {
                  this.timeCurrent = this.timeEnd;
                  this.stopCount();
                }
              }, 1000 / this.options.frameRate);
            }

            stopCount() {
              clearInterval(this.countInterval);
              this.spin(this.timeCurrent / (this.timeEnd / 100));
              this.write(this.timeEnd - this.timeCurrent);
            }

            spin(percent = this.percent) {
              this.options.nodes.spinnerNode.attributes["stroke-dasharray"].value = `${percent * 31.4 / 100} 31.4`;
            }

            write(timeCurrent) {
              let timeSetter = this.toTimeSetter(timeCurrent);
              this.options.nodes.hoursNode.textContent = `${Math.floor(timeSetter[0] / 10) % 10}${timeSetter[0] % 10}`;
              this.options.nodes.minutesNode.textContent = `${Math.floor(timeSetter[1] / 10) % 6}${timeSetter[1] % 10}`;
              this.options.nodes.secondsNode.textContent = `${Math.floor(timeSetter[2] / 10) % 6}${timeSetter[2] % 10}`;
            }
          }

          this.questionCounter = new QuestionCounter();
          this.questionCounter.updateCounter()
          let timeCounter = new TimeCounter();
          timeCounter.startCount()
        }
      },
      mounted() {
        this.doStart();
      }
    }
</script>


<style>
  .question-counter, .time-counter {
    position: relative;
    width: 110px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .time-counter {
    margin-top: 30px;
  }

  .question-counter-svg, .time-counter-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .question-counter-text {
    font: normal normal 600 18px/25px Source Sans Pro;
    letter-spacing: 0px;
    color: #C0BFD3;
    z-index: 2;
  }

  .question-counter-current {
    font: normal normal bold 32px/39px Montserrat;
    letter-spacing: 0px;
    color: #3B405C;
    z-index: 2;
  }

  .time-counter-text {
    font: normal normal 600 18px/22px Montserrat;
    color: #6D7188;
    letter-spacing: 0px;
    z-index: 2;
  }
</style>