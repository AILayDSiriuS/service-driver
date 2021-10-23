<template>
    <div class="exam-overlay-wrapper" ref="overlay-wrapper">
        <div class="exam-overlay">
            <div class="content">
                <div class="overlay-header">
                    <h2>Тренировочное тестирование</h2>
                    <img src="@/assets/icons/Close.svg" ref="overlay-close">
                </div>
                <slot></slot>
            </div>
            <div class="overlay-footer">
              <Button isLink="true" :link="`/tests/${test_id}`" textContent="Начать" color="btn-b begin" />
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'ExamOverlay',
        methods: {
            close() {
                this.$emit('close')
            }
        },
        props: {
          test_id: Number
        },
        mounted() {
            let vm = this;
            document.addEventListener('click', function(item) {
                if(item.target === vm.$refs['overlay-wrapper']) {
                    vm.close();
                }
            })
            document.addEventListener('click', function(item) {
                if(item.target === vm.$refs['overlay-close']) {
                    vm.close();
                }
            })
        },
      components: {
        Button: () => import('@/components/Buttons/Button')
      }
    }
</script>


<style>
    .overlay-header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .overlay-content h3 {
      font-size: 22px;
    }

    .overlay-content .tags {
      font-size: 18px;
    }

    .overlay-footer {
        width: 100%;
    }

    .begin {
        width: 100%;
        background: #9677F1;
        height: 54px;

    }
    .exam-overlay-wrapper {
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0, 0.65);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }
    .exam-overlay {
        padding: 45px;
        width: 770px;
        height: 884px;
        position: fixed;
        background: #fff;
        z-index: 100;
        margin: auto;
        top: 0; left: 0; bottom: 0; right: 0;
        -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
        -moz-box-shadow:    0px 0px 30px 0px rgba(0, 0, 0, 0.15);
        box-shadow:         0px 0px 30px 0px rgba(0, 0, 0, 0.15);
        border-radius: 30px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    }

    .exam-overlay .preview {
        background: #EEEDF3;
        margin-top: 45px;
        width: 100%;
        height: 380px;
    }

    .overlay-content {
        margin-top: 30px;
    }

    .overlay-content .tags {
        margin-top: 8px;
    }

    .overlay-content hr {
        margin-top: 16px;
    }

    .overlay-content p {
        margin-top: 24px;
        font-size: 18px;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 400;
        color: #6D7188;
    }
</style>