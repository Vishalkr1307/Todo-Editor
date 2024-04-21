// 

const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    verifya:{type:Boolean, default:false},
    isPremium:{type:Boolean, default:false},  
},{
    versionKey:false,
    timestamps:true,
})
userSchema.pre("save",function(next){
    if(!this.isModified("password")) return next()
    this.password=bcrypt.hashSync(this.password,8)
    next()
})
userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password)

}

module.exports=mongoose.model("User",userSchema)

// const { ObjectId } = require("mongodb")
// const {getDb}=require("../config/db")
// const bcrypt=require("bcrypt")

// class User{
//     constructor(name, email, password){
//         this.name = name
//         this.email = email
//         this.password = bcrypt.hashSync(password,8)
//     }
//     save(){
//         const database=getDb()
//         database.collection("users").insertOne(this)
//     }
//     static findOne(data){
//         const database=getDb()
//         return database.collection("users").findOne(data)

//     }
//     static findAll() {
//         const database=getDb()
//         return database.collection("users").find().toArray().then((user)=>user)
//     }
//     static findById(id) {
//         const database=getDb()
//         return database.collection("users").findOne({_id:new ObjectId(id)})

//     }
//     static findByIdAndUpdate(id,data){
//         const database = getDb();
 
//         return database.collection("users").updateOne({_id:new ObjectId(id)},{$set:data}).then((product)=>product)
 
 
//      }
//      static findByIdAndDelete(id) {
//          const database = getDb();
     
//          return database.collection("users").deleteOne({ _id: new ObjectId(id) });
//      }
// }

// module.exports = User
