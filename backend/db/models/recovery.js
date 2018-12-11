const { mongoose, autoIncrement} = require('../mongo')
const ttl = require('ttl')

const recoverySchema = mongoose.Schema({
    recoveryId : {type: Number, unique: true},
    createdAt: { type: Date, default: Date.now, expires: '5s' }
},{ strict: false },{
    timestamps: true
  });

// patientId 를 Auto Increment 필드로 지정
recoverySchema.plugin(autoIncrement, {
    model: 'recovery',
    field: 'recoveryId',
    startAt: 1
})



module.exports = mongoose.model("recovery", recoverySchema);

