// Express library exposes a single function
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// const { render } = require("express/lib/response");
//Express function doesn't take any argument
//When we will call express it will return methods, which will be stored in app, which we can then use to set up our server

const app = express();
const port = process.env.PORT || 3000;

console.log("Dir name ---- ", __dirname);
console.log("File name ---- ", __filename);

//Define paths for express config.
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// const aboutPath = path.join(__dirname, "public/about.html");
// const helpPath = path.join(__dirname, "public/help.html");

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars engine and views location
app.set("view engine", "hbs");

// If we are not providing a views folder we need to tell express explicitly where it needs to look up using the set method as shown below
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// app.use(express.static(aboutPath));
// app.use(express.static(helpPath));

//Function describes what will happen if the user will type a particular route.
// app.get("", (req, res) => {
//   res.send("<h1>Hello express!</h1>");
// });

app.get("/help", (req, res) => {
  res.send({
    name: "Tony",
    age: 33,
  });
});

// app.get("/about", (req, res) => {
//   res.send("<h2>About page</h2>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Please enter an address in the query string.",
    });
  } else {
    geocode(req.query.address, (error, response) => {
      if (error) {
        res.send({
          error,
        });
      } else {
        const { latitude, longitude, location } = response;
        // console.log(latitude + " " + longitude);
        forecast(latitude, longitude, (error, response) => {
          if (error) {
            res.send({
              error,
            });
          } else {
            res.send({ ...response, location });
          }
        });
      }
    });
    // res.send({ forecast: "Sunny", location: req.query.address });
  }
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aayush Sood",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Aayush Sood",
  });
});
app.get("/helptwo", (req, res) => {
  res.render("helptwo", {
    title: "The title",
    name: "Aayush Sood",
  });
});

app.get("/helptwo/*", (req, res) => {
  res.render("error", {
    error: "Help article not found",
  });
});

//This path is provided to show error message if the user types some other url that is not defined buy us.
//Also this needs to come last after declaring all the paths.
//This is a wild card handler and this tells us that everything is a match that is why it should be placed at the end of all the routes if we place it above some route it will get matched by the path before the other routes and the other routes will be ignored and even if the user types a correct route name it's page will still be not displayed.
app.get("*", (req, res) => {
  res.render("error", {
    error: "Page not found.",
  });
});

//---Route One---
//app.com

//---Route Two---
//app.com/help

//---Route Three---
//app.com/about

app.listen(port, () => {
  console.log("Server is up on port ", port);
});
