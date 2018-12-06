const { mongoose, autoIncrement} = require('../mongo')
const userModel = require('./user')

const circleSchema = mongoose.Schema({
    circleNum: {
        type: Number,
        unique: true
    },
    name: {type: String, unique: true},
    party: {type: String},
    roomExistence: {type: Boolean},
    roomLocation: {type: Number},
    president: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    vicePresident: {type: mongoose.Schema.Types.ObjectId},
    professor: {type: String},
    memberNumber: {type: Number},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    concept: {type: String},
    introduce: {type: String},
    othersAccept: {type: Boolean}
});

circleSchema.plugin(autoIncrement, {
    model: 'circle',
    field: 'circleNum',
    startAt: 1
})

module.exports = mongoose.model("circle", circleSchema);

