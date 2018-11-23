const { mongoose} = require('../mongo')

const circleSchema = mongoose.Schema({
    name: {type: String, unique: true},
    party: {type: String},
    roomExistence: {type: Boolean},
    roomLocation: {type: Number},
    president: {type: mongoose.Schema.Types.ObjectId},
    vicePresident: {type: mongoose.Schema.Types.ObjectId},
    memberNumber: {type: Number},
    subject: {type: String},
});


module.exports = mongoose.model("circle", circleSchema);

