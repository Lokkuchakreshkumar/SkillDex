import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isGenerating:{
    type:Boolean,
    default:false
  },
  googleId: {
    type: String,
    required: true,
  },
  profilePic:{
    type:String
  },
  courses:[
    {
      name:{
        type:String,
        required:true
      },
      syllabus:{
        type:String
      },
      content:{
        type:String
      }
    }
  ],
  questions: {
    
    purpose: {
      type: String,
      default:''
    },
    learnStyle: {
      type: String,
      default:''
    },
    speed: {
      type: String,
      default:''
    },
    exampleType: {
      type: String,
      default:''
    },
    outcome: {
      type: String,
      default:''
    },
  },
  question_done:{
    type:Boolean,
    default:false
  }
});
const User = mongoose.model("User", userSchema);
export default User;
