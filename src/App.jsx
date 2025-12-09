import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

const SAMPLE_TASKS = [
  {
    id: "s1",
    title: "Complete Project 1",
    description: "",
    status: "doing",
    tags: ["React"],
  },
  {
    id: "s2",
    title: "Change Delete Icon",
    description: "",
    status: "todo",
    tags: ["HTML", "CSS"],
  },
  {
    id: "s3",
    title: "Start Section 4 for React",
    description: "",
    status: "todo",
    tags: ["React"],
  },
  {
    id: "s4",
    title: "This is another task",
    description: "",
    status: "doing",
    tags: ["JavaScript", "CSS"],
  },
  {
    id: "s5",
    title: "Working on HTML",
    description: "",
    status: "done",
    tags: ["HTML"],
  },
];

export default function App() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [editing, setEditing] = useState(null);

  function makeId() {
    return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  }

  async function handleCreate(task) {
    const newTask = {
      ...task,
      status: task.status || "todo",
      tags: task.tags || [],
      id: makeId(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  async function handleUpdate(task) {
    const updated = {
      ...task,
      status: task.status || "todo",
      tags: task.tags || [],
    };
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id || t._id === updated._id ? updated : t))
    );
    setEditing(null);
  }

  async function handleDelete(task) {
    if (!confirm("Delete this task?")) return;
    setTasks((prev) =>
      prev.filter((t) => !(t.id === task.id || t._id === task._id))
    );
  }

  return (
    <div className="page-shell">
      <div className="page-overlay" />
      <div className="page-content">
        <header className="panel panel-header">
          <div className="header-top">
            <span className="pill">TaskTrec</span>
            <h1 className="title typing">Orchestrate your tasks</h1>
            <p className="subtitle">
              Create, edit, and complete tasks with a clean, elevated UI. Buttons glow,
              panels float, and everything stays focused on your workflow.
            </p>
          </div>
          <div className="header-tags">
            <span className="pill">Demo data (no backend)</span>
            <span className="pill">Drag-free columns</span>
            <span className="pill">Glowing headers</span>
          </div>
        </header>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{editing ? "Editing" : "Create"}</p>
              <h2 className="section-title">
                {editing ? "Update task" : "Add a new task"}
              </h2>
            </div>
            {editing && (
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="btn-secondary"
              >
                Clear edit
              </button>
            )}
          </div>
          <TaskForm
            key={editing ? editing.id || editing._id : "new"}
            initial={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Tasks</p>
              <h2 className="section-title">Your active list</h2>
            </div>
            <span className="badge">
              {tasks.length ? `${tasks.length} task${tasks.length > 1 ? "s" : ""}` : "Empty"}
            </span>
          </div>
          <TaskList
            tasks={tasks}
            onEdit={(t) => setEditing(t)}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}
