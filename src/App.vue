<template>
    <div id="app">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        Videos
                    </a>
                </div>
            </div>
        </nav>
        <video-gallery></video-gallery>
    </div>
</template>

<script>
    import VideoGallery from './VideoGallery.vue';

    export default {
        name: 'app',
        data () {
            return {}
        },
        components: {
            VideoGallery,
        }
    }
</script>

<style>
</style>
