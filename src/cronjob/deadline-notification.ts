import { getAllTask, updateTaskStatus } from "../db/taskQueries";
import { DeadlineExceed } from "../email";
import cron from "node-cron";

export const sendDeadlineNotification = async () => {
  const AllTodos = await getAllTask();
  // const dates = AllTodos.map((todo) => todo.deadline);

  AllTodos.forEach((todo: any) => {
    const day = todo.deadline.getDate();
    const month = todo.deadline.getMonth() + 1;
    const minutes = todo.deadline.getMinutes();
    const hour = todo.deadline.getHours();
    // console.log(todo.title);
    // console.log(todo.deadline);
    // console.log(`${day} , ${month}, ${minutes} , ${hour}`);
    cron.schedule(`${minutes} ${hour} ${day} ${month} *`, async () => {
      if (todo.status !== "done") {
        console.log("Exceed");
        await updateTaskStatus("failed", todo._id.toString());
        DeadlineExceed(todo.assignedTo.name, todo.assignedTo.email, todo.title);
      }
    });
  });
};
