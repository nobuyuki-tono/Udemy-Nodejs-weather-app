const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//console.log(path.join(__dirname, "../public"));

const app = express();

// Define path for express cinfig
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Andrew Mead",
    arr: ["one", "two", "three"],
    objArr: [
      {
        name: "John"
      },
      {
        name: "Sara"
      }
    ]
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    msg: "Please read a instruction carefully",
    name: "Andrew Mead"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Andrew Mead"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address to get your weather data!!!"
    });
  }

  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send({
        error: "Error couldn't fine a locatiion"
      });
    }

    forecast(data.latitude, data.longtitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: "Error couldn't fine a locatiion"
        });
      }

      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You mus provide a search terms"
    });
  } else {
    console.log(req.query.search);

    res.send({
      products: []
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "Help page not found 404 !!!",
    name: "Andrew Mead"
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 page not found",
    name: "Andrew Mead"
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, console.log("Server is running on port 3000"));
