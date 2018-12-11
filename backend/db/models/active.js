const { mongoose, autoIncrement } = require('../mongo')

const activeSchema = mongoose.Schema({
    activeId: {type: Number, unique: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    start : {type: Date, required: true},
    end : {type: Date, required: true},
    contents : {type: String, required : true},
    image : {
        type : String,
    },
    circleName: {type: String},
    //postViews: {type: Number}
});

activeSchema.plugin(autoIncrement, {
    model: 'active',
    field: 'activeId',
    startAt: 1
})

module.exports = mongoose.model("active", activeSchema);