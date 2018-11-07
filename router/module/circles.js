const mongoose = require('mongoose');
const config = require('./config');

const Schema = mongoose.Schema;
const circleSchema = new Schema({
    name: {type: String},
    party: {type: String},
    roomExistence: {type: Boolean},
    roomLocation: {type: Number},
    president: {type: mongoose.Schema.Types.ObjectId},
    vicePresident: {type: mongoose.Schema.Types.ObjectId},
    memberNumber: {type: Number},
    subject: {type: String},
});

function connect () {
    mongoose.connect(config.dbUrl());
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
        console.log("mongoose is connected successfully.");
    })
};

circleSchema.statics.create = function(payload) {
    // circle === document, this === Model
    const circle = new this(payload);

    console.log("The circle is saved successfully!");

    return circle.save();
};

circleSchema.statics.findOneByName = function(name) {
    console.log("Find One is acted successfully!");
    return this.findOne({name});
};

module.exports = mongoose.model('circle', circleSchema);