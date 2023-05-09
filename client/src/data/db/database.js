import mongoose from "mongoose"

export const connect = () => {
    mongoose.connect(
        process.env.REACT_APP_MONGO_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
}

