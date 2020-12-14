const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();
const port = process.env.PORT || 3000

//Paths for express
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs');
app.set('views', viewsPath)

app.get('', (req, res)=>{
    res.render("index", {
        title: "Home",
        name: "Ethan Cannelongo"
    })
})  

app.get('/about', (req, res)=>{
    res.render("about", {
        title: "About me",
        name: "Ethan Cannelongo"
    })
})  

app.get('/help', (req, res)=>{
    res.render("help", {
        title: "Help page",
        name: "Ethan Cannelongo",
        msg: "Just look for a location, and get the weather!"
    })
})  

app.get('/weather', (req, res)=>{
    const addressQuery = req.query.address

    if(!addressQuery){
        return res.send({
            error:"An address needs to be provided."
        })
    }
    geocode(addressQuery, (error, {latitude, longitude, place_name}={})=>{

        if (error){ return res.send({error}) }
    
        forecast(latitude, longitude, (error, forcastSummary)=>{
    
            if (error){ return res.send({error}) }

            res.send({
                forecast: forcastSummary,
                place_name,
                query: addressQuery
            })
    
        })
    }) 


    
})

app.get('/help/*', (req, res)=>{
    res.render("404", {
        errMsg: "Help article not found!",
        title: "OUCH! 404",
        name: "Ethan Cannelongo"
    })
})


app.get('*', (req, res)=>{
    res.render("404", {
        errMsg: "Page not found.",
        title: "OUCH! 404",
        name: "Ethan Cannelongo"
    })
})


app.listen(port, ()=>{
    console.log("Listening on 3000")
})