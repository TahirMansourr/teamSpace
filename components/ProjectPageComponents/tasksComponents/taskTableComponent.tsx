'use client'
import React from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";
import { Badge, ScrollArea, Table, Text } from '@mantine/core';
import { useTaskContext } from '@/components/Contexts/TasksContext';

const TaskTableComponent = () => {
    const {allTasks} = useTaskContext()
  return (
    <section className=' p-3 border rounded-md shadow-md m-3'>
           { allTasks? 
            // <ScrollArea >
                <Table highlightOnHover stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Name</Text>
                                <RiExpandUpDownLine size={16} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Status</Text>
                                <RiExpandUpDownLine size={16} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Priority</Text>
                                <RiExpandUpDownLine size={16} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Due On</Text>
                                <RiExpandUpDownLine size={16} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Category</Text>
                                <RiExpandUpDownLine size={16} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Assigned To</Text>
                                <RiExpandUpDownLine size={16} />
                            </div>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {
                    allTasks.map((task : any , index : number) => {
                        const date = new Date(task.dueDate)
               return (<Table.Tbody>
                    <Table.Tr key={index}>
                        <Table.Td>{<h1 className=' font-bold text-slate-700 font-sans'>{task.name}</h1>}</Table.Td>
                        <Table.Td>
                            <Badge
                            radius='md'
                                size="sm"
                                color={task.status === 'To Do' ? 'red':
                                task.status === 'In Progress' ? 'yellow' :
                                task.status === 'Done' ? 'green':
                                task.status === 'Review' ? 'orange':
                                'gray'
                                }
                                >
                                 {task.status ? task.status : 'no status yet'}
                            </Badge>
                        </Table.Td>
                        <Table.Td>
                        <Badge
                        radius='md'
                            size="sm"
                            color={task.priority === 'HIGH' ? 'red':
                            task.priority === 'MEDIUM' ? 'yellow' :
                            task.priority === 'LOW' ? 'blue':
                            'gray'
                            }
                            >
                            {task.priority}
                        </Badge>
                           </Table.Td>
                        <Table.Td>
                           <h1 className=' font-bold'> {date.toLocaleString()}</h1>
                        </Table.Td>
                        <Table.Td>{task.tags? task.tags.map((item : any) => ( <h1 className='font-sans font-bold text-slate-600'>
                       @ <Badge
                        radius='md'
                            size="sm"
                            color='gray'
                            >
                            {item}
                        </Badge>
                        </h1>)) : 'Uncategorized'}</Table.Td>
                        <Table.Td>{task.assignedTo? task.assignedTo.map((item : any) => (<h1 className=' font-bold text-slate-600'>-{item.username ? item.username : item}</h1>)) : 'username'}</Table.Td>
                    </Table.Tr>
                      </Table.Tbody>)
                    })
                }
                
            </Table> 
            // </ScrollArea>
            
            : null
            }
        </section>
  )
}

export default TaskTableComponent