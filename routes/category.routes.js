const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");

const Category = require("../models/Category.model");
const Pose = require("../models/Pose.model");

//  POST /api/categories  -  Creates a new category

router.post("/categories", async (req, res, next) => {
  try {
    const { category_name, category_description } = req.body;

    // Create a new category
    const newCategory = await Category.create({
      category_name,
      category_description,
      poses: [], 
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new category" });
  }
});


// // router.post("/categories/", (req, res, next) => {
// router.post("/categories", (req, res, next) => {

//     const { id, category_name, category_description } = req.body;
  
//     Category.create({ id, category_name, category_description, poses: [] })
//       .then(response => res.json(response))
//       .catch(err => res.json(err));
//   });

// GET /api/categories -  Retrieves all of the categories
router.get('/categories', (req, res, next) => {
    Category.find()
      .populate('poses')
      .then(allCategories => res.json(allCategories))
      .catch(err => res.json(err));
  });

//  GET /api/categories/:categoryId -  Retrieves a specific category by id
router.get('/categories/:categoryId', (req, res, next) => {
    const { categoryId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Category document has a `poses` array holding `_id`s of Pose documents
    // We use .populate() method to get swap the `_id`s for the actual Pose documents
    Category.findById(categoryId)
      .populate('poses')
      .then(category => res.status(200).json(category))
      .catch(error => res.json(error));
  });
   
   
  // PUT  /api/categories/:categoryId  -  Updates a specific category by id

  // router.put('/categories/edit/:categoryId', (req, res, next) => {
  router.put('/categories/:categoryId', (req, res, next) => {
    const { categoryId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Category.findByIdAndUpdate(categoryId, req.body, { new: true })
      .then((updatedCategory) => res.json(updatedCategory))
      .catch(error => res.json(error));
  });
   
   
  //DELETE  /api/categories/:categoryId  -  Deletes a specific category by id
  router.delete('/categories/:categoryId', (req, res, next) => {
    const { categoryId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Category.findByIdAndRemove(categoryId)
      .then(() => res.json({ message: `Category with ${categoryId} is removed successfully.` }))
      .catch(error => res.json(error));
  });

module.exports = router;
