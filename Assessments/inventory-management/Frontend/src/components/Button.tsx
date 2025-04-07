import { buttonPropsTypes } from "../types/components-props-types/buttonPropsTypes";
import { clsx } from "clsx";

const Button = ({
  btnContent,
  onClickCb,
  color,
  bgColor,
  classNames,
  width,
  type,
}: buttonPropsTypes) => {
  return (
    <button
      type={type}
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
      onClick={(e) => onClickCb && onClickCb(e)}
      className={clsx(
        `text-${color} bg-${bgColor} h-fit cursor-pointer  px-2 py-1 rounded-[5px] w-${width}  ${
          classNames && classNames
        }`,
      )}
    >
      {btnContent}
    </button>
  );
};

export default Button;
