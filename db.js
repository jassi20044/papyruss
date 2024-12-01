const mongoose = require("mongoose")

const uri = "mongodb+srv://jaspreetkamboj23cse:Jassi%402004@papyrus.izpid.mongodb.net/?retryWrites=true&w=majority&appName=Papyrus";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

const bookScema= new mongoose.Schema({
  name:String,
  descitption : String
})

const book = mongoose.model("books", bookScema);

const User = mongoose.model('User', userSchema)

module.exports = { User, uri }

