import React from "react";
import TaskItem from "./TaskItems";

const columns = [
  {
    key: "todo",
    title: "To do",
    icon: "🎯",
    gradient: "linear-gradient(180deg, rgba(255,141,72,0.25), rgba(255,141,72,0.05))",
    glow: "0 18px 45px rgba(255,141,72,0.25)",
    badgeTint: "badge-todo",
  },
  {
    key: "doing",
    title: "Doing",
    icon: "🌟",
    gradient: "linear-gradient(180deg, rgba(255,214,102,0.25), rgba(255,214,102,0.05))",
    glow: "0 18px 45px rgba(255,214,102,0.25)",
    badgeTint: "badge-doing",
  },
  {
    key: "done",
    title: "Done",
    icon: "✅",
    gradient: "linear-gradient(180deg, rgba(69,214,167,0.28), rgba(69,214,167,0.07))",
    glow: "0 18px 45px rgba(69,214,167,0.25)",
    badgeTint: "badge-done",
  },
];

export default function TaskList({ tasks = [], onEdit, onDelete }) {
  const grouped = columns.map((col) => ({
    ...col,
    items: tasks.filter((t) => (t.status || "todo") === col.key),
  }));

  return (
    <div className="board-grid">
      {grouped.map((col) => (
        <div
          key={col.key}
          className="board-column"
          style={{ backgroundImage: col.gradient, boxShadow: col.glow }}
        >
          <div className="column-header">
            <span className={`emoji-badge ${col.badgeTint}`}>{col.icon}</span>
            <span className="column-title">{col.title}</span>
            <span className="badge column-count">{col.items.length}</span>
          </div>

          {!col.items.length ? (
            <div className="column-empty">No cards yet. Drop one here!</div>
          ) : (
            <div className="column-cards">
              {col.items.map((t) => (
                <TaskItem
                  key={t.id || t._id}
                  task={t}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
