const express = require('express');
const connectDB = require('./database');
const fs = require('fs')

const Product = require('./models/product')
const Zone = require('./models/zone')
const Department = require('./models/department')
const Damage = require('./models/damage')

const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const stream = require('stream')
const streamifier = require('streamifier')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const zone = require('./models/zone');

const app = express();

app.use(express.json())
connectDB();

//my routes

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() }); // Using memory storage



app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Stream the file buffer to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'img-uploads' },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        // Send back the secure Cloudinary URL
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: 'Failed to upload image', details: error });
    }
});



//getting all products
app.get('/products', async (req, res) => {
    console.log("Product get reached")
    try{
        const products = await Product.find();
        const zones = await Zone.find();

        const zoneMap = zones.reduce((acc, zone) => {
            acc[zone.zoneID] = zone.zoneName;
            return acc;
        }, {});

        const productsWithZones = products.map(product => ({
            ...product._doc,
            zoneName: zoneMap[product.zoneID]|| 'Unknown Zone'
        }));

        res.json(productsWithZones);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({message: err.message});
    }
})


//create mew product
app.post('/products', async (req, res) => {
    const {upc, brandName, price, imageUrl, dataAdded } = req.body;
    const zoneID = Number(req.body.zoneID)
    console.log(zoneID)
    console.log(brandName)
    console.log(upc)
    console.log(price)
    console.log(imageUrl)
    console.log(dataAdded)

    try{
        const zone = await Zone.findOne( { zoneID: zoneID});
        if(!zone) {
            return res.status(400).json({message: "Invalid zoneID"});
        }
    } catch (err) {
        return res.status(400).json({message: "Invalid zoneID format or zone not found"})
    }


    const product = new Product({
        upc,
        brandName,
        zoneID,
        price,
        imageUrl,
        dataAdded
    })

    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err){
        res.status(400).json({ message: err.message});
    }
})

app.delete('/products', async (req, res) => {
    const {upc} = req.body;

    if(!upc) {
        return res.status(400).json({
            error: 'UPC is required'
        })
    }

    try{
        const deletedProduct = await Product.deleteOne({upc});
        if(deletedProduct.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found'})
        }
        res.status(200).json({ message: 'Product deleted successfully'})
    } catch (error) {
        console.error('Error deleting product: ', error);    
        res.status(500).json({error: 'Failed to delete product'})
    }
}
)


//add dmg
app.post('/damage', async (req, res) => {
    const {upc, dataAdded} = req.body;

    if(!upc || !dataAdded){
        return res.status(400).json({message: 'UPC and date are required'});
    }

    try{
        const newDamage = new Damage({ upc, dataAdded });
        const savedDamage = await newDamage.save();
        res.status(201).json(savedDamage);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/damage', async (req, res) => {
    try{
        const damages = await Damage.find();
        res.json(damages);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

app.delete('/damage', async (req, res) => {
    const { _id } = req.body; // Expecting an array of _id values
    console.log('Request Body:', req.body); // Log the entire request body
    console.log('IDs to delete:', _id); // Log the IDs

    // Check if the request body is defined
    if (!req.body || !Array.isArray(_id)) {
        return res.status(400).json({ message: 'Invalid input: ids should be an array' });
    }

    if (_id.length === 0) {
        return res.status(400).json({ message: 'Invalid input: ids array should not be empty' });
    }


    try {
        const result = await Damage.deleteMany({ _id: { $in: _id } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No items found to delete' });
        }

        return res.status(200).json({ message: `${result.deletedCount} items deleted successfully` });
    } catch (error) {
        console.error('Error deleting damage items:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});





const port = process.env.PORT || 5001;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});