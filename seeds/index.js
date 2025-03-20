const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const images = [
    'https://res.cloudinary.com/dofzka54c/image/upload/v1742407799/YelpCamp/fg1kchopa4qxpdkbnrgm.jpg',
    'https://res.cloudinary.com/dofzka54c/image/upload/v1742407799/YelpCamp/zz7r2ppqjjwi5a8c6qlq.jpg',
    'https://res.cloudinary.com/dofzka54c/image/upload/v1742353669/YelpCamp/hax5bnrbkrd33rtdz4s6.jpg',
    'https://res.cloudinary.com/dofzka54c/image/upload/v1742353669/YelpCamp/fyvladowewudbcdth1o7.jpg'
]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const img1 = Math.floor(Math.random() * 4);
        const img2 = Math.floor(Math.random() * 4);
        const camp = new Campground({
            //YOUR USER ID
            author: '67d8ca7da9863aa80e3968ec',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: images[img1],
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: images[img2],
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})