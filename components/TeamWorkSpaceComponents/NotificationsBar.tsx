"use client";
import React from "react";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import {
  BsJournalText,
  BsListTask,
  BsBugFill,
  BsChatDots,
} from "react-icons/bs";
import Gemini from "../Gemini/Gemini";
import { Button } from "@mantine/core";

const NotificationsBar = () => {
  const {
    notesComponentExpandState,
    tasksComponentExpandState,
    setNotesComponentExpandState,
    setTasksComponentExpandState,
    issuesComponentExpandState,
    setIssuesComponentExpandState,
    chatComponentExpandState,
    setChatComponentExpandState,
  } = useWorkSpaceContext();

  return (
    <section className="mx-auto flex bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-3 gap-3 items-center shadow-lg border border-slate-300 animate-fade-in-down">
      <Gemini />
      {notesComponentExpandState && (
        <Button
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-300/50 transition-all duration-300 rounded-lg px-3 py-2 bg-slate-200/50 text-slate-700 animate-slide-in hover:scale-105"
          onClick={() => setNotesComponentExpandState(false)}
        >
          <BsJournalText className="text-amber-500 animate-pulse" />
          <span className="animate-fade-in">Notes</span>
        </Button>
      )}

      {tasksComponentExpandState && (
        <Button
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-300/50 transition-all duration-300 rounded-lg px-3 py-2 bg-slate-200/50 text-slate-700 animate-slide-in hover:scale-105"
          onClick={() => setTasksComponentExpandState(false)}
        >
          <BsListTask className="text-emerald-500 animate-pulse" />
          <span className="animate-fade-in">Tasks</span>
        </Button>
      )}

      {issuesComponentExpandState && (
        <Button
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-300/50 transition-all duration-300 rounded-lg px-3 py-2 bg-slate-200/50 text-slate-700 animate-slide-in hover:scale-105"
          onClick={() => setIssuesComponentExpandState(false)}
        >
          <BsBugFill className="text-rose-500 animate-pulse" />
          <span className="animate-fade-in">Issues</span>
        </Button>
      )}

      {chatComponentExpandState && (
        <Button
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-300/50 transition-all duration-300 rounded-lg px-3 py-2 bg-slate-200/50 text-slate-700 animate-slide-in hover:scale-105"
          onClick={() => setChatComponentExpandState(false)}
        >
          <BsChatDots className="text-sky-500 animate-pulse" />
          <span className="animate-fade-in">ChatSpace</span>
        </Button>
      )}

      {!notesComponentExpandState &&
        !chatComponentExpandState &&
        !tasksComponentExpandState &&
        !issuesComponentExpandState && (
          <div className="text-slate-500 italic px-2 animate-fade-in">
            Nothing is minimized
          </div>
        )}
    </section>
  );
};

export default NotificationsBar;
