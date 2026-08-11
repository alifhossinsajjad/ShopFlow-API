"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class AppEventEmitter extends events_1.EventEmitter {
}
const eventEmitter = new AppEventEmitter();
exports.default = eventEmitter;
