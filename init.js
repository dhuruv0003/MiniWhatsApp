// By default when no operation is done , we initialise the database with some initial values.... These values are written in init.js

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/whatsApp");
}
main()
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err.errors));

let allchats = [
  {
    from: "Dhuruv",
    to: "gaurav",
    msg: "Aaj Mausam bada Beiman hai bada",
    created_at: new Date(),
  },
  {
    from: "Rajeev",
    to: "bhairav",
    msg: "sab log bade Beiman hai bada",
    created_at: new Date(),
  },
  {
    from: "nonnu",
    to: "dhuruv",
    msg: "Koi pagal samajhta hai koi insan",
    created_at: new Date(),
  },
  {
    from: "birju",
    to: "billu",
    msg: "Aur billu bhai kaise hoooo",
    created_at: new Date(),
  },
  {
    from: "rajkumar",
    to: "deepak",
    msg: "Aaj Mausam bada Beiman hai bada",
    created_at: new Date(),
  },
  {
    from: "Gambhir",
    to: "MSDhoni",
    msg: "Aaj Mausam bada Beiman hai bada",
    created_at: new Date(),
  },
];

Chat.insertMany(allchats);
