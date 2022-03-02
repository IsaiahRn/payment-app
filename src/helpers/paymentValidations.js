import Joi from '@hapi/joi';

const validation = (req, res, schema, next) => {
  const { error } = schema.validate(req.body, req.params, { abortEarly: false });
  if (error) {
    const errorMessages = [];
    error.details.forEach(detail => {
      errorMessages.push(detail.message.split('"').join(''));
    });
    return res.json({
      status: 400,
      message: errorMessages
    });
  }
  return next();
};

class paymentValidations {
    static validatePaymentRequest(req, res, next) {
        const schema = Joi.object({
          CardNumber: Joi.string().length(16).regex(/^[0-9]+$/).message('CardNumber must be 16 digits').required(),
          ExpDate: Joi.string().regex(/^(\d{1,2})\/(\d{4})$/).message('ExpDate must match MM/YYYY format').required(),
          Cvv: Joi.string().length(3).regex(/^[0-9]+$/).message('CVV must be 3 digits').required(),
          Amount: Joi.number().integer().message('Amount must be a number').required(),
        })

        validation(req, res, schema, next);
    }
}

export default paymentValidations;
