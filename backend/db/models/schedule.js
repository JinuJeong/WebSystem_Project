const { mongoose, autoIncrement} = require('../mongo')

const scheduleSchema = mongoose.Schema({
    scheduleId: {type: Number, unique: true},
    content : {type: String, require: true},
    start : {type: Date, require: true},
    end : {type: Date, require: true},
    circle : {type: String}
});

// patientId 를 Auto Increment 필드로 지정
scheduleSchema.plugin(autoIncrement, {
    model: 'schedule',
    field: 'scheduleId',
    startAt: 1
})

module.exports = mongoose.model("shedule", scheduleSchema);

