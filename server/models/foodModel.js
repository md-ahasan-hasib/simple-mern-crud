const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName:{
        type: String,
        required: true
    },
    daysSince:{
        type: Number,
        required:true
    }
})

const food = mongoose.model("FoodData", foodSchema);

module.exports = food;

