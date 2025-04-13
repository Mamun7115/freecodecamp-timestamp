import express from "express";
import path from "path"
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

// since im using type module...this is my punishment
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename)

// MIDLDLEWARES
app.use(cors(), express.static(path.join(dirname,"public")));



// ROUTES
app.get("/", (req, res)=>{
  res.sendFile(path.join(dirname,"views", "index.html"))

})

app.get("/api", (req, res)=>{
  const currentDate = new Date();

  res.json(
    {
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    }
  )
})

app.get("/api/:date", (req,res)=>{

  const {date} = req.params;
  console.log(date)
  let dateHolder;

  if(!isNaN(date)){
    dateHolder = new Date(parseInt(date));
    console.log(date)
  }else{
    dateHolder = new Date(date);
  }

  if(date.toString()=== "Invalid Data"){
    return res.json({error: "Invalid Date"})
  }

  const unix = dateHolder.getTime();
  const utc = dateHolder.toUTCString();


  res.json({unix, utc });
})





const server = app.listen(process.env.PORT || 3000, ()=>{
  console.log("Server is running on:", server.address().port);
})

