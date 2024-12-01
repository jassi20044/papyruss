const express = require ("express");
const path = require ("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const { User, uri } = require("./db")

let app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")))
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cookieParser())

app.get("/", (_, res) => {
    app.set({
        "Allow-access-Allow-Origin": "*"
    });
    res.sendFile(path.join(__dirname, "public/index.html"))
});
app.get("/signup", (req, res) => {
    app.set({
        "Allow-access-Allow-Origin": "*"
    });
    res.sendFile(path.join(__dirname, "public/Create.html"))
})
app.post("/signup", async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    })
    newUser.save()
        .then(() => {
            // res.cookie("authenticated", "true")
            res.redirect("/login")
        }).catch((err) => {
            console.log(err)
            res.redirect("/signup")
        })
})

app.get("/login", (_, res) => {
    res.sendFile(path.join(__dirname, "public/account.html"))
})
app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email, password: password })
        .then((r) => {
            console.log("login", r)
            if (r !== null) {
                res.cookie("authenticated", "true")
                res.redirect("/")
            } else {
                res.redirect("/login")
            }
        })
})

// Check if the user is logged in or not
app.get('/protected', (req, res) => {
    res.json({authenticated: (req.cookies.authenticated === "true") ? true : false})
});

app.listen("3000", ()=>{
    console.log('connected...');
    console.log(path.join(__dirname, "public"));
});
