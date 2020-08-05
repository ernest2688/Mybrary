if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config() 
}

//import express package
const express = require('express')
//get the app portion
const app = express()
//import express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')



//set view engine
app.set('view engine','ejs')
//set where are views from
app.set('views',__dirname + '/views')
//hook up express latouts, set where the layout files are
app.set('layout','layouts/layout')
//tell the express that we want to use the layout
app.use(expressLayouts)
//tell where are the public files are
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit : '10mb'  ,extended : false}))
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',error => console.erroe(error))
db.once('open',() => console.log('Connected to Mongoose'))



app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT||3000)