'use client'
import React from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";
import { Table, Text } from '@mantine/core';
import { useTaskContext } from '@/components/Contexts/TasksContext';

const TaskTableComponent = () => {
    const {allTasks} = useTaskContext()
  return (
    <section className=' p-3 border rounded-md shadow-md m-3'>
           { allTasks? 
            <Table >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Name</Text>
                                <RiExpandUpDownLine size={20} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Status</Text>
                                <RiExpandUpDownLine size={20} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Priority</Text>
                                <RiExpandUpDownLine size={20} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Category</Text>
                                <RiExpandUpDownLine size={20} />
                            </div>
                        </Table.Th>
                        <Table.Th>
                            <div className='flex '>
                                <Text>Assigned To</Text>
                                <RiExpandUpDownLine size={20} />
                            </div>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {
                    allTasks.map((task : any) => (
                        <Table.Tbody>
                        <Table.Tr key={''}>
                        <Table.Td>{task.name}</Table.Td>
                        <Table.Td>{task.status ? task.status : 'no status yet'}</Table.Td>
                        <Table.Td>{task.priority}</Table.Td>
                        <Table.Td>{task.tags? task.tags.map((item : any) => (item)) : 'tag'}</Table.Td>
                        <Table.Td>{task.assignedTo? task.assignedTo.map((item : any) => (<h1>{item.username}</h1>)) : 'username'}</Table.Td>
                        </Table.Tr>
                </Table.Tbody>
                    ))
                }
                
            </Table> 
            : null
            }
        </section>
  )
}

export default TaskTableComponent