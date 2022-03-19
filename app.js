//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "I have been to Cananda since 2017, I have started study English at Douglas College. My English was realy bad, so I take longer time than usual to study English. After one and a half year I confused between two options; one is continue study accounting, the second is switching into computer science. I really like study computer science but I was worried that might be complicated, and I need to work so hard to cover my tuition fee. Otherwise, if I study accounting, it would be more easy, because I already studied accouting before in my home country. But finally, the curious about everything run behind the web and application is attracted me. I decided to study computer science. At some first begining courses, I was struggled with assignments. I did not know what going on in the class. I after every lecture in class I need to go to meet lab assistant to ask about assignment, I always bring the messy coding program and ask for debugging. That was very hard time to me, but then after 2 semester, I founded down the basic knowledge about coding, so some course after become easier. But some third-level was not easy one, I fail some courses. That was embarrasing. Now I nearly finish the program, I hope I can keep the spirit to continue and follow this field.";
const aboutContent = "Actually, just about me, I am Victoria Thi Tran. ";
const contactContent = "email: gamhongnd92@gmail.com || phone: 7789864229.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

app.get("/", function(req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
    });

});

app.get("/about", function(req, res) {
    res.render("about", { aboutContentPage: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactContentPage: contactContent });
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

// app.post("/compose", function(req, res) {
//     console.log(req.body.title);
// })

app.post("/compose", function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };

    posts.push(post);

    res.redirect("/");
});


app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            })
        }
    });
});






app.listen(3000, function() {
    console.log("Server started on port 3000");
});