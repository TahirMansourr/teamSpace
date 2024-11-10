const MultiTabsComponentWrapper = ({
    children , 
    componentExpandState,
    className
} : {
    children : React.ReactNode , 
    componentExpandState : boolean,
    className? : string
}) => {
  return (
    <article  
    className={`transition-all ease-in-out duration-200 border flex flex-col bg-white rounded-md shadow-xl p-2 ${className}
                        ${componentExpandState ? 'opacity-0 overflow-hidden' : 'opacity-100 w-[20rem] h-full flex-grow'}`}
    style={{
              width: componentExpandState ? '0' : '20rem',
              height: componentExpandState ? '0' : '100%',
              padding: componentExpandState ? '0' : '1rem',
    }}>
        {children}
    </article>
  )
};

export default MultiTabsComponentWrapper