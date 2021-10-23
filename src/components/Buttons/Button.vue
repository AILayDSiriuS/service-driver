<template>
        <router-link :to="link" v-if="isLink == 'true'">
          <button :class="color" @click="action">{{ textContent }}</button>
        </router-link>
        <button :class="color" @click="action" v-else>{{ textContent }}</button>
</template>

<script>
    export default {
      name: 'Button',
      data: function() {
        return {
          buttonColor: ''
        }
      },
      props: {
          link: String,
          isLink: String,
          textContent: String,
          color: String
      },
      methods: {
        action: function () {
          this.$emit('action')
        }
      }
    }
</script>

<style>
    .btn-b, .btn-r, .btn-g, .btn-outline, .btn-outline-blue {
      font-family: "Source Sans Pro", sans-serif;
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      height: 54px;
      padding: 0 38px;
      border-radius: 7px;
      outline: none;
      border: none;
      transition: 0.15s ease-in-out;
    }

    .btn-disabled {
      background: #CABAF8 !important;
    }

    .btn-disabled:hover {
      background: #CABAF8 !important;
    }

    .btn-b:focus, .btn-r:focus, .btn-g {
      border: none;
      outline: none;
    }

    .btn-b {
      background: #9677F1;
    }

    .btn-b:hover {
      background: #876BD9;
    }

    .btn-b:disabled {
      background: rgba(150, 119, 241, 0.5);
    }

    .btn-outline {
      color: #fff;
      border: 2px solid #fff;
      background: none;
    }

    .btn-outline-blue {
      color: #9677F1;
      border: 2px solid #9677F1;
      background: none;
    }

    .btn-outline-blue:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .btn-outline-blue:focus {
      background: rgba(0, 0, 0, 0.05);
    }

    .btn-r {
      background: #FF375F;
    }

    .btn-r:hover {
      background: #FF2D55;
    }

    .btn-r:disabled {
      background: rgba(255, 45, 85, 0.5);
    }

    .btn-g {
      color: #9677F1;
      background: #F7F7F7;
    }

    .btn-g:hover {
      background: #EAEAEA;
    }

    .btn-g:disabled {
      background: rgba(52, 199, 89, 0.5);
    }
</style>
