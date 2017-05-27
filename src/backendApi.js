import axios from 'axios';
import _ from 'lodash';


export default {
    getEmailsWithVideos () {
        return axios.get('https://jabadia.github.io/vgal/statics/attachmentsWithLinks.json').then(attachments => {
            console.log(attachments.data);
            let emails = attachments.data;
            _.each(emails, email => {
                email.createdDateTime = new Date(email.createdDateTime);
                // let linksById = _.keyBy(attachment.videos, 'v');
                // _.each(attachment.videosDetails, videoDetails => {
                //     // videoDetails.link = linksById[videoDetails.id].link.replace('/watch?v=', '/embed/');
                // });
            });
            emails = _.orderBy(emails, 'createdDateTime', ['desc']);
            return emails;
        }).catch( err => {
            console.error(err);
            return [];
        });
    },
};
