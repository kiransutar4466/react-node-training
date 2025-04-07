import { ReactNode } from "react";

const Card = ({
  title,
  subtitle,
  icon,
  onClickCb,
  width,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClickCb: Function;
  width: string;
}) => {
  return (
    <>
      <div
        style={{ width: width }}
        onClick={() => onClickCb()}
        className={`bg-primary-white min-w-[270px] rounded-xl border-1 text-primary-black flex justify-between p-3 items-center w-[${width}] cursor-pointer`}
      >
        <div>
          <div className="text-[20px] font-bold">{title}</div>
          <div className="">{subtitle}</div>
        </div>
        <div>{icon}</div>
      </div>
    </>
  );
};

export default Card;
