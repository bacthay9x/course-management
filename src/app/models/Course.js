import mongoose from "mongoose";
import slug from 'mongoose-slug-generator'
import mongooseDelete from 'mongoose-delete'


const Schema = mongoose.Schema;


const Course = new Schema({

    name: { type: String, require: true },
    description: { type: String, },
    image: { type: String, },
    slug: { type: String, slug: 'name' },
    videoId: { type: String, require: true, unique: true },
    level: { type: String, require: true },



}, {

    timestamps: true
});
//Custom query helpers
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this
}



//Add pligins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

export default mongoose.model('Course', Course)