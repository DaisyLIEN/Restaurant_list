const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/' , (req, res) => {  
  res.render('index', { items: restaurantList.results })
})

app.get('/restaurants/:item_id', (req, res) => {
  const item = restaurantList.results.find( item => item.id.toString() === req.params.item_id)
  res.render('show', { item: item })
})

app.get('/search', (req,res) => {
  const keyword = req.query.keyword
  const items = restaurantList.results.filter(item => item.category.toLowerCase().includes(keyword.toLowerCase()) || item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { items: items, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})