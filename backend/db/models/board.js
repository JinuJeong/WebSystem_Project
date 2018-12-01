const {mongoose} = require('../mongo')

const boardSchema = mongoose.Schema({
   // postNum: {type: Number, unique: true},
    postTitle: {type: String, require: true},
    postContent: {type: String, require: true},
    postWriter: {type: String, require: true},
    postDate: {type:  Date, default: Date.now},
    //postViews: {type: Number}
});

module.exports = mongoose.model("board", boardSchema);