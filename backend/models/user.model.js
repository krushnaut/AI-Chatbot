import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6, 'email must be at least 6 characters'],
        maxlength:[50, 'email must be at most 50 characters'],
        lowercase:true,
        trim:true
    },

    password:{  
        type:String,
        required:true,
        select:false,
        minlength:5
    }

});

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({email: this.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

const User = mongoose.model('user', userSchema);

export default User;
