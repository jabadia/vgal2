<template>
    <div class="container">
        <div v-for="email in emails">
            <h3>{{email.createdDateTime|formatDate}}, {{email.subject}}</h3>
            <div class="row">
                <div v-if="!email.videosDetails.length" class="col-xs-6 col-sm-4 col-md-3">
                    <video-card :video='null'></video-card>
                </div>
                <div v-for="(video, index) in email.videosDetails" class="col-xs-6 col-sm-4 col-md-3">
                    <video-card :video='video' :is-current="video==currentVideo" @click.native="openVideo(video)"></video-card>
                </div>
            </div>
        </div>

        <modal name="video-player" :adaptative="true"
               classes="video-player-modal"
               :width="800"
               :height="640">
            <div class="iframe-wrapper">
                <iframe
                        :src="'https://www.youtube.com/embed/' + currentVideo.id + '?autoplay=1&rel=0'"
                        height="600"
                        width="800"
                        frameborder="0"
                        allowfullscreen
                ></iframe>
            </div>
            <div class="video-title">{{currentVideo.title}}</div>
        </modal>

    </div>
</template>

<script>
    import backendApi from './backendApi.js';
    import moment from 'moment';
    import Vue from 'vue';
    import _ from 'lodash';
    import VideoCard from './VideoCard.vue';

    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(value).format('DD/MM/YYYY');
        }
    });

    export default {
        data () {
            return {
                emails: [],
                currentVideo: {},
            };
        },
        methods: {
            openVideo (video) {
                this.currentVideo = video;
                this.$modal.show('video-player');
//                this.$nextTick(() => {
//                    this.$refs.videoModal.open();
//                });
                console.log(video);
            },
            closedVideoModal () {
                console.log('closed');
                this.currentVideo = {};
            },
        },
        mounted () {
            return backendApi.getEmailsWithVideos().then(emails => {
                this.emails = emails;
            });
        },
        components: {
            VideoCard,
        },
    }
</script>

<style>
    .video-player-modal .video-title {
        height: 40px;
        overflow: hidden;
        padding: 4px 8px;
    }
    .v--modal-overlay {
        background: rgba(0,0,0,.8) !important;
    }
</style>
