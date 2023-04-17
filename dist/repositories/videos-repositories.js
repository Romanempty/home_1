"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRepository = void 0;
const constVideos_1 = require("../constants/constVideos");
exports.videoRepository = {
    findVideo(id) {
        let video = constVideos_1.videos.find(p => p.id === id);
        return video;
    },
    createVideo(title, author, availableResolutions) {
        let newVideo = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: (new Date().toISOString()),
            publicationDate: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
            availableResolutions: availableResolutions
        };
    }
};
