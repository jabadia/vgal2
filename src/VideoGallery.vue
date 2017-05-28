<template>
    <div class="container-fluid">
        <div v-for="yearMonth in sortedYearMonths">
            <!--<h1>{{year}}</h1>-->

            <div v-for="(attachment,index) in yearMonths[yearMonth]" v-if="attachment.videosDetails.length">
                <h2 v-if="index === 0">
                    <i class="glyphicon glyphicon-calendar"></i> {{attachment.createdDateTime|monthName}} {{attachment.createdDateTime.getFullYear()}}
                </h2>
                <h3>{{attachment.createdDateTime|formatDate}}, {{attachment.subject}}</h3>
                <h4>{{attachment.name}}</h4>
                <div class="row">
                    <div v-for="(video, index) in attachment.videosDetails" class="col-xs-4 col-sm-3">
                        <video-card :video='video'
                                    :is-current="video==currentVideo"
                                    @click.native="openVideo(video)"
                        ></video-card>
                    </div>
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

    Vue.filter('monthName', function (value) {
        if (value) {
            return moment(value).format('MMMM');
        }
    });

    export default {
        data () {
            return {
                yearMonths: [],
                currentVideo: {},
            };
        },
        computed: {
            sortedYearMonths() {
                return _.keys(this.yearMonths).sort().reverse();
            },
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
//            return backendApi.getEmailAttachmentsWithVideos().then(attachments => {
//                this.attachments = attachments;
//            });
            return backendApi.getEmailAttachmentsGrouped().then(yearMonths => {
                this.yearMonths = yearMonths;
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
        background: rgba(0, 0, 0, .8) !important;
    }
</style>
