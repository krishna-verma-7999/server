import { UserToAdmin } from "../email";
import { createTask, getAllTask, updateTaskStatus } from "../db/taskQueries";
import express from "express";

export const createTaskController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let task;
    if (req.body.assignedTo) {
      task = await createTask({
        title: req.body.title,
        timeEstimate: req.body.timeEstimate,
        deadline: req.body.deadline,
        priority: req.body.priority,
        createdBy: req.body.userId,
        assignedTo: req.body.assignedTo,
      });
    } else {
      task = await createTask({
        title: req.body.title,
        priority: req.body.priority,
        timeEstimate: req.body.timeEstimate,
        deadline: req.body.deadline,
        createdBy: req.body.userId,
      });
    }

    return res.status(200).send(task);
  } catch (error) {
    console.log("[Create Task Error : ]", error);
    return res.status(400).send(error);
  }
};

export const getTodoController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tasks = await getAllTask();
    // console.log(tasks);
    if (!tasks) {
      return res.status(400).send("no task available");
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.log("[Create Task Error : ]", error);
    return res.status(400).send(error);
  }
};

export const updateTaskController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log(req.body);
    const tasks = await updateTaskStatus(
      req.body.updatedStatus,
      req.body.taskId
    );

    const user: any = tasks.assignedTo;
    UserToAdmin(user.email, user?.name, req.body.updatedStatus);
    return res
      .status(200)
      .json({ status: 200, message: "Task status updated" });
  } catch (error) {
    console.log("[Update Task Error] : ", error);
    return res.status(400).send(error);
  }
};
