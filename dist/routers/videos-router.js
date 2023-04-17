"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const constVideos_1 = require("../constants/constVideos");
const constVideos_2 = require("../constants/constVideos");
const statusViews_1 = __importDefault(require("../views/statusViews"));
const videos_repositories_1 = require("../repositories/videos-repositories");
exports.videoRouter = (0, express_1.Router)({});
exports.videoRouter.get('/', (req, res) => {
    res.send(constVideos_1.videos);
});
exports.videoRouter.get('/:id', (req, res) => {
    let video = videos_repositories_1.videoRepository.findVideo(+req.params.id);
    if (video) {
        res.send(video);
    }
    else {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
    }
});
exports.videoRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < constVideos_1.videos.length; i++) {
        if (constVideos_1.videos[i].id === +req.params.id) {
            constVideos_1.videos.splice(i, 1);
            res.sendStatus(statusViews_1.default.NO_CONTENT_204);
        }
    }
    res.sendStatus(statusViews_1.default.NOT_FOUND_404);
});
exports.videoRouter.post('/', (req, res) => {
    let newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: (new Date().toISOString()),
        publicationDate: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
        availableResolutions: req.body.availableResolutions
    };
    let errorsArray = [];
    if (typeof newVideo.title !== 'string' || newVideo.title.length > 40) {
        errorsArray.push({ message: 'error', field: 'title' });
    }
    if (typeof newVideo.author !== 'string' || newVideo.author.length > 20) {
        errorsArray.push({ message: 'error', field: 'author' });
    }
    if (Array.isArray(newVideo.availableResolutions)) {
        const length = newVideo.availableResolutions.length;
        let check = newVideo.availableResolutions.filter(value => {
            return constVideos_2.availableResolutions.includes(value);
        });
        if (check.length < length) {
            errorsArray.push({ message: 'error', field: 'availableResolutions' });
        }
    }
    else {
        errorsArray.push({ message: 'error', field: 'availableResolutions' });
    }
    if (typeof newVideo.canBeDownloaded !== 'boolean') {
        if (newVideo.canBeDownloaded === undefined) {
            newVideo.canBeDownloaded = false;
        }
        else {
            errorsArray.push({ message: 'error', field: 'canBeDownloaded' });
        }
    }
    if ((newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) !== null && typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) !== 'number') {
        errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
    }
    else if (typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) === 'number') {
        if (+(newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) < 1 || +(newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) > 18) {
            errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
        }
    }
    if (errorsArray.length > 0) {
        let eList = { errorsMessages: errorsArray };
        res.status(statusViews_1.default.BAD_REQUEST_400).send(eList);
    }
    else {
        constVideos_1.videos.push(newVideo);
        res.status(statusViews_1.default.CREATED_201).send(newVideo);
    }
});
exports.videoRouter.put('/:id', (req, res) => {
    let newVideo1 = constVideos_1.videos.find(p => p.id === +req.params.id);
    let index = constVideos_1.videos.findIndex(p => p.id === +req.params.id);
    let errorsArray = [];
    if (newVideo1) {
        const newVideo = Object.assign(Object.assign({}, newVideo1), req.body);
        if (typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.title) !== 'string' || newVideo.title.length > 40) {
            errorsArray.push({ message: 'error', field: 'title' });
        }
        if (typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.author) !== 'string' || newVideo.author.length > 20) {
            errorsArray.push({ message: 'error', field: 'author' });
        }
        if (Array.isArray(newVideo === null || newVideo === void 0 ? void 0 : newVideo.availableResolutions)) {
            const length = newVideo === null || newVideo === void 0 ? void 0 : newVideo.availableResolutions.length;
            let check = newVideo === null || newVideo === void 0 ? void 0 : newVideo.availableResolutions.filter((value) => {
                return constVideos_2.availableResolutions.includes(value);
            });
            if (check.length < length) {
                errorsArray.push({ message: 'error', field: 'availableResolutions' });
            }
        }
        else {
            errorsArray.push({ message: 'error', field: 'availableResolutions' });
        }
        if (typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.canBeDownloaded) !== 'boolean') {
            errorsArray.push({ message: 'error', field: 'canBeDownloaded' });
        }
        if ((newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) !== null && typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) !== 'number') {
            errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
        }
        else if (typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) === 'number') {
            if (+(newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) < 1 || +(newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) > 18) {
                errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
            }
        }
        if (typeof newVideo.publicationDate === 'string') {
            if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(newVideo.publicationDate)) {
                errorsArray.push({ message: 'error', field: 'publicationDate' });
            }
        }
        else {
            errorsArray.push({ message: 'error', field: 'publicationDate' });
        }
        if (errorsArray.length > 0) {
            let eList = { errorsMessages: errorsArray };
            res.status(statusViews_1.default.BAD_REQUEST_400).send(eList);
        }
        else {
            constVideos_1.videos[index] = newVideo;
            res.sendStatus(statusViews_1.default.NO_CONTENT_204);
        }
    }
    else {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
    }
});
