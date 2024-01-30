const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    firstName:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        required:true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});


var chatOnlineUser = mongoose.model("chatOnlineUser", ChatSchema);

module.exports = {
    chatOnlineUser
};