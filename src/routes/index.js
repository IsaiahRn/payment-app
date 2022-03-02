import Router from 'express';
import paymentRoutes from './payment';

const router = new Router();
router.use('/api/v1', paymentRoutes);

export default router;
