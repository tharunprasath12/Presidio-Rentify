const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://tharun:Test@cluster0.akfoozk.mongodb.net");

// Root endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image upload configuration
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve uploaded images
app.use('/images', express.static('upload/images'));

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// Product schema
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    bhk: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            mob: req.body.mob,
            address: req.body.address,
            image: req.body.image,
            category: req.body.category,
            bhk: req.body.bhk,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();

        res.json({
            success: true,
            name: req.body.name,
            id: id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Fetch all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// New collections endpoint
app.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollections = products.slice(1).slice(-8);
        res.json(newCollections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Popular in women endpoint
app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Product.find({ category: "women" }).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// User schema
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Existing email id" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_rent');
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, error: "Wrong email" });
        }

        let check = user.password === req.body.password;
        if (!check) {
            return res.json({ success: false, error: "Wrong password" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_rent');
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Middleware to fetch user from token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: "Invalid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_rent');
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ errors: "Invalid token" });
    }
};

// Add to cart endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
    // try {
    //     let userData = await Users.findOne({ _id: req.user.id });
    //     if (!userData) {
    //         return res.status(404).json({ success: false, error: "User not found" });
    //     }
    //     userData.cartData[req.body.itemId] += 1;
    //     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    //     res.json({ success: true, message: "Item added to cart" });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, error: "Server error" });
    // }
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
});

// Remove from cart endpoint
app.post('/removefromcart', fetchUser, async (req, res) => {
    // try {
    //     let userData = await Users.findOne({ _id: req.user.id });
    //     if (!userData) {
    //         return res.status(404).json({ success: false, error: "User not found" });
    //     }
    //     if (userData.cartData[req.body.itemId] > 0) {
    //         userData.cartData[req.body.itemId] -= 1;
    //     }
    //     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    //     res.json({ success: true, message: "Item removed from cart" });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, error: "Server error" });
    // }
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("removed");
});

// Get cart data endpoint
app.post('/getcart', fetchUser, async (req, res) => {
    // try {
    //     let userData = await Users.findOne({ _id: req.user.id });
    //     if (!userData) {
    //         return res.status(404).json({ success: false, error: "User not found" });
    //     }
    //     res.json(userData.cartData);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, error: "Server error" });
    // }
    console.log("getcart",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    res.send(userData.cartData);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
