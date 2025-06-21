import { isAuthanticated } from "../../helper/comman/isAuthanticated";
import { manageUsers, updateRole } from "./admin.controller";

// admin
userRouter.route("/manage/users").get(isAuthanticated, manageUsers);
userRouter.route("/manage/role/:id").post(isAuthanticated, updateRole);
