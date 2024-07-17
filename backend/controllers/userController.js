const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model
const Demande=require('../models/Demande')

// Secret key for JWT
const secretKey = 'your_secret_key';

const register = async (req, res) => {
    const { username, email, password,role='client' } = req.body;
    console.log("Received email:", email);
    
    try {
        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            console.log("Email already exists:", email);
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword,role });
        await newUser.save();
        console.log("New user saved successfully");

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error in register function:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const finALlUsers=async(req,res)=>{
    try {
        const users =await User.find();
        res.json(users);
    }
    catch (err) {
        console.error('Error fetching users', err);
        res.status(500).json({ error: 'Internal server error' });
    }

}
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({...user}, secretKey, { expiresIn: '1h' });
        const role = user.role
        const id = user._id

        const requestID = user.UID
        // Return the token
        
         
        res.json({ token });


        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



const protected = (req, res) => {
    // Verify JWT token
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json({ message: 'Protected route', user: decoded.username });
    });
};

const createAccount = async (req, res) => {
    const { userDetails, paymentDetails, request: requestId } = req.body; // Correct destructuring to get requestId
    
    try {
      // Check if user already exists
      let user = await User.findOne({ email: userDetails.email });
  
      if (!user) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);
  
        // Create a new user
        user = new User({ ...userDetails, password: hashedPassword, UID: requestId }); // Insert requestId into UID field
        await user.save();
        console.log("the user was register")
      } else {
        return res.status(400).json({ message: 'Email already exists' });
      }
  

      // Create a new demande
      const demande = new Demande({
        UID: requestId, // Insert requestId into UID field
        paymentDetails: paymentDetails,
      });
  
      await demande.save();
  
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'Account and demande created successfully', token, user, demande });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const Requests = require('../models/Requests');

const commonData = async (req, res) => {
    try {
        const requestID = req.params.requestID; // Récupérer l'identifiant de la demande depuis la requête
        
        // Recherche de la demande par son ID
        const request = await Requests.findById(requestID);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        // Récupérer l'utilisateur associé à la demande
        const user = await User.findOne({ UID: requestID });

        // Récupérer la demande associée à la demande
        const demande = await Demande.findOne({ UID: requestID });

        // Renvoyer les données de l'utilisateur et de la demande
        res.json({ request , user, demande });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { register, login, protected,createAccount,commonData,finALlUsers};