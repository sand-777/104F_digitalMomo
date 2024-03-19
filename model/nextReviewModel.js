const mongoose = require("mongoose")
const Schema = mongoose.Schema

// userId,productId,rating(Number),message
const reviewSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true,"A review must belong to user"]
    },
    rating : {
        type : Number,
        required : true,
        default : 3
    },
    message : {
        type : String,
        required : true
    }
})

const NextWayReview = mongoose.model("NextWayReview",reviewSchema)
module.exports = {
    NextWayReview,
    reviewSchema
}