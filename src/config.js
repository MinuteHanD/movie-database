const mongoose = require("mongoose");
const connectionString = "mongodb+srv://darbariamritanshu:eAGSTpVZ2zCph0rr@cluster0.pn30z.mongodb.net/basicdata?retryWrites=true&w=majority";

const connect = mongoose.connect(connectionString);

connect.then(() => {
    console.log("database connected successfully");
})
.catch(() => {
    console.log("database cannot be connected");
});

const LoginSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;