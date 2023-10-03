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

router.get('/my-favorites', async (req, res) => {
  const { _id } = req.payload;

  try {
    const favorites = await Favorite.find({ user: _id });
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

// DELETE route for deleting a category by its ID
router.delete('/my-favorites/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    await Category.findByIdAndRemove(categoryId);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;


// const router = require("express").Router();
// const Favorite = require("../models/Favorite.model");

// router.post('/add-favorite', (req, res) => {
//   const { _id } = req.payload;
//   console.log(_id, req.body)


  
//   Favorite.create({ user: _id, ...req.body })
//     .then((createdFavorite) => res.json(createdFavorite))
// });

// router.get('/my-favorites', async (req, res) => {
//   const { _id } = req.payload;

//   try {
//     const favorites = await Favorite.find({ user: _id });
//     res.json(favorites);
//   } catch (error) {
//     console.error("Error fetching favorites:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.get('/my-favorites/:favoriteId', async (req, res) => {
//   const { favoriteId } = req.params;

//   try {
//     const favorite = await Favorite.findById(favoriteId);
//     if (!favorite) {
//       return res.status(404).json({ message: "Favorite not found" });
//     }
    
//     // Return the content of the favorite
//     res.json(favorite);
//   } catch (error) {
//     console.error("Error fetching favorite content:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// module.exports = router