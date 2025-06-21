import {
  adminDashboardService,
  organizerDashboardService,
  userDashboardService,
} from "./dashboard.service.js";

//user dashboard
export const userDashboard = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const response = await userDashboardService(userId);
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR ${error.massage}`,
    });
  }
};

// admin dashboard
export const adminDashboard = async function (req, res, next) {
  try {
    const response = await adminDashboardService();
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR ${error.message}`,
    });
  }
};

//organizer Dashboard
export const organizerDashboard = async function (req, res, nextc) {
  try {
    const userId = req.user._id;
    const response = await organizerDashboardService(userId);
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR ${error.massage}`,
    });
  }
};
