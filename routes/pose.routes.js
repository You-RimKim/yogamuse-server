const router = require("express").Router();
const axios = require('axios');
const mongoose = require("mongoose");

const Pose = require("../models/Pose.model");
const Category = require("../models/Category.model");

// POST /api/poses - Creates a new pose
router.post("/my-favorites/:favoritesId/poses", async (req, res, next) => {
  const { id, english_name, sanskrit_name, pose_description, pose_benefits, url_png, category } = req.body;

  try {
    // Create a new pose
    const newPose = await Pose.create({
      id,
      english_name,
      sanskrit_name,
      pose_description,
      pose_benefits,
      url_png,
      category
    });

    // Add the new pose to the category's poses array
    const updatedCategory = await Category.findByIdAndUpdate(
      favoritesId, 
      { $push: { poses: newPose._id } }, 
      { new: true });

    res.json(newPose);
  } catch (error) {
    console.error("Error creating pose:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /api/poses - Retrieves all of the poses
router.get('/poses', (req, res, next) => {
  Category.find()
    .populate('poses')
    .then(allPoses => res.json(allPoses))
    .catch(err => res.json(err));
});

// PUT /api/poses/:poseId - Updates a specific pose by id
router.put('/poses/:poseId', (req, res, next) => {
  const { poseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(poseId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Category.findByIdAndUpdate(poseId, req.body, { new: true })
    .then((updatedPose) => res.json(updatedPose))
    .catch(error => res.json(error));
});

// DELETE /api/poses/:poseId - Deletes a specific pose by id
router.delete('/poses/:poseId', (req, res, next) => {
  const { poseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(poseId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Category.findByIdAndRemove(poseId)
    .then(() => res.json({ message: `Pose with ${poseId} is removed successfully.` }))
    .catch(error => res.json(error));
});

module.exports = router;


// const router = require("express").Router();
// const axios =require('axios')
// const mongoose = require("mongoose");

// const Pose = require("../models/Pose.model");
// const Category = require("../models/Category.model");

// //  POST /api/poses  -  Creates a new pose
// router.post("/poses", (req, res, next) => {
//   const { id, english_name, sanskrit_name, pose_description, pose_benefits, url_png, category } = req.body;

// const poses = async () => {
//   await axios.get("https://yoga-api-nzy4.onrender.com/v1/categories")
// }
// // console.log(poses())



// // original  
//   // Pose.create({ id, english_name, sanskrit_name, pose_description, pose_benefits, url_png, category })
//   //   .then(newPose => {
//   //     console.log(newPose)
//   //     return Category.findByIdAndUpdate(category, { $push: { poses: newPose._id } }, {new: true} );
//   //   })
//   //   .then(response => res.json(response))
//   //   .catch(err => res.json(err));

// });

// // GET /api/poses -  Retrieves all of the poses
// router.get('/poses', (req, res, next) => {
//   Category.find()
//     .populate('poses')
//     .then(allPoses => res.json(allPoses))
//     .catch(err => res.json(err));
// });
 
 
// // PUT  /api/poses/:poseId  -  Updates a specific pose by id

// // router.put('/poses/edit/:poseId', (req, res, next) => {
// router.put('/poses/:poseId', (req, res, next) => {
//   const { poseId } = req.params;
 
//   if (!mongoose.Types.ObjectId.isValid(poseId)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }
 
//   Category.findByIdAndUpdate(poseId, req.body, { new: true })
//     .then((updatedPose) => res.json(updatedPose))
//     .catch(error => res.json(error));
// });
 
 
// // DELETE  /api/poses/:poseId  -  Deletes a specific pose by id
// router.delete('/poses/:poseId', (req, res, next) => {
//   const { poseId } = req.params;
  
//   if (!mongoose.Types.ObjectId.isValid(poseId)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }
 
//   Category.findByIdAndRemove(poseId)
//     .then(() => res.json({ message: `Pose with ${poseId} is removed successfully.` }))
//     .catch(error => res.json(error));
// });

// module.exports = router;
