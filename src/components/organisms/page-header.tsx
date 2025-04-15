interface Props {
  title: string;
  titleIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ title, titleIcon, children }: Props) => {
  return (
    <div className="flex items-center gap-2 justify-between">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        {titleIcon} {title}
      </h2>
      {children}
    </div>
  );
};

export default PageHeader;
