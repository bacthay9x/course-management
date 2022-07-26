import express from 'express'
import morgan from 'morgan'
import { engine } from 'express-handlebars';
import path from 'path'
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import db from './config/db/index.js'
import methodOverride from 'method-override'
import sortMiddleware from './app/middlewares/SortMiddleware.js';
import helpers from './helpers/handlebars.js'

//Connect to DB
db.connect()


const app = express()
const port = 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Use static folder

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(methodOverride('_method'))

// custom middlewares
app.use(sortMiddleware)

//Http logger
app.use(morgan('combined'))

//template engine
app.engine('hbs', engine({
    extname: 'hbs',
    helpers: {
        sum: helpers.sum,
        sortable: helpers.sortable
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})