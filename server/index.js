const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const foodModel = require('./models/foodModel');

const app = express ();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://hasib:hasib1234@crud.qsqgw.mongodb.net/food?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true })


app.post('/insert', async(req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new foodModel ({ foodName: foodName, daysSince: days });
    
    try {
        await food.save();
        res.send("Data inserterd"); 
    } catch (error) {
            console.log(error);
    }

})

app.get('/read', async(req, res) => {
    
    await foodModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }

        res.send(result);
    })
})

app.put('/update', async(req, res) => {
    
    const id = req.body.id;
    const newFoodName = req.body.newFoodName;

    try {
        await foodModel.findById(id, (err, updatedfood) => {
            updatedfood.foodName = newFoodName;
            updatedfood.save();
            res.send("update...")
        }) 
    } catch (error) {
            console.log(error);
    }

})

app.delete('/delete/:id', async(req, res) => {

    const id = req.params.id;
    await foodModel.findByIdAndRemove(id).exec();
    res.send("deleted...");

})


app.listen(5000, () => {
    console.log("Runnig....");
})