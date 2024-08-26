const mongoose = require('mongoose');
const dbPassword = 'daBackstageCrew3185';
const uri = `mongodb+srv://rali9924:${dbPassword}@merchandisedb.5sxcl.mongodb.net/?retryWrites=true&w=majority&appName=merchandiseDB`;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;