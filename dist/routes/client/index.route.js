"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const clientRoutes = (app) => {
    app.use("/topics", topic_route_1.topicRoutes);
};
exports.default = clientRoutes;
