
import { expect, test } from "vitest";
import Dashboard from "./Dashboard";
import { render, screen, fireEvent } from '@testing-library/react'
import Messages from "./messagesComponent";
import ProjectsComponent from "./projectComponents/projectsComponent";
import Meetings from "./meetings";
import Notifications from "./notifications";


test('testing dashboard component' , () => {
   render(<Dashboard/>)
   expect(render(<ProjectsComponent opened/>)).toBeDefined
   fireEvent.click(screen.getByText('messages'))
    expect(render(<Messages opened/>)).toBeDefined()
   fireEvent.click(screen.getByText('meetings'))
    expect(render(<Meetings/>)).toBeDefined()
   fireEvent.click(screen.getByText('notifications'))
    expect(render(<Notifications/>)).toBeDefined()
})