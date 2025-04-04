const StatusComponent = ({
  content,
  bgColor,
  color,
}: {
  content: string;
  bgColor: string;
  color: string;
}) => {
  return (
    <div
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
      className={`bg-[${bgColor}] text-[${color}] border-1 border-[${color}] text-xs flex items-center justify-center py-1 px-2 rounded-xl h-full max-h-5 w-fit min-w-[100px]`}
    >
      <span>{content}</span>
    </div>
  );
};

export default StatusComponent;
