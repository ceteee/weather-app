//Always load the core node module before NPM module
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const publicdirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicdirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Christian T'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Christian T'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Christian'
    })
})

// app.get('/help', (req, res) => {
    
// })




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide valid address'
        })
    }

geocode(req.query.address, (error, data) => {
    if (error) {
        return res.send({error : error})
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return res.send({error : error})
        }


        res.send({
            forecast: forecastData,
            location: data.location,
            address: req.query.address
        })
    })
     
})



    // res.send({
    //     forecast: 'it is raining out there',
    //     location: 'sibolga',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide valid term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christian T',
        erroMessage: 'Page not found'
    })

})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christian T',
        erroMessage: 'Page not found'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christian T',
        erroMessage: 'Page not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})