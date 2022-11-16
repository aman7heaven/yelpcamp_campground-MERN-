const mongoose=require('mongoose');
const cities=require('./cities');
const{places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground.js');

mongoose.connect('mongodb+srv://aman7heaven:27january@learn.v9ypdak.mongodb.net/?retryWrites=true&w=majority');

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database entered");
})

const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await Campground.deleteMany({});
   for(let i=0;i<50;i++){
    const random1000=Math.floor(Math.random()*1000);
   const camp= new Campground({

        author: '6363f85fdeae12ef098a0942',
        location:`${cities[random1000].city},${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description:' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic blanditiis dolor adipisci rerum iusto distinctio veritatis? Molestias facilis ea quibusdam eos unde aut accusamus dolores suscipit. Omnis molestias veniam qui',
        price: 30,
        geometry: {
          type: "Point",
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ]
        },
        images:[
            {
              url: 'https://images.unsplash.com/photo-1667210621904-07bfc2676c6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDk2fHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
              filename: 'YelpCamp/cjtygokd3bwlrvpebqxd',
             
            },
            {
              url: 'https://res.cloudinary.com/dbxzyibfs/image/upload/v1668249760/YelpCamp/be8quwuaru9akikvqsca.jpg',
              filename: 'YelpCamp/be8quwuaru9akikvqsca',
            
            }
          ],
         
    })
    await camp.save();
   }
}

seedDB().then(()=>{
    mongoose.connection.close();
})