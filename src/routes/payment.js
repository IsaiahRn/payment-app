import express from "express";

import paymentController from "../controllers/paymentController";
import paymentValidations from "../helpers/paymentValidations";

const router = express.Router();

const { makePayment, fetchOnePayment } = paymentController;

const { validatePaymentRequest } = paymentValidations;

router.post("/payment", validatePaymentRequest, makePayment);
router.get("/payment/:id", fetchOnePayment);

export default router;
