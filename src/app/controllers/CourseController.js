import Course from "../models/Course.js"
import mongooseObject from '../../util/mongoose.js'


class CourseController {

    //[Get] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course: mongooseObject.mongooseToObject(course)
                })
            })
            .catch(next)
    }
    //[Get] /course/:create
    create(req, res, next) {
        res.render('courses/create')
    }

    //[Post] /course/:store
    store(req, res, next) {


        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    //[Get] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', {
                    course: mongooseObject.mongooseToObject(course)
                })
            })
            .catch(next)

        //[Put] /course/:id
    }
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)

    }

    //[delete] /course/:id

    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

    //[delete] /course/:id/force

    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }
    //[patch] /course/:id/restore

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[post] /course/handleFormActions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Acction is invalid' })
        }

    }
    //[post] /course/trashHandleFormActions
    trashHandleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'permanently-deleted':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break

            default:
                res.json({ message: 'Acction is invalid' })
        }

    }
}

export default new CourseController()