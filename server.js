const express = require('express')
const mongoose = require('mongoose') 
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const url = "mongodb://localhost:27017/blog"


  mongoose.connect(url, {useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
  })


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))

app.use(methodOverride('_method'))

app.get('/', async (req,res)=>{
  const articles = await Article.find().sort({
    createdAt: 'desc' })

  res.render('articles/index', {articles: articles})  
})

app.use('/articles', articleRouter)
app.listen(5000)