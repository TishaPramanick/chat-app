const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/ChitChat";
const dbConnect = async()=>{
    try {
        const conn = await mongoose.connect(DB_URL);
        console.log("Database Connection Established!! " + conn.connection.host);
    } catch (error) {
        console.log("Database Error : "+ error.message);
        process.exit(0);
    }
}


class Connect{
    db_path = "mongodb://127.0.0.1:27017/";
    db_name = "ChitChat";
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(this.db_path + this.db_name)
        .then((con)=>{
            console.log("Database Connected!!" + con.connection.host);
        })
        .catch((e)=>{
            console.log("Database Connection Error" + e);
            process.exit(0);
        });
    }
}
module.exports = new Connect();