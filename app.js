const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');



dotenv.config();

const app = express();

app.use(express.json());


app.use('/cart', cartRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);




sequelize.sync({ force: false }).then(() => {
  console.log('Database synced...');
}).catch((err) => {
  console.log('Error: ' + err);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
