

import Course from "../models/Course.js"
import mongooseObject from '../../util/mongoose.js'


class MeController {

    //[Get] /me/stored/Courses
    storedCourses(req, res, next) {

        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mongooseObject.mutipleMongooseToObject(courses)
                }))
            .catch(next)


    }
    //[Get] /me/trash/Courses

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mongooseObject.mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

export default new MeController()