const path    = require('path')
const express = require('express')
const hbs     = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app =express()

//Define path for express config 
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather APP',
        name  : 'Kautuk kashyap'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title : "Help Page",
        msg   :  "For help click here",
        name  : "Kautuk kashyap"
    })
})


app.get('/about',(req,res) =>{
    res.render('about',{
        title  : 'About Page',
        name   : 'Kautuk Kashyap'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if(error){
            return res.send({error : error})
         }
         console.log("location:::",location)
         forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error: error})
            }
            res.send({
                location : req.query.address,
                forecast : forcastData
            })
         })
         
    })
    // res.send({
    //     location : req.query.address,
    //     forecast : 'Will be added Later on '
    // })
})

app.get('/products',(req,res)=>{
   if(!req.query.search){
       return res.send({
           error : "You must provide a serach term"
       })
   }

    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title : '404 ',
        name : 'Kautuk Kashyap',
        errorMsg : 'Help Article Not Found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title : '404 ',
        name : 'Kautuk Kashyap',
        errorMsg : 'Page not found'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000')
})
