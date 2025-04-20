import express from 'express';
import db from './config/connections.js';
import thoughtRoutes from './routes/api/thoughtRoutes.js';
import userRoutes from './routes/api/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes)

db.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
