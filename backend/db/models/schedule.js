const { mongoose} = require('../mongo')

const scheduleSchema = mongoose.Schema({
    content : {type: String, require: true},
    start : {type: Date, require: true},
    end : {type: Date, require: true},
    circle : {type: String}
});


module.exports = mongoose.model("shedule", scheduleSchema);

