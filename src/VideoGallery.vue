<template>
    <div class="container-fluid">
        <div v-for="year in sortedYears">
            <!--<h1>{{year}}</h1>-->

            <div v-for="(attachment,index) in years[year]" v-if="attachment.videosDetails.length">
                <h2 v-if="index === 0 || years[year][index-1].createdDateTime.getMonth() != attachment.createdDateTime.getMonth()">
                    {{attachment.createdDateTime|monthName}} {{year}}
                </h2>
                <h3>{{attachment.createdDateTime|formatDate}}, {{attachment.subject}}, {{attachment.name}}</h3>
                <div class="row">
                    <div v-for="(video, index) in attachment.videosDetails" class="col-xs-6 col-sm-4 col-md-3">
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
                years: [],
                currentVideo: {},
            };
        },
        computed: {
            sortedYears() {
                return _.keys(this.years).sort().reverse();
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
            return backendApi.getEmailAttachmentsGrouped().then(years => {
                this.years = years;
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
