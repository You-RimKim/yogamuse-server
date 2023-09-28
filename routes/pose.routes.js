const router = require("express").Router();
// const mongoose = require("mongoose");

const Pose = require("../models/Pose.model");
const Category = require("../models/Category.model");

//  POST /api/poses  -  Creates a new pose
router.post("/poses", (req, res, next) => {
  const { id, english_name, sanskrit_name, pose_description, pose_benefits, url_png, category } = req.body;
  
  Pose.create({ id, english_name, sanskrit_name, pose_description, pose_benefits, url_png, category })
    .then(newPose => {
      console.log(newPose)
      return Category.findByIdAndUpdate(category, { $push: { poses: newPose._id } }, {new: true} );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

module.exports = router;
