const express = require("express");
const app = express();
const https = require("https");
const ejs=require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));
const Bodyparser=require("body-parser");
app.use(Bodyparser.urlencoded({extended:true}));
const details={
    city:"",
    country:"",
    temp:"",
    desc:"",
    icon:""
}


app.get("/",function(req,res){
    res.render("list")
})
app.get("/weather",function(req,res){
    res.render("res",{city:details.city,description:details.desc,temp:details.temp,icon:details.icon,country:details.country});

})
app.post("/",function(req,res) {
    const city_name=(req.body.city);
    const country=(req.body.country);
    url = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+","+country+"&appid=7443b01bf3fbbb43f5d33b6ba67956f8&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const WeatherData = JSON.parse(data);
            const temp=(WeatherData.main.temp);
            const description=(WeatherData.weather[0].description);
            const id=WeatherData.weather[0].icon
            console.log(id);
            const icon="http://openweathermap.org/img/wn/"+id+"@2x.png";
            
            details.city=city_name;
            details.country=country;
            details.temp=temp;
            details.desc=description;
            details.icon=icon;
            res.redirect("/weather");

        })
        
    })


})




app.listen(3000, function () {
    console.log("Server 3000 is running");
})