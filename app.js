const express= require("express");
const app= express("app");
const bodyParser=require("body-parser");
app.use(express.static(__dirname +'/styles.css'));
const https= require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res)
{

  res.sendFile(__dirname+"/index.html");

})

app.post("/" , function(req,res)
{

  console.log(req.body.cityname);
  console.log("its done");



  const city= req.body.cityname;
const key= "b91477fe544e16f0902b4b4a4fb0253f";


const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric";

https.get(url , function(response)
{
    console.log("the status code is " + response.statusCode);
  
    response.on("data" ,function(data)
    {
        
    const data1 = JSON.parse(data);
    const go=data1.main.temp
       console.log("The tempature in delhi is " + go);
       const weatherdes = data1.weather[0].description
       console.log(weatherdes);
        res.write(" <body><h1> The temprature in "+ req.body.cityname+" is  " + go + " degree/celsius");
        res.write (" <br>     and the weather description is <em> " + weatherdes + " </em> which is great </h1>");
        const img= data1.weather[0].icon
        res.write("<img src=http://openweathermap.org/img/wn/"+ img+"@2x.png></body>");

      res.send();
       
    })
})

})


////////////////////\\\\\\\\\\\\\\\\\

app.listen(process.env.PORT||3000, function()
{
    console.log("chalgyaa o shera");

})