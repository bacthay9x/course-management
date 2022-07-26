import mongoose from "mongoose"

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('connect successfully')

    } catch (error) {
        console.log('connect fail')

    }

}
export default { connect }