"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../config/config");
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(PATH_ADMIN + "/dashboard", dashboard_route_1.dashboardRoutes);
};
exports.default = adminRoutes;
