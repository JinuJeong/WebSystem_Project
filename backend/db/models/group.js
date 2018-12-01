const { mongoose, autoIncrement} = require('../mongo')

const groupSchema = mongoose.Schema({
    groupId: {type: Number, unique: true},
    title: {type: String, required: true},
    contents : {type: String, required: true},
    start : {type: Date, required: true},
    end : {type: Date, required: true},
    circleName : {type: String},
    groupType : {type: String},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    memberNumber: {type: Number, default: "1"},
    maxNumber: {type: Number},
});

// patientId 를 Auto Increment 필드로 지정
groupSchema.plugin(autoIncrement, {
    model: 'group',
    field: 'groupId',
    startAt: 1
})

module.exports = mongoose.model("group", groupSchema);

