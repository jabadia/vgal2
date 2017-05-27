<template>

    <div>
    <div v-if="!video" class="ja-card">
        <div class="ja-card-title">Ups!</div>
        <div class="ja-card-content">
            <span>no hay videos en este email</span>
        </div>
    </div>

    <div v-if="video"
         class="ja-card"
         :class="{'ja-current': isCurrent}"
    >
        <!--<a :href="video.link">-->
        <div class="ja-card-media">
            <img :src="video.thumbnails.medium.url" alt="">
        </div>
        <div class="ja-card-content">
            {{video.title}}
        </div>
        <!--</a>-->
    </div>
    </div>
</template>

<script>
    export default {
        props: ['video','isCurrent'],
        data () {
            return {}
        },
        methods: {
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .ja-card {
        opacity: 0.8;
        img {
            max-width: 100%;
        }
        height: 200px;
    }
    .ja-current {
        opacity: 1
    }

</style>
