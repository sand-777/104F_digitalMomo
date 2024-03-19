const catchAsync = require("../../Services/catchAsync");
const { getMyReviews, deleteReview, createReview } = require("../../controller/user/review/reviewController");

const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = require("express").Router();
router.route("/").get(isAuthenticated,catchAsync(getMyReviews))

router
  .route("/:id")
  .delete(isAuthenticated,catchAsync(deleteReview))
  .post(isAuthenticated,restrictTo("user"), catchAsync(createReview))

module.exports = router;
