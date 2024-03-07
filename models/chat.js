const mongoose = require("mongoose");

// chat schema = (_id,from (string) ,to (string) ,message (string) ,created_at (time, date) )

    const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        maxLength: 100,
    },
    created_at: {
        type: Date,
        required: true,
    },
    });

// Chat Model

    const Chat=mongoose.model("Chat",chatSchema);

    module.exports=Chat

