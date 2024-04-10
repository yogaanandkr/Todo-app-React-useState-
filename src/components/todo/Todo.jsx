import { useState } from "react";
import "./todo.css";
// import "./todo2.css";

function Todo() {
  let [todos, settodos] = useState([]);
  let [id, setid] = useState(0);

  function gettime() {
    let fulldate = new Date();
    let date = fulldate.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    let month = fulldate.getMonth();
    if (month < 10) {
      month = "0" + month;
    }
    let year = fulldate.getFullYear();
    let hrs = fulldate.getHours();
    if (hrs < 10) {
      hrs = "0" + hrs;
    }
    let mins = fulldate.getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    return `${year}-${month}-${date}    ${hrs}:${mins}`;
  }

  function add() {
    let tasks = document.getElementById("task").value;
    let targets = document.getElementById("target").value;
    let time = document.getElementById("time").value;
    if (tasks) {
      settodos([
        ...todos,
        {
          uid: id,
          task: tasks,
          target: targets,
          time: time,
          createdAt: gettime(),
          modifying: null,
        },
      ]);
      setid(id + 1);
      console.log("Created", todos);
    }
  }

  function updatetodo(task, target) {
    let getindex = todos.findIndex(
      item => item.task === task && item.target === target
    );

    let updatedTodos = [...todos];
    updatedTodos[getindex] = { ...updatedTodos[getindex], modifying: true };
    settodos(updatedTodos);
    console.log("before update", updatedTodos);
  }

  async function savetodo(id) {
    console.log("need to update", id);
    let task = document.getElementById("taskm");
    let taskm = task.defaultValue;
    let target = document.getElementById("targetm");
    let targetm = target.defaultValue;
    let time = document.getElementById("timem");
    let timem = time.defaultValue;
    let getindex = todos.findIndex(
      item => item.task === taskm && item.target === targetm
    );
    console.log("index save clicked", getindex);

    if (task.value) {
      let updatedTodos = [...todos];
      updatedTodos[getindex] = await {
        ...updatedTodos[getindex],
        task: task.value,
        target: target.value,
        time: time.value,
        modifying: false,
      };
      settodos(updatedTodos);
      console.log("save btn clicked", updatedTodos);
    } else {
      deletetodo(todos[getindex].task, todos[getindex].target);
    }
  }

  async function deletetodo(taskd, targetd) {
    let getindex = todos.findIndex(
      item => item.task === taskd && item.target === targetd
    );
    let confirm_del = window.confirm("Are you sure you want to delete");
    if (confirm_del) {
      let deleteobj = [...todos];
      deleteobj.splice(getindex, 1);
      settodos(deleteobj);
    }
  }

  return (
    <>
      <h1 className="todo_title">TODO APP</h1>
      <table rules="all" border="2px">
        <tr>
          <th>Todo</th>
          <th>Target</th>
          <th>Created At</th>
          <th>Delete / Update</th>
        </tr>

        {todos.map((a, index) => {
          return (
            <>
              {a.modifying ? (
                <tr key={index}>
                  <td>
                    <input
                      id="taskm"
                      type="text"
                      defaultValue={a.task}
                      placeholder={a.task}
                    />
                  </td>
                  <td>
                    <input
                      id="targetm"
                      type="date"
                      defaultValue={a.target}
                      placeholder={a.target}
                    />
                    <input
                      id="timem"
                      type="time"
                      defaultValue={a.time}
                      placeholder={a.time}
                    />
                  </td>

                  <td className="buttons">
                    <button onClick={deletetodo}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => savetodo(a.id)}>
                      <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td className="taskdisp">
                    <p>{a.task}</p>
                  </td>
                  <td className="targetdisp">
                    <span>{a.target}</span> <br />
                    <span>{a.time}</span>
                  </td>
                  <td className="targetdisp">
                    <span>
                      {a.createdAt.slice(0, a.createdAt.indexOf(" "))}
                    </span>
                    <br />
                    <span>
                      {a.createdAt.slice(a.createdAt.indexOf(" ") + 1)}
                    </span>
                  </td>

                  <td className="buttons">
                    <button onClick={() => deletetodo(a.task, a.target)}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => updatetodo(a.task, a.target)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </td>
                </tr>
              )}
            </>
          );
        })}
        <tr>
          {/* <form> */}
          <td>
            <input id="task" type="text" />
          </td>
          <td>
            <input id="target" type="date" />
            <input id="time" type="time" placeholder="time" />
          </td>
          <td></td>
          <td className="addtaskbtn">
            <button className="" onClick={add}>
              Add Task
            </button>
          </td>
          {/* </form> */}
        </tr>
      </table>
    </>
  );
}

export default Todo;
