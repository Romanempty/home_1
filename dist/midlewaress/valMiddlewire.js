"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMidldewareErrors = exports.authorizationVal = void 0;
const express_validator_1 = require("express-validator");
const statusViews_1 = __importDefault(require("../views/statusViews"));
const authorizationVal = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.sendStatus(statusViews_1.default.UNAUTHORIZED_401);
    }
    const [method, encoded] = authorization.split(' ');
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [username, password] = decoded.split(':');
    if (method !== 'Basic' || username !== 'admin' || password !== 'qwerty') {
        return res.sendStatus(statusViews_1.default.UNAUTHORIZED_401);
    }
    else {
        next();
    }
};
exports.authorizationVal = authorizationVal;
const inputValidationMidldewareErrors = (req, res, next) => {
    const errorFormat = ({ msg, param }) => {
        return { message: msg, field: param };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormat);
    if (!errors.isEmpty()) {
        res.status(statusViews_1.default.BAD_REQUEST_400).send({ errorsMessages: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMidldewareErrors = inputValidationMidldewareErrors;
