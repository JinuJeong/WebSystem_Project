const { mongoose, autoIncrement } = require('../mongo')
const userModel = require('./user')

const newActiveSchema = mongoose.Schema({
    activeId: {type: Number, unique: true},
    title: {type: String, required: true},
    start : {type: Date, required: true},
    end : {type: Date, required: true},
    contents : {type: String, required: true},
    image : { type: String },
    circleName: {type: String},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
});

const activeSchema = mongoose.Schema({
    activeList: [newActiveSchema]
})

activeSchema.plugin(autoIncrement, {
    model: 'active',
    field: 'activeId',
    startAt: 1
})

module.exports = mongoose.model("active", activeSchema);