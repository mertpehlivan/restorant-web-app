const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const BasketRepository = require('../repositories/BasketRepository');

const register = async (req, res) => {
  const { name, surname, phone, address, role, email, password } = req.body;
  console.log(name,surname,phone,address,role,email,password)
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.createUser(name, surname, phone, address, role, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    
    const user = await UserRepository.findUserByEmailandGetPassword(email);
    const isPasswordMatch = await bcrypt.compare(password, user[0].user_password);
    console.log(isPasswordMatch)
    if (user && isPasswordMatch) {
      const token = jwt.sign({ email }, jwtConfig.secret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful.', token });
    } else {
      res.json({ message: 'Incorrect email or password.' });
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  register,
  login
};
