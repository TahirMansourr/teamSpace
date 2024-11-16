export const DocsComponentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <section
      className={` ${className} flex  border rounded-[50px] shadow-[0px_20px_60px_#bebebe,_-20px_-20px_60px_#ffffff] bg-[#e0e0e0]`}
    >
      {children}
    </section>
  );
};
