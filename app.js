const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const port = 4000
const cors = require('cors')



app.use(cors({
    allowedHeaders: '*',
    allowMethods: '*',
    origin: '*'
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoute = require(`./router/userRouter`)
app.use(`/users`, userRoute)
const productRoute = require(`./router/productRouter`)
app.use(`/products`, productRoute)
const orderRoute = require(`./router/orderRouter`)
app.use(`/orders`, orderRoute)



mongoose.connect(`mongodb+srv://admin:admin@wdc028-course-booking.mgfy3.mongodb.net/ecommerce-website?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log(`Connected to MongoDB`))

app.listen(process.env.PORT || port, () => { console.log(`API now online on port ${process.env.PORT || port}`) })