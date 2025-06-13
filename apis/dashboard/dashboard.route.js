import { Router } from "express";
import {
  adminDashboard,
  organizerDashboard,
  userDashboard,
} from "./dashboard.controller.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";

const dashboardRouter = Router();

dashboardRouter.route("/dashboard/user").get(isAuthanticated, userDashboard);
dashboardRouter.route("/dashboard/admin").get(isAuthanticated, adminDashboard);
dashboardRouter
  .route("/dashboard/organizer")
  .get(isAuthanticated, organizerDashboard);

export default dashboardRouter;
