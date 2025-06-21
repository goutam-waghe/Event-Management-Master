import { Router } from "express";
import {
  adminDashboard,
  organizerDashboard,
  userDashboard,
} from "./dashboard.controller.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";

const dashboardRouter = Router();

dashboardRouter.route("/user").get(isAuthanticated, userDashboard);
dashboardRouter.route("/admin").get(isAuthanticated, adminDashboard);
dashboardRouter
  .route("/organizer")
  .get(isAuthanticated, organizerDashboard);

export default dashboardRouter;
