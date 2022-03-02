import { v4 as uuid_v4 } from "uuid";
import dotenv from "dotenv";
import payments from "../models/payment";

dotenv.config();

class PaymentController {
  static async makePayment(req, res) {
    const { CardNumber, ExpDate, Cvv, Amount } = req.body;

    try {
      const createPayment = {
        CardNumber,
        ExpDate,
        Cvv,
        Amount
      };

      await payments.create(createPayment);

      return res.status(200).json({
        message: "Paid successfully"
      });
    } catch (err) {
      return res.status(500).json({
        error:
          "An error has occured, please contact our support team",
      });
    }
  }
}

export default PaymentController;
