import router from './news.js'
import siteRouter from './site.js'
import coursesRouter from './courses.js'
import meRouter from './me.js'

function route(app) {
    app.use('/me', meRouter)
    app.use('/news', router)
    app.use('/courses', coursesRouter)

    app.use('/', siteRouter)





}
export default route
