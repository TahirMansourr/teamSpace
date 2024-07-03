'use client'
import { Button , Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";
import { Table } from '@mantine/core';
import CreateTaskForm from '@/components/Forms/createTaskForm';


const AllTasksPage = () => {
    const [modalOpened , {open , close : closeModal}] = useDisclosure(false)
  return (
    <main className=' flex flex-col w-full h-full border shadow-xl rounded-md'>
         <Modal 
          opened={modalOpened} 
          onClose={closeModal} 
          title="Create New Task"
          withCloseButton = {false}
          overlayProps={{
            backgroundOpacity: 0.2,
            blur: 4,
          }}
          >
          <CreateTaskForm/>
        </Modal>
        <section className='flex justify-between items-center m-2 '>
            <div></div>
          <div>
            <Text size='lg'>TaskBoard</Text>
          </div>
          <Button onClick={open}>Create a new Task</Button>
        </section>
        <section className=' p-3 border rounded-md shadow-md m-3'>
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
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                        <Table.Tr key={''}>
                        <Table.Td>hi</Table.Td>
                        <Table.Td>im</Table.Td>
                        <Table.Td>tahir</Table.Td>
                        <Table.Td>mansour</Table.Td>
                        </Table.Tr>
                </Table.Tbody>
            </Table>
        </section>
    </main>
  )
}

export default AllTasksPage