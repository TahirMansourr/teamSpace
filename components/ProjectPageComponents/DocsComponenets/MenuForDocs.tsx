import { Button, Menu } from '@mantine/core'
import React from 'react'

const MenuForDocs = () => {
  return (
    <>
     <Menu shadow="md" width={200}>
        <Menu.Target>
            <Button>Toggle menu</Button>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item  >
            Settings
            </Menu.Item>
            <Menu.Item >
            Messages
            </Menu.Item>
            <Menu.Item >
            Gallery
            </Menu.Item>
            <Menu.Item>
            Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item>
            Transfer my data
            </Menu.Item>
            <Menu.Item
            color="red">
            Delete my account
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
    </>
  )
}

export default MenuForDocs