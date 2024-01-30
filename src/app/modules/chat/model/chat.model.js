const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    idReceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    firstName:{
        type:String
    },
    outgoingMessages: [{
        role:{
            type:String,
            default:"outgoingMessages"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        outgoingMessage: String,
        attachment: String,
        online:Boolean,
        updatedAt: {
            type: Date,
            default: Date.now
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        read: {
            type: Boolean,
            default: false
        },
    }, {
        _id: false
    }],
    // receiverId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    // incomingMessages: [{
    //     role:{
    //         type:String,
    //         default:"incomingMessages"
    //     },
        senderName: String,
    //     incomingMessage: String,
        attachment: String,
        updatedAt: {
            type: Date,
            default: Date.now
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        read: {
            type: Boolean,
            default: false
        },
        klickedMeter: {
            type: Number,
            default: 0
        },
    // }, {
    //     _id: false
    // }]

}, {
    timestamps: true,
    versionKey: false
});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = {
    Chat
};