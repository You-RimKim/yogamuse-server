const router = require("express").Router();
const Favorite = require("../models/Favorite.model");

router.post('/add-favorite', (req, res) => {
  const { _id } = req.payload;
  console.log(_id, req.body);

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

router.get('/my-favorites/:favoriteId', async (req, res) => {
  const { favoriteId } = req.params;

  try {
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    
    // Return the content of the favorite
    res.json(favorite);
  } catch (error) {
    console.error("Error fetching favorite content:", error);
    res.status(500).json({ message: "Internal Server Error" });
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