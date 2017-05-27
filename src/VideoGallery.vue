<template>
    <div class="content">
        <div v-for="email in emails">
            <h3>{{email.createdDateTime|formatDate}}, {{email.subject}}</h3>
            <div class="row">
                <div v-if="!email.videosDetails.length" class="col-xs-6 col-sm-4 col-md-3">
                    <div class="ja-card">
                        <div class="ja-card-title">Ups!</div>
                        <div class="ja-card-content">
                            <span>no hay videos en este email</span>
                        </div>
                    </div>
                </div>
                <div v-for="(video, index) in email.videosDetails" class="col-xs-6 col-sm-4 col-md-3">
                    <div class="ja-card" @click="openVideo(video)" :class="{'shadow-3': video == currentVideo}">
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
            </div>
        </div>

    </div>
</template>

<script>
    import backendApi from './backendApi.js';
    import moment from 'moment';
    import Vue from 'vue';
    import _ from 'lodash';

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
                this.$nextTick(() => {
                    this.$refs.videoModal.open();
                });
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
        }
    }
</script>

<style>
</style>
