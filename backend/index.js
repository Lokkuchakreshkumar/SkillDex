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

app.get('/new',async(req,res)=>{
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY1
});




async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return (response.text.replace(/```(?:json)?\s*|```/g, ''));
}

 let syllabus = await main(masterPrompt);
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
console.log(realmodules["1"].index[1]);
const sizeInBytes = Buffer.byteLength(JSON.stringify(realmodules), 'utf8');
const sizeInKB = sizeInBytes / 1024;
console.log(`JSON size: ${sizeInKB.toFixed(2)} KB`);

res.send(realmodules["1"].topics[1])
  
})




app.listen('8080',()=>{
    console.log('app is listening')
})