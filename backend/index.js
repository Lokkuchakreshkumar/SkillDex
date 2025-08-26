import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "./models/User.js";
import ensureAuth from "./ensure.js";
import { convert } from 'html-to-text'

const app = express();
app.set('trust proxy', 1);
let env = 'production'
import promptBuilder from "./prompts/promptbuilder.js";
import masterPrompt from "./prompts/masterprompt.js";
import passport from "passport";
import session from "express-session";
dotenv.config();
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",      
  "https://myskilldex.vercel.app", 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}


app.use(express.json());
app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure:true,
    },
  })
);
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
async function fn() {
  try {
    await User.updateMany({ isGenerating: true }, { isGenerating: false });
  } catch (error) {
    console.log('failed and error is : ' + error)
  }
}

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {

  let founduser = await User.findOne({ _id: id });
  console.log("Found user:");
  return done(null, founduser);
});
let call;
if(env == 'production'){
  call ='https://skilldex.onrender.com/auth/google/callback'
}else{
  call = 'http://localhost:8080/auth/google/callback'
}
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: call,
    },
    async function (accessToken, refreshToken, profile, done) {
      let newuser = await User.findOne({ googleId: profile.id });
      try {
        if (newuser) {
          console.log("user exists");
          return done(null, newuser);
        } else {
          let verynew = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePic: profile.photos[0].value,
          });
          return done(null, verynew);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
app.post("/update", async (req, res) => {
 console.log('in update route')
  try {
    req.user.questions = req.body;

    req.user.question_done = true;
    await req.user.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("Authentication successful!");
    if (req.user.question_done) {
        if(env == 'production'){
       res.redirect("https://myskilldex.vercel.app/");
     }
     else{
      res.redirect('http://localhost:5173/')
     }
    } else {
     if(env == 'production'){
       res.redirect("https://myskilldex.vercel.app/info");
     }
     else{
      res.redirect('http://localhost:5173/info')
     }
    }
  }
);
app.get("/courses/:id", ensureAuth, async (req, res) => {
  console.log("id speaking");
  const courseid = req.params.id
  console.log('triggered')
  if (req.user) {
    const user = await User.findOne({ _id: req.user._id, "courses._id": courseid }, { "courses.$": 1 });
    res.send(user.courses[0]);
  } else {
    res.status(404).send("sorry we are unavailable now")
  }
})
app.post("/gen", async (req, res) => {
  if (req.user) {
    let user_status = await User.findById(req.user._id);
    if (!user_status.isGenerating) {
      console.log("New /gen request at:", new Date().toISOString());
      console.log(req.body.input);
      user_status.isGenerating = true;
      await user_status.save();
     let courses = user_status.courses;
     for(let i = 0;i<courses.length;i++){
      if(courses[i].name === req.body.input){
        console.log('copy found');
        user_status.isGenerating = false;
        await user_status.save();
        return res.json({copy:true});
        
      }
     }
       try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY1,
        });

        async function main(prompt) {
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });
          return response.text.replace(/```(?:json)?\s*|```/g, "");
        }

        let syllabus = await main(masterPrompt(req.body.input));
        let real = JSON.parse(syllabus);
        console.log("completed writing syllabus");
        const keys = [
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY2 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY3 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY4 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY5 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY6 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY7 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY8 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY9 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY10 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY11 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY12 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY13 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY14 }),
          new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY15 }),
        ];

        const moduleTasks = real.map(async (obj, index) => {
          const actualprompt = promptBuilder(obj, user_status.questions);
          console.log('this is actual prompt' + actualprompt);
          const indextouse = keys[index % keys.length];
          return indextouse.models
            .generateContent({
              model: "gemini-2.5-flash",
              contents: actualprompt,
            })
            .then((res) => {
              return {
                index,
                answer: res.text.replace(/```(?:json)?\s*|```/g, ""),
              };
            })
            .catch((err) => err.message);
        });
        const results = await Promise.all(moduleTasks);
        let realmodules = {};
        for (let i = 0; i < results.length; i++) {
          let matter = results[i].answer;
          if (matter) {
            let all_topics = matter.split(/(?=^##\s+)/gm);
            realmodules[`${i}`] = {
              index: i,
              topics: all_topics,
            };
          } else {
            console.log("some error occured some where");
          }
        }
        console.log(realmodules);
        const sizeInBytes = Buffer.byteLength(JSON.stringify(realmodules), "utf8");
        const sizeInKB = sizeInBytes / 1024;
        console.log(`JSON size: ${sizeInKB.toFixed(2)} KB`);
        if (req.user) {


          user_status.courses.push({
            name: req.body.input,
            syllabus: JSON.stringify(real),
            content: JSON.stringify(realmodules)
          });
          await user_status.save();
        }
        res.send({
          realmodules,
          real,
        });
      } catch (err) {
        console.log(err)
        user_status.isGenerating = false;
        await user_status.save();
      } finally {
        user_status.isGenerating = false;
        await user_status.save();
      }
    } else {
      res.json({ stop: true });
    }
  }
});

app.get("/", (req, res) => {
  if (!req.user) {
    return res.json({ user: null });
  }
  res.json({ user: req.user });
});
app.post("/chat", async (req, res) => {
  console.log(req.body.input);
  console.log(req.body.context);
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY1,
  });
  let prompt = `Your an excellent professor who teaches anytopic very easily with real world appropriate examples with clear concept which makes user understand anything easily and you have to give preferrably very short answer unless the answer really take much then give short answer,the user has asked this question,only give explanation nothing else and you have to give your answer in markup language
  he was learning something related to this: ${req.body.context}
  this is users past history:${req.body.history};
  user query:${req.body.input}`;
  async function main(prompt) {
    console.log("entered the main");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    console.log(response.text);
    return response.text;
  }
  let toreturn = await main(prompt);
  res.json({ answer: toreturn });
});
app.post('/dashboard', async (req, res,next) => {
  res.send('dashboard')
})
app.get('/logout',async(req,res)=>{
if(req.user){
  req.logout((err)=>{
    if(err){
      console.log(err);
      return next(err);
    }
    res.json({logout:true});
  })
}
});
app.post('/quiz', async (req, res) => {
  console.log(req.body.content)
  const text = convert(req.body.content)
  const keys = [
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY2 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY3 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY4 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY5 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY6 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY7 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY8 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY9 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY10 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY11 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY12 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY13 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY14 }),
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY15 }),
  ];
  let index = Math.floor(Math.random() * keys.length)
  let quiz_prompt = `Your an quiz generator based on the content given to you ,you generate at max 5 questions in json format 
format:
[
  {
    "question": "What is xyz?",
    "options": [
      { "text": "x", "isCorrect": false },
      { "text": "y", "isCorrect": false },
      { "text": "z", "isCorrect": false },
      { "text": "xyz", "isCorrect": true }
    ]
  },
  {
    "question": "Which language runs in a browser?",
    "options": [
      { "text": "Python", "isCorrect": false },
      { "text": "Java", "isCorrect": false },
      { "text": "C++", "isCorrect": false },
      { "text": "JavaScript", "isCorrect": true }
    ]
  }
]


Generate quiz on this topic: ${text}`
  console.log(index)
  let model = keys[index]
  const response = await model.models.generateContent({
    model: "gemini-2.5-flash",
    contents: quiz_prompt,
  });

  res.send(response.text.replace(/```(?:json)?\s*|```/g, ""))
})



app.listen("8080", async () => {

  await main(); await fn();
  console.log("app is listening");
});


