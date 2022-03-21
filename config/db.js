import { connect } from "mongoose";
const database = process.env.DB;
const password = process.env.PASSWORD;

const connectDB = async() => {
    try {
        const connection = connect(`mongodb+srv://anadi45:${password}@cluster0.klhde.mongodb.net/${database}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log(`Database connected succesfully:${connection}`);

    } catch (error) {
        console.error(error);
    }
}

exports = module.exports = connectDB;