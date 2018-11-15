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

async function connect () {
    await mongoose.connect(config.dbUrl());
    var db = await mongoose.connection;
    await db.on('error', console.error.bind(console, 'connection error: '));
    await db.once('open', async () => {
        await console.log("mongoose is connected successfully.");
    })
};

circleSchema.statics.create = async function(payload) {
    // circle === document, this === Model
    const circle = await new this(payload);
    await connect();
    await console.log("The circle is saved successfully!");

    return await circle.save();
};

circleSchema.statics.findOneByName = async function(name) {
    await connect();
    return await this.findOne({name});
};

circleSchema.statics.sendAll = async function () {
    await connect();
    return await this.find();
};

module.exports = mongoose.model('circle', circleSchema);