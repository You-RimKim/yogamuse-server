const router = require("express").Router();
const Favorite = require("../models/Favorite.model");
const Category = require('../models/Category.model');
const {isAuthenticated} = require("../middleware/jwt.middleware")
const mongoose = require("mongoose")

router.post('/add-favorite', async (req, res) => {
  const { _id } = req.payload;
  console.log(_id);

  // code below works but it's problematic:
  // It also does not add for other users to favorites because it already exists in database

  // const foundFavorite = await Favorite.findOne({id : req.body.id});

  // if (foundFavorite) {
  //   res.send("category is already in favorites")
  //   return
  // } 

  // Include the API link in the favorite data
  const favoriteData = { user: _id, ...req.body, apiLink: `https://yoga-api-nzy4.onrender.com/v1/categories?name=${req.body.category_name}` };

  Favorite.create(favoriteData)
    .then((createdFavorite) => res.json(createdFavorite))
    .catch((error) => {
      console.error("Error creating favorite:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Get all the favorite categories
router.get('/my-favorites', async (req, res) => {
  const { _id } = req.payload;

  try {
    const favorites = await Favorite.find({ user: _id });
    console.log(favorites)
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/my-favorites/:favoriteId',isAuthenticated , async (req, res) => {
  const { favoriteId } = req.params
  // console.log(favoriteId)

   // Validate favoriteId
   if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
    return res.status(400).json({ message: 'Invalid favoriteId' });
  }
  try {
    const favorite = await Favorite.findById(favoriteId);
    console.log(favorite)
    res.json(favorite);

  } catch (error) {
    console.error("Error fetching favorite content:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST route for adding a favorite category
router.post('/my-favorites', isAuthenticated, async (req, res) => {
  const { _id } = req.payload;
  const { category_name, category_description } = req.body;
  console.log(category_name, category_description)
  try {
    const existingFavorite = await Favorite.findOne({ user: _id, category_name });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Category is already in favorites' });
    }

    // Create a new favorite category
    const favoriteData = {
      user: _id,
      category_name,
      category_description,
      apiLink: `https://yoga-api-nzy4.onrender.com/v1/categories?name=${category_name}`,
    };
    console.log(favoriteData)
    const newFavorite = await Favorite.create(favoriteData);
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error("Error creating favorite category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route for deleting a category by its ID
router.delete('/my-favorites/:favoritesId', async (req, res) => {
  try {
    const favoritesId = req.params.favoritesId;

    await Favorite.findByIdAndRemove(favoritesId);

    console.log(favoritesId)

    

    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST route for adding a pose to a favorite category
router.post('/my-favorites/:favoriteId/add-pose', isAuthenticated, async (req, res) => {
  const { favoriteId } = req.params; 
  const { english_name, sanskrit_name, pose_description, pose_benefits, url_png } = req.body;

  try {
    // Find the favorite category by ID
    const favorite = await Favorite.findById(favoriteId);

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite category not found' });
    }

    // Create a new pose object
    const newPose = {
      english_name,
      sanskrit_name,
      pose_description,
      pose_benefits,
      url_png,
    };

    // Add the new pose to the favorite category's poses array
    favorite.poses.push(newPose);

    // Save the updated favorite category
    await favorite.save();

    res.status(201).json(newPose); // Return the newly added pose
  } catch (error) {
    console.error('Error adding pose to favorite category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;