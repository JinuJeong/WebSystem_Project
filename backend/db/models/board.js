const {mongoose} = require('../mongo')

const boardSchema = mongoose.Schema({
   // postNum: {type: Number, unique: true},
    title: {type: String, require: true},
    contents: {type: String, require: true},
    author: {type: String, require: true},
    date: {type:  Date, default: Date.now},
    //postViews: {type: Number}
});

module.exports = mongoose.model("board", boardSchema);