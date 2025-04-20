
import ('express');
import('./api/userRoutes');
import('./api/thoughtRoutes');

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
