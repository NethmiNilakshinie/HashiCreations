const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Product = require('./models/products');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

// MongoDB Connection
mongoose.connect('mongodb+srv://Nethmi:Nethmi123@cluster0.evp2gkl.mongodb.net/HashiCreations?appName=Cluster0')
    .then(() => console.log("Nice! MongoDB Work!"))
    .catch(err => console.log(err));

// Multer Setup for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// 1. Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Add product with Image Upload (FIXED)
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        // processingTime එක destructured කරලා ගත්තා
        const { name, description, price, category, processingTime } = req.body;
        
        // Image URL එක හදාගැනීම
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        
        // අලුත් Product එක Database එකට යැවීමට සූදානම් කිරීම
        const newProduct = new Product({ 
            name, 
            description, 
            price, 
            category, 
            processingTime, // <--- මේක තමයි කලින් අඩු වෙලා තිබුණේ
            imageUrl 
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// 3. Update product (FIXED)
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, processingTime, description } = req.body;
    let updateData = { name, price, category, processingTime, description };

    if (req.file) {
      updateData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`; 
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));