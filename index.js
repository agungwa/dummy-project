const express = require('express');
const app = express();
const productsRouter = require('./routes/products');

app.use(express.json());
app.use('/customers', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});