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

      const payment = await payments.create(createPayment);

      return res.status(200).json({
        message: "Paid successfully",
        RequestId: payment._id,
        Amount: payment.Amount
      });
    } catch (err) {
      return res.status(500).json({
        error:
          "An error has occured, please contact our support team",
      });
    }
  }

  static async fetchOnePayment(req, res) {
    const { id } = req.params;

    try {
      const foundPayment =  await payments.findOne({ _id: id }).exec();
      if (!foundPayment) {
        return res.status(404).json({
          status: 404,
          Error: 'Payment not found',
        });
      }
      return res.status(200).json({
        Payment: foundPayment,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'An error has occured, please contact our custumer support',
      });
    }
  }
}

export default PaymentController;
