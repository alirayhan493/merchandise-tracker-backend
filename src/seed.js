const mongoose = require('mongoose');
const Zone = require('./models/zone');
const Department = require('./models/department');
const Damage = require('./models/damage')
const connectDB = require('./database');

const seedData = async () => {
    try{
        await connectDB();

        // await Department.deleteMany({});
        // await Zone.deleteMany({});
        await Damage.deleteMany({})

        const seedData = [
            { upc: '123456789012',  dateAdded: new Date() },
            { upc: '987654321098',  dateAdded: new Date() },
            { upc: '567890123456',  dateAdded: new Date() },
            // Add more sample data as needed
          ];

        const insertData = await Damage.insertMany(seedData);
        console.log("Damages Added")

        

        // const department = [
        //     {departmentID: '001', departmentName: 'Home'},
        //     {departmentID: '002', departmentName: 'RTW'},
        //     {departmentID: '003', departmentName: 'Shoes'},
        //     {departmentID: '004', departmentName: 'Accessories & Handbags'},
        //     {departmentID: '005', departmentName: 'Beauty'},
        //     {departmentID: '006', departmentName: 'Men\'s'},
        //     {departmentID: '007', departmentName: 'Kid\'s'},
        // ];

        // const insertedDepartments = await Department.insertMany(department);
        // console.log('Departments added successfully')

        // const zones = [
        //     {zoneID: '826', departmentID: insertedDepartments[2]._id, zoneName: 'Kid shoes'},
        //     {zoneID: '827', departmentID: insertedDepartments[2]._id, zoneName: 'Women shoes'},
        //     {zoneID: '841', departmentID: insertedDepartments[2]._id, zoneName: 'Men shoes'},

        //     {zoneID: '336', departmentID: insertedDepartments[4]._id, zoneName: 'Beauty Tools'},
        //     {zoneID: '379', departmentID: insertedDepartments[4]._id, zoneName: 'Skincare'},
        //     {zoneID: '810', departmentID: insertedDepartments[4]._id, zoneName: 'Fragrance'},
        //     {zoneID: '809', departmentID: insertedDepartments[4]._id, zoneName: 'Cosmetic'},
        //     {zoneID: '891', departmentID: insertedDepartments[4]._id, zoneName: 'Bath & Body'},

        //     {zoneID: '823', departmentID: insertedDepartments[3]._id, zoneName: 'Fashion Accessories'},
        //     {zoneID: '825', departmentID: insertedDepartments[3]._id, zoneName: 'Designer'},
        //     {zoneID: '829', departmentID: insertedDepartments[3]._id, zoneName: 'Moderate Handbags'},
        //     {zoneID: '834', departmentID: insertedDepartments[3]._id, zoneName: 'Fash Jewelry/Watches'},
        //     {zoneID: '835', departmentID: insertedDepartments[3]._id, zoneName: 'Fine Jewelry/Watches'},
        //     {zoneID: '845', departmentID: insertedDepartments[3]._id, zoneName: 'Sunglasses'},

        //     {zoneID: '712', departmentID: insertedDepartments[0]._id, zoneName: 'Electronics'},
        //     {zoneID: '861', departmentID: insertedDepartments[0]._id, zoneName: 'Bath/Kitchen/Window'},
        //     {zoneID: '862', departmentID: insertedDepartments[0]._id, zoneName: 'Gourmet'},
        //     {zoneID: '864', departmentID: insertedDepartments[0]._id, zoneName: 'Decor'},
        //     {zoneID: '865', departmentID: insertedDepartments[0]._id, zoneName: 'Bedroom Textiles'},
        //     {zoneID: '866', departmentID: insertedDepartments[0]._id, zoneName: 'Housewares'},
        //     {zoneID: '867', departmentID: insertedDepartments[0]._id, zoneName: 'Luggage'},
        //     {zoneID: '875', departmentID: insertedDepartments[0]._id, zoneName: 'Tabletop'},
        //     {zoneID: '882', departmentID: insertedDepartments[0]._id, zoneName: 'Storage Organization'},
        //     {zoneID: '884', departmentID: insertedDepartments[0]._id, zoneName: 'Small Furniture'},
        //     {zoneID: '897', departmentID: insertedDepartments[0]._id, zoneName: 'Furniture Access'},

        //     {zoneID: '800', departmentID: insertedDepartments[1]._id, zoneName: 'Junior Plus'},
        //     {zoneID: '801', departmentID: insertedDepartments[1]._id, zoneName: 'Women\'s Coats'},
        //     {zoneID: '803', departmentID: insertedDepartments[1]._id, zoneName: 'Dresses'},
        //     {zoneID: '804', departmentID: insertedDepartments[1]._id, zoneName: 'Contemporary'},
        //     {zoneID: '808', departmentID: insertedDepartments[1]._id, zoneName: 'Moderate Sportswear'},
        //     {zoneID: '820', departmentID: insertedDepartments[1]._id, zoneName: 'Active'},
        //     {zoneID: '836', departmentID: insertedDepartments[1]._id, zoneName: 'Intimate/Hosiery'},
        //     {zoneID: '839', departmentID: insertedDepartments[1]._id, zoneName: 'Better Tailored Sptswr'},
        //     {zoneID: '842', departmentID: insertedDepartments[1]._id, zoneName: 'Swimwear'},
        //     {zoneID: '847', departmentID: insertedDepartments[1]._id, zoneName: 'Petites'},
        //     {zoneID: '850', departmentID: insertedDepartments[1]._id, zoneName: 'Women\'s plus size'},
        //     {zoneID: '878', departmentID: insertedDepartments[1]._id, zoneName: 'Sleepwear'},
        //     {zoneID: '895', departmentID: insertedDepartments[1]._id, zoneName: 'Juniors'},

        //     {zoneID: '830', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Modern Sptswr'},
        //     {zoneID: '831', departmentID: insertedDepartments[5]._id, zoneName: 'Young Men\'s'},
        //     {zoneID: '832', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Tailored Clothing'},
        //     {zoneID: '833', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Furnishing'},
        //     {zoneID: '844', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Seasonal'},
        //     {zoneID: '846', departmentID: insertedDepartments[5]._id, zoneName: 'Gifting and Sporting Goods'},
        //     {zoneID: '859', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Active'},
        //     {zoneID: '863', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Classic Sptswr'},
        //     {zoneID: '869', departmentID: insertedDepartments[5]._id, zoneName: 'Men\'s Dress Shirts'},

        //     {zoneID: '854', departmentID: insertedDepartments[6]._id, zoneName: 'Infants & Toddlers'},
        //     {zoneID: '857', departmentID: insertedDepartments[6]._id, zoneName: 'Boys 4-7'},
        //     {zoneID: '858', departmentID: insertedDepartments[6]._id, zoneName: 'Boys 8-20'},
        //     {zoneID: '828', departmentID: insertedDepartments[6]._id, zoneName: 'Girls 4-6x'},
        //     {zoneID: '856', departmentID: insertedDepartments[6]._id, zoneName: 'Girls 7-16'},
        //     {zoneID: '851', departmentID: insertedDepartments[6]._id, zoneName: 'Kids Gear'},
        //     {zoneID: '852', departmentID: insertedDepartments[6]._id, zoneName: 'Kids Furnish'},
        //     {zoneID: '855', departmentID: insertedDepartments[6]._id, zoneName: 'Toys & Novelty'},
        //     {zoneID: '815', departmentID: insertedDepartments[6]._id, zoneName: 'Kids Seasonal'},
        // ];

        // await Zone.insertMany(zones);
        // console.log('Zones added successfully')

        process.exit();
    } catch (error) {
        console.error('Error seeing data:', error);
        process.exit(1);
    }
};

seedData();

// Zone.find()
//     .populate('departmentID')
//     .then(zone => {
//         console.log(zones);
//     })
//     .catch(err => console.error(err));



            










