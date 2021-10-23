<template>
    <div class="footer">
        <span class="center-block">
            © «ServiceDriver», 2020. All rights reserved.
        </span>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
            active: String
        }
    }
</script>

<style>
    .footer {
        width: 100%;
        height: 80px;
        margin-top: 90px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .footer span {
        font-family: "Source Sans Pro", sans-serif;
        font-size: 16px;
        color: #C0BFD3;
    }
</style>