import { TaskDto } from '@/Utils/types'
import { Badge, Table } from '@mantine/core'
import React from 'react'
import { FiEdit } from 'react-icons/fi'

const TaskTableBody = ({index , task , date } :{ index : number , task : TaskDto , date : Date}) => {
  return (
    <Table.Tbody>
        <Table.Tr key={index}>
            <Table.Td>
                {<h1 className=' font-bold text-slate-700 font-sans'>{task.name}</h1>}
            </Table.Td>
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
            <Table.Td>{task.tags? task.tags.map((item : any) => ( 
                <h1 className='font-sans font-bold text-slate-600'>
                    @ <Badge
                        radius='md'
                            size="sm"
                            color='gray'
                            >
                            {item}
                    </Badge>
                </h1>)) : 'Uncategorized'}
            </Table.Td>
            <Table.Td>
                {task.assignedTo? task.assignedTo.map((item : any) => (<h1 className=' font-bold text-slate-600'>-{item.username ? item.username : item}</h1>)) : 'username'}
            </Table.Td>
            <Table.Td>
                 <FiEdit className=' ml-auto hover:cursor-pointer mr-3' color='blue' />
            </Table.Td>
    </Table.Tr>
</Table.Tbody>)
}

export default TaskTableBody