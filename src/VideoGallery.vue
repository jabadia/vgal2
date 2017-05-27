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
</style>
