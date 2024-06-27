'use client'
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

function SideBar() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div className='relative '>
        <Burger size="sm" c={'green'} opened={opened} onClick={toggle} aria-label="Toggle navigation" className={`  ${opened ? 'mt-2' : 'absolute m-2' } top-3 left-3`} />
        <section
            className={`transform transition-all duration-150 ${
                opened
                    ? ' w-[15rem] flex-grow bg-gray-300 min-h-[30rem] rounded-lg m-2 '
                    : 'max-h-0 opacity-0 w-0 flex-grow-0 min-h-0'
                }`}
            >
                Docs
        
      </section>
    </div>
    
    );
}

export default SideBar;
