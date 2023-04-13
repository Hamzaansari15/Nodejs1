import mongoose from "mongoose";


const ConnectMongoDB = async (url) => {
    return mongoose.connect(url)
}

export default ConnectMongoDB;