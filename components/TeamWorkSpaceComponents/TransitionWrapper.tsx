import { Transition } from "@mantine/core"
import { ReactNode } from "react"

export const TransitionWrapper = ({children , opened} : {children : ReactNode , opened : boolean}) => {
    return(
        <Transition
            mounted={opened}
            transition="fade-left"
            duration={600}
            timingFunction="ease"
            >
                {(styles) =>(
                    <section className="flex w-full h-full" style={styles}>
                        {children}
                    </section>
                )}
         </Transition>
    )

}