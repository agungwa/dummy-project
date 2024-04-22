import express from 'express';
import productsRouter from './routes/products.js';

const app = express();

app.use(express.json());
app.use('/customers', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app