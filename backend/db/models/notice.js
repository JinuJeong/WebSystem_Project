const { mongoose} = require('../mongo')

const noticeSchema = mongoose.Schema({
    title: {type: String, require: true},
    contents: {type: String, require: true},
    date : {type: Date, default: Date.now},
    author : {type: String, require: true}
});


module.exports = mongoose.model("notice", noticeSchema);

