'use client'
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

function SideBar() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div>
        <Burger size="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" className='mt-5' />
        <section
            className={`transform transition-all duration-150 ${
                opened
                    ? 'opacity-100 w-[15rem] flex-grow bg-gray-300 min-h-[30rem] rounded-lg m-2'
                    : 'max-h-0 opacity-0 w-0 flex-grow-0 min-h-0'
                }`}
            >
        
      </section>
    </div>
    
    );
}

export default SideBar;
