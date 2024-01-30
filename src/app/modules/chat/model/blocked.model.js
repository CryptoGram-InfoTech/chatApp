const mongoose = require("mongoose");


const BlockedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blockedUser:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, {
    timestamps: true,
    versionKey: false
});

var Blocked = mongoose.model("Blocked", BlockedSchema);

module.exports = {
    Blocked
};