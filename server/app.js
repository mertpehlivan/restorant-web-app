const express = require('express');
const cors = require('cors');
const db = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const basketRoutes = require('./routes/basketRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authMiddleware = require('./middleware/authMiddlware');

//const DatabaseManager = require('./helpers/DatabaseManager');

const app = express();

app.use(cors({ // cors ayarlarını burada yapın
  origin: 'http://localhost:3000', // İzin vermek istediğiniz istemci adresi (React uygulamasının adresi)
  credentials: true, // Kimlik doğrulama bilgilerini göndermek için
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome!');
});
app.use('/auth', authRoutes);
app.use('/api', authMiddleware, userRoutes); // authMiddleware ekledim
app.use('/api', authMiddleware, basketRoutes); // authMiddleware ekledim
app.use('/api',authMiddleware, orderRoutes);
app.use('/apiv2', productRoutes);
app.get('/hello', authMiddleware, (req, res) => {
  res.send(`Hello account`);
});

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}.`);

  try {
    // Connect to the database
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
      } else {
        console.log('Connected to the database successfully.');
      }
    });
    // const db = new DatabaseManager();
    // await db.createTables();
    
  } catch (error) {
    console.error('Error creating database and tables:', error);
    process.exit(1);
  }
});
