const express= require("express")
const cors = require("cors");
const app=express()
app.use(cors());
app.use(express.json());

let todoarray=
[
{
    id:1,
    task:"Create all API'S for Project 01",
    tags:["NodeJS","JavaScript"],
    status:"done"
},
{
    id:2,
    task:"Create API for list of Todo",
    tags:["NodeJS","javascript","React"],
    status:"done"
},
{
    id:3,
    task:"Plan Project 01",
    tags:["Javascript"],
    status:"done"
}
]

app.get("/", (req,res)=>{
    res.json("TaskTrek Project!")
})

app.get("/todo",(req, res)=>{
    res.json(todoarray)
})

app.get("/todo/:id",(req,res)=>{
    const todoId= parseInt(req.params.id)
    const todo = todoarray.find((t) => t.id === todoId)
    res.json(todo)
})

app.post ("/todo",(req,res)=>{
    const todo = req.body;
    if(!todo.task){
        return res.status(400).json({message:"task is required"})
    }
    if(!todo.tags){
        return res.status(400).json({message:"tags is required"})
    }
    if(!todo.status){
        return res.status(400).json({message:"status is required"})
    }

    const newtodo={
        id: Date.now(),
        task:todo.task,
        tags:todo.tags,
        status:todo.status
    }
   todoarray.push(newtodo)
    res.status(201).json(newtodo)
});

app.put("/todo/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const {task,tags,status}=req.body;
    const todoIndex=todoarray.findIndex((t)=>t.id===id);
    if(todoIndex===-1){
        return res.status(404).json({message:"Todo not found"})
    }
    if(task){
        todoarray[todoIndex].task=task
    }
    if(tags){
        todoarray[todoIndex].tags=tags
    }
    if(status){
        todoarray[todoIndex].status=status
    }
    res.json(todoarray[todoIndex])

});

app.delete("/todo/:id",(req ,res)=>{
    const id=parseInt(req.params.id);
    const task=req.body
    const todoIndex=todoarray.findIndex((t)=>t.id===id)
    if(todoIndex===-1){
        return res.status(401).json({message:"todoIndex not found"})
    }
    todoarray.splice(todoIndex,1)
    res.json({message:"todo successfully deleted"})
    
});

app.patch("/todo/:id",(req,res)=>{
    const id= parseInt(req.params.id);
    const {task,tags,status}=req.body;
    const todoIndex=todoarray.findIndex((t)=>t.id===id);
    if(task){
        todoarray[todoIndex].task=task
    }
    if(tags){
        todoarray[todoIndex].tags=tags
    }
    if(status){
        todoarray[todoIndex].status=status
    }

    res.json(todoarray[todoIndex])
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("🚀 Server running on http://localhost:5000");
});