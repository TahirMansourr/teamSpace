'use client'
import React from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";
import { Badge, ScrollArea, Table, Text } from '@mantine/core';
import { useTaskContext } from '@/components/Contexts/TasksContext';
import { FiEdit } from 'react-icons/fi';
import TaskTableBody from './taskTableBody';

const TaskTableComponent = () => {
    const {allTasks} = useTaskContext()
  return (
    <section className=' p-3 border rounded-md shadow-md m-3'>
           { allTasks? 
            <ScrollArea h={600}>
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
                        <Table.Th>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {
                    allTasks.map((task : any , index : number) => {
                        const date = new Date(task.dueDate)
               return  <TaskTableBody task={task} date={date} key={index} index={index}/>
              
                    })
                }
                
            </Table> 
         </ScrollArea>
            
            : null
            }
        </section>
  )
}

export default TaskTableComponent