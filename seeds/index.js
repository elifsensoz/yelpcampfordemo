const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6222948b9c515c47fc4d6e72', //test3
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dcmwa7wai/image/upload/v1646958080/YelpCamp/bgoucmfcxo8tts86szj8.jpg',
                  filename: 'YelpCamp/bgoucmfcxo8tts86szj8'
                },
                {
                  url: 'https://res.cloudinary.com/dcmwa7wai/image/upload/v1646958080/YelpCamp/c9ixkfm9u9thiolurr6v.jpg',
                  filename: 'YelpCamp/c9ixkfm9u9thiolurr6v'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price             
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})