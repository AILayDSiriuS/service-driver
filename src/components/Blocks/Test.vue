<template>
    <div class="test col-3" @click="showOverlay">
      <transition name="fade">
        <TrainingOverlay v-if="isOverlayVisible" :test_id="data.id" @close="closeOverlay">
            <div class="overlay-body">
                <div class="preview" :style="image">
                </div>
                <div class="overlay-content">
                    <h3>{{ data.name }}</h3>
                    <div class="tags">
                      <span>5 QUESTIONS</span>
                      <span>•</span>
                      <span>15 MINUTES</span>
                    </div>
                    <hr>
                    <p>In nec nunc quis sem hendrerit euismod. Curabitur purus turpis, sollicitudin porttitor tempus interdum, molestie vitae sapien. Proin dictum, ex in molestie blandit, ligula magna facilisis magna, et ullamcorper augue est ut erat. Nullam tempor dolor et velit fringilla, eget luctus diam elementum.</p>
                </div>
            </div>
        </TrainingOverlay>
      </transition>
        <div class="preview" :style="image">
            <img class="test-button" src="../../assets/icons/Training Test.svg" alt="">
        </div>
        <div class="text-content">
            <h3>{{ data.name }}</h3>
            <div class="tags">
              <span>5 QUESTIONS</span>
              <span>•</span>
              <span>15 MINUTES</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data:
            function () {
                return {
                    isOverlayVisible: false
                }
        },
        computed: {
            image() {
              return 'background: url(' + 'https://source.unsplash.com/1600x900/?mountains' + '); background-size: cover;';
            }
        },
        props: {
            data: {
                type: Object,
                default() {
                return {}
                }
            }
        },
        components: {
            TrainingOverlay: () => import('@/components/Overlay/Training.vue')
        },
        methods: {
            showOverlay() {
                this.isOverlayVisible = true;
            },
            closeOverlay() {
                this.isOverlayVisible = false
            }
        }
    }
</script>


<style>

    .fade-enter-active, .fade-leave-active {
      transition: opacity .15s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
      opacity: 0;
    }
    .test {
        margin-top: 46px;
    }

    .test .preview {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        transition: 0.25s ease-in-out;
        height: 152px;
        border-radius: 7px;
        background: #fff;
        cursor: pointer;
    }
    .test:hover .preview {
        transform: translateY(-4px);
        -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.03);
    }
    .test .text-content {
        margin-top: 16px;
    }

    .test h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #3B405C;
    }

    .test span {
        margin-left: 8px;
        font-family: "Source Sans Pro", sans-serif;
        font-family: 16px;
        font-weight: 600;
        color: #C0BFD3;
    }

    .test span:first-child {
        margin-left: 0;
    }

    .test .tags {
        display: flex;
        flex-flow: row nowrap;
    }

    .test .play-button {
        z-index: 5;
    }
</style>