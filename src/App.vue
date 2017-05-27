<template>
    <div id="app">
        <b-navbar type="inverse" variant="primary">
            <b-link class="navbar-brand" to="#">
                <span>Videos</span>
            </b-link>
        </b-navbar>
        <video-gallery></video-gallery>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import VideoGallery from './VideoGallery.vue';

    export default {
        name: 'app',
        data () {
            return {
            }
        },
        components: {
            VideoGallery,
        }
    }
</script>

<style>
</style>
