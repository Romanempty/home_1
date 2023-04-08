"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestTypes_1 = __importDefault(require("./types/requestTypes"));
const body_parser_1 = __importDefault(require("body-parser"));
const constVideos_1 = require("./constVideos");
const constVideos_2 = require("./constVideos");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
app.delete('/testing/all-data', (req, res) => {
    constVideos_1.videos.splice(0, constVideos_1.videos.length);
    res.sendStatus(requestTypes_1.default.NO_CONTENT_204);
});
app.get('/videos', (req, res) => {
    res.send(constVideos_1.videos);
});
app.get('/videos/:id', (req, res) => {
    let video = constVideos_1.videos.find(p => p.id === +req.params.id);
    if (video) {
        res.send(video);
    }
    else {
        res.sendStatus(requestTypes_1.default.NOT_FOUND_404);
    }
});
app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < constVideos_1.videos.length; i++) {
        if (constVideos_1.videos[i].id === +req.params.id) {
            constVideos_1.videos.splice(i, 1);
            res.sendStatus(requestTypes_1.default.NO_CONTENT_204);
        }
    }
    res.sendStatus(requestTypes_1.default.NOT_FOUND_404);
});
app.post('/videos', (req, res) => {
    let newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
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
    if ((newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) !== null && typeof newVideo.minAgeRestriction !== 'number') {
        if ((newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) === undefined) {
            newVideo.minAgeRestriction = null;
        }
        else {
            errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
        }
    }
    else if (typeof (newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) !== 'number') {
        if (+newVideo.minAgeRestriction < 1 || +newVideo.minAgeRestriction > 18) {
            errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
        }
    }
    if (errorsArray.length > 0) {
        let eList = { errorsMessages: errorsArray };
        res.status(requestTypes_1.default.BAD_REQUEST_400).send(eList);
    }
    else {
        constVideos_1.videos.push(newVideo);
        res.status(requestTypes_1.default.CREATED_201).send(newVideo);
    }
});
app.put('/videos/:id', (req, res) => {
    let newVideo1 = constVideos_1.videos.find(p => p.id === +req.params.id);
    let index = constVideos_1.videos.findIndex(v => v.id === +req.params.id);
    let errorsArray = [];
    if (newVideo1) {
        const newVideo = Object.assign(Object.assign({}, newVideo1), req.body);
        if (typeof newVideo.title !== 'string' || newVideo.title.length > 40) {
            errorsArray.push({ message: 'error', field: 'title' });
        }
        if (typeof newVideo.author !== 'string' || newVideo.author.length > 20) {
            errorsArray.push({ message: 'error', field: 'author' });
        }
        if (Array.isArray(newVideo.availableResolutions)) {
            const length = newVideo.availableResolutions.length;
            let check = newVideo.availableResolutions.filter((value) => {
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
            if ((newVideo === null || newVideo === void 0 ? void 0 : newVideo.canBeDownloaded) === undefined) {
                newVideo.canBeDownloaded = false;
            }
            else {
                errorsArray.push({ message: 'error', field: 'canBeDownloaded' });
            }
        }
        if (newVideo.minAgeRestriction !== null && typeof newVideo.minAgeRestriction !== 'number') {
            errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
        }
        else if (typeof newVideo.minAgeRestriction !== 'number') {
            if (+(newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) < 1 || +(newVideo === null || newVideo === void 0 ? void 0 : newVideo.minAgeRestriction) > 18) {
                errorsArray.push({ message: 'error', field: 'minAgeRestriction' });
            }
        }
        if (typeof newVideo.publicationDate === 'string') {
            let r = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|w([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
            if (!r.test(newVideo.publicationDate)) {
                errorsArray.push({ message: 'error', field: 'publicationDate' });
            }
        }
        else {
            errorsArray.push({ message: 'error', field: 'publicationDate' });
        }
        if (errorsArray.length > 0) {
            let eList = { errorsMessages: errorsArray };
            res.status(requestTypes_1.default.BAD_REQUEST_400).send(eList);
        }
        else {
            constVideos_1.videos[index] = newVideo;
            res.sendStatus(requestTypes_1.default.NO_CONTENT_204);
        }
    }
    else {
        res.sendStatus(requestTypes_1.default.NOT_FOUND_404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
