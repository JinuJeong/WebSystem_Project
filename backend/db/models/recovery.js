const { mongoose, autoIncrement} = require('../mongo')
const ttl = require('ttl')

const recoverySchema = mongoose.Schema({
    recoveryId : {type: Number, unique: true},
    kind : {type: String, required: true},
    removeTime : {type: Date, default: Date.now},
    },
    { strict: false });

// patientId 를 Auto Increment 필드로 지정
recoverySchema.plugin(autoIncrement, {
    model: 'recovery',
    field: 'recoveryId',
    startAt: 1
})

recoverySchema.index({ removeTime: 1 }, { expireAfterHours : 1 });




module.exports = mongoose.model("recovery", recoverySchema);

