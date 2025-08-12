import { GoogleGenAI } from "@google/genai";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { marked} from 'marked'

const app = express();
import promptBuilder from "./prompts/promptbuilder.js";
import masterPrompt from "./prompts/masterprompt.js";
dotenv.config();
app.use(cors());
app.use(express.json());

app.post('/gen',async(req,res)=>{
    console.log('New /gen request at:', new Date().toISOString());
  console.log(req.body.input)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY1
});

app.use(express.urlencoded({extended:true}))


async function main(prompt) {
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return (response.text.replace(/```(?:json)?\s*|```/g, ''));
}

 let syllabus = await main(masterPrompt(req.body.input));
let real = JSON.parse(syllabus)
console.log('completed writing syllabus')
const keys = [
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY2 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY3 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY4 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY5 }), 
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY6 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY7}),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY8 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY9 }), 
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY10 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY11 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY12 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY13 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY14 }),
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY15 })
];

  
const moduleTasks = real.map(async(obj,index)=>{
  const actualprompt = promptBuilder(obj);
  const indextouse = keys[index%keys.length];
 return indextouse.models.generateContent({
    model: "gemini-2.5-flash",
    contents: actualprompt,
  }).then((res)=>{
    return{
      index,
      answer:res.text.replace(/```(?:json)?\s*|```/g, '')
    }

  }).catch(err=>err.message)

});
const results = await Promise.all(moduleTasks)
let realmodules = {};
for(let i = 0;i<results.length;i++){
  let matter = results[i].answer;
  if(matter){
   let all_topics = matter.split(/(?=^##\s+)/gm)
   realmodules[`${i}`] = {
    index:i,
    topics:all_topics
   }
  }else{
    console.log('some error occured some where')
  }
}
console.log(realmodules);
const sizeInBytes = Buffer.byteLength(JSON.stringify(realmodules), 'utf8');
const sizeInKB = sizeInBytes / 1024;
console.log(`JSON size: ${sizeInKB.toFixed(2)} KB`);


res.send({
  realmodules,
  real
})
  
})


app.post('/chat',async(req,res)=>{
  console.log(req.body.input)
console.log(req.body.context);
    const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY1
});
let prompt = `Your an excellent professor who teaches anytopic very easily with real world appropriate examples with clear concept which makes user understand anything easily and you have to give preferrably very short answer unless the answer really take much then give short answer,the user has asked this question,only give explanation nothing else and you have to give your answer in markup language
  he was learning something related to this: ${req.body.context}
  this is users past history:${req.body.history};
  user query:${req.body.input}`
  async function main(prompt) {
    console.log('entered the main')
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text)
  return response.text;
}
let toreturn = await main(prompt)
res.json({answer:toreturn})
})

app.listen('8080',()=>{
    console.log('app is listening')
})