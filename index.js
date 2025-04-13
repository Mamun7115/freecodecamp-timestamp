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
  // dateparams
  const dateParms = req.params.date;
  console.log(dateParms)
  // new date holder
  let dateHolder;
   // if date is a number = !
  if(!isNaN(dateParms)){
    dateHolder = new Date(parseInt(dateParms));
    console.log(dateHolder)
  }else{
    
    dateHolder = new Date(dateParms);
  }
  // if the invalid data
  if(dateHolder.toString()=== "Invalid Date"){
    return res.json({error: "Invalid Date"})
  }

  // finally send it plzzzz.zzz.z..z.z..z

  const unix = dateHolder.getTime();
  const utc = dateHolder.toUTCString();


  res.json({unix, utc });
})





const server = app.listen(process.env.PORT || 3000, ()=>{
  console.log("Server is running on:", server.address().port);
})

