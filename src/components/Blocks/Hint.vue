<template>
        <div class="col-12">
            <a class="hint" :href="href">
                <h3>
                    {{ title }}
                </h3>
                <span>
                    {{ description }}
                </span>
            </a>
        </div>
</template>

<script>
    export default {
        name: 'Hint',
        props: {
            title: String,
            description: String,
            href: String
        }
    }
</script>

<style>
    .hint {
        border-radius: 7px;
        background: #fff;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
        padding: 0 16px;
        height: 92px;
        transition: 0.25s ease-in-out;
        -webkit-box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        -moz-box-shadow:    0px 15px 30px 0px rgba(0, 0, 0, 0.03);
        box-shadow:         0px 15px 30px 0px rgba(0, 0, 0, 0.03);
    }
    
    .hint h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 22px;
        font-weight: 600;
        color:  #3B405C;
    }

    .hint span {
      margin-top: 6px;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #6D7188;
    }
</style>
