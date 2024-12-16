const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const axios = require("axios");

router.post("/", async (req, res) => {
    const { title , description } = req.body;
    try {
        const newItem = new Item({ title, description });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json( { error: " Failed to create item. "});
    }
});

router.get("/", async (req,res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch items." });
    }
});

router.get("/nasa", async (req, res) => {
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    try {
        const nasaResponse = await axios.get(nasaUrl);
        const { title, explanation } = nasaResponse.data;
        const newItem = new Item({
            title,
            description: explanation,
        });
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data from NASA API "});
    }
});

router.put("/:id", async (req, res) => {
    const { title, description } = req.body;
    try {
        const updatedItem = await Item.findIdAndUpdate(
            req.params.id,
            {title, description},
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json( { error: "Failed to update item." } );
    }
});

router.delete("/:id" , async ( req, res ) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json( { message: "Item deleted" } );
    }catch(err) {
        res.status(500).json({ error: " Failed to delete item. " } );
    }
});

module.exports = router;
