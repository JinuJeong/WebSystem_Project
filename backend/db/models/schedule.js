const { mongoose} = require('../mongo')

const scheduleSchema = mongoose.Schema({
    title: {type: String, require: true},
    contents: {type: String, require: true},
    date : {type: Date, require: true},
    circle : {type: String}
});


module.exports = mongoose.model("shedule", scheduleSchema);

