const { mongoose, autoIncrement} = require('../mongo')
const userModel = require('./user')

const circleSchema = mongoose.Schema({
    auth: {type: Boolean, default: false},
    circleNum: {
        type: Number,
        unique: true
    },
    name: {type: String, unique: true, required: true},
    party: {type: String, required: true},
    roomExistence: {type: Boolean, required: true},
    roomLocation: {type: Number},
    president: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    professor: {type: String, required: true},
    memberNumber: {type: Number, required: true},
    members: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        circleAuth: {type: Boolean, default: false}
    }],
    concept: {type: String, required: true},
    introduce: {type: String, required: true},
    othersAccept: {type: Boolean, required: true},
});

circleSchema.plugin(autoIncrement, {
    model: 'circle',
    field: 'circleNum',
    startAt: 1
})

module.exports = mongoose.model("circle", circleSchema);

