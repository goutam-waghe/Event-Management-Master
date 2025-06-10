import { body } from "express-validator";

export const Validator = (method) => {
  switch (method) {
    case "registerValidator":
      {
        return [
          body("name")
            .notEmpty()
            .withMessage("Name is required")
            .isLength({ min: 3 })
            .withMessage("Name must be at least 3 characters long"),
          body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
          body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        ];
      }
      break;
    case "loginValidator":
      {
        return [
          body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
          body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        ];
      }

      break;
    case "categoryValidator": {
      return [
        body("name")
          .notEmpty()
          .withMessage("Name is required")
          .isLength({ min: 3 })
          .withMessage("Name must be at least 3 characters long"),
      ];
    }
    case "bookingValidator":
      {
        return [
          body("numberOfTickets")
            .notEmpty()
            .withMessage("Number of tickets is required"),
        ];
      }
      break;
    case "EventValidator":
      {
        return [
          body("title")
            .notEmpty()
            .withMessage("title is required")
            .isLength({ min: 3 })
            .withMessage("Name must be at least 3 characters long"),
          body("capacity").notEmpty().withMessage("Capacity is required"),
          body("ticketPrice").notEmpty().withMessage("Ticket is required"),
          body("description").notEmpty().withMessage("Ticket is required"),
          body("venue").notEmpty().withMessage("vanue is required"),
          body("startDateTime")
            .notEmpty()
            .withMessage("startDateTime is required"),
        ];
      }

      break;

    default:
      break;
  }
};
