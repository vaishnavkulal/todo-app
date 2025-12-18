import { Router } from "express";
const todoRouter = Router();
import { todoModel } from "../models/todoModel.js";

todoRouter.get("/all", async (req, res) => {
  try {
    const todos = await todoModel.find({});
    res.status(200).json({
      data: todos,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

todoRouter.get("/todo/:id", async (req, res) => {
  try {
    const idx = req.params.id;
    const todo = await todoModel.findById(idx);
    res.status(200).json({
      message: `todo fetch successfull`,
      data: todo,
    });
  } catch (err) {
    console.log(err.message);
    res.status(200).json({
      message: err.message,
    });
  }
});

todoRouter.post("/post/todo", async (req, res) => {
  try {
    const newTodo = await todoModel.create({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
      priority: req.body.priority,
      duedate: req.body.duedate,
      user: req.body.user,
    });
    console.log(`New todo created -> ${newTodo.title}`);
    res.status(200).json({
      message: "new todo created",
      title: newTodo.title,
    });
  } catch (err) {
    console.log(`Todo post error: ${err.message}`);
    res.status(400).send({
      message: err.message,
    });
  }
});

todoRouter.put("/update/todo/:id", async (req, res) => {
  try {
    const idx = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      idx,{
        title:req.body.title,
        description:req.body.description,
        isCompleted:req.body.isCompleted,
        priority:req.body.priority,
        duedate:req.body.duedate,
        user:req.body.user
      },
      {new:true, runValidators: true}
    );
    if(!updatedTodo){
      return res.status(404).json({
        message: "Todo not found"
      });
    }
    res.status(200).json({
      message: "todo is updated",
    });
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
});

todoRouter.delete("/delete/todo/:id", async(req, res) => {
  try{
    const idx = req.params.id
    const deleted_todo = await todoModel.findByIdAndDelete(idx)
    if(!deleted_todo){
      return res.status(404).json({
        error: "todo not found"
      })
    }
    res.status(200).json({
      message: "todo successfully deleted",
      title: deleted_todo.title
    })
  }
  catch(err){
    console.log("Error in  deleting todo\n");
    res.status(400).json({
      message: err.message
    })
  }
});
export default todoRouter;
