const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    //email: {type: String, required: true, unique: true, lowercase: true},
    //password: {type: String, required: true, trim: true},
    name: {type: String, required: true},
    studentId: {type: String, required: true, unique: true, index: true},
    //birth: {type: Date, default: Date.now}
});

//methods는 document 단위
//statics는 collection 
userSchema.statics.create = function(payload) {
    // this === Model
    const user = new this(payload);

    console.log("The user is saved successfully!");

    return user.save();
};

userSchema.statics.findOneByName = function (name) {
    console.log("Find One is acted successfully!");
    return this.findOne({ name });
};
//user은 document가 사용할 collection의 단수 표현
//실제로는 'users' collection이다.
//model(name, schema, collection name)
module.exports = mongoose.model('user', userSchema); //export's' 조심하자.