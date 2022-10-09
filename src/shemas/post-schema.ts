import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const postValidationSchema = [
    body('title')
        .exists({checkFalsy: true}).withMessage("Field 'title' is not exist")
        .isString().withMessage("Field 'title' is not string")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' is empty")
        .trim()
        .isLength({min: 1, max: 30}).withMessage("Min length 1 and max length 30 symbols"),
    inputValidationMiddleware
];