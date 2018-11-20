const mongoose = require('mongoose');
const config = require('./config');

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

//Set mongoose connect
function connect () {
    mongoose.connect(config.dbUrl());
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
        console.log("mongoose is connected successfully.");
    })
};

//Create circle
circleSchema.statics.circlecreate = async function(payload, res) {
    const circle = await new this(payload);
    await connect();

    return circle.save();
};

//Find a circle by name
circleSchema.statics.circlefind = async function(name) {
    await connect();
    return await this.findOne({name});
};

//Send all circles
circleSchema.statics.circlesendAll = async function () {
    await connect();
    return await this.find();
};

//module exports to Routers ★★★★★★★★★★★★

module.exports = mongoose.model("circle", circleSchema);

