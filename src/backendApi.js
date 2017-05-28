import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';


export default {
    getEmailAttachmentsWithVideos () {
        return axios.get('https://jabadia.github.io/vgal/statics/attachmentsWithLinks.json').then(response => {
            console.log(response.data);
            let attachments = response.data;
            _.each(attachments, attachment => {
                attachment.createdDateTime = new Date(attachment.createdDateTime);
                // let linksById = _.keyBy(attachment.videos, 'v');
                // _.each(attachment.videosDetails, videoDetails => {
                //     // videoDetails.link = linksById[videoDetails.id].link.replace('/watch?v=', '/embed/');
                // });
            });
            attachments = _.orderBy(attachments, 'createdDateTime', ['desc']);
            return attachments;
        }).catch( err => {
            console.error(err);
            return [];
        });
    },
    getEmailAttachmentsGrouped() {
        return this.getEmailAttachmentsWithVideos().then( attachments => {
            let byYearMonth = _.groupBy(attachments, attachment => moment(attachment.createdDateTime).format('YYYY.MM'));
            return byYearMonth;
        }).catch( err => {
            console.error(err);
            return {};
        });
    }
};
