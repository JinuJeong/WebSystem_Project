const { mongoose, autoIncrement } = require('../mongo')

const boardSchema = mongoose.Schema({
    postNum: {type: Number, unique: true},
    title: {type: String, require: true},
    contents: {type: String, require: true},
    author: {type: String, require: true},
    date: {type: Date, default: Date.now},
    postType: {type: String}, //true: Board, false: Notice
    circleName: {type: String}
    //postViews: {type: Number}
});

boardSchema.plugin(autoIncrement, {
    model: 'board',
    field: 'postNum',
    startAt: 1
})

module.exports = mongoose.model("board", boardSchema);