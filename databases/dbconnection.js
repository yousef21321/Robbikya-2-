import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/sara7ac411').then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}