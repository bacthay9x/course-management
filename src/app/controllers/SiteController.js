import Course from "../models/Course.js"
import mongooseObject from '../../util/mongoose.js'


class SiteController {
    // [Get] /
    index(req, res, next) {
        Course.find({})
            .then(courses => {

                res.render('home', {
                    courses: mongooseObject.mutipleMongooseToObject(courses)
                })
            })
            .catch(next)

        // res.render('home')
    }
    //[Get] /search
    search(req, res) {
        res.render('search')
    }
}

export default new SiteController()