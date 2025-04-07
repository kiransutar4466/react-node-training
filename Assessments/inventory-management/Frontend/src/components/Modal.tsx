import { MdOutlineClose } from "react-icons/md";
import { modalPropsTypes } from "../types/components-props-types/modalPropsTypes";

const Modal = ({
  isVisible,
  childComponent,
  toggleIsVisibleCb,
}: modalPropsTypes) => {
  return (
    isVisible && (
      <div
        onClick={(e: any) => {
          toggleIsVisibleCb(e);
        }}
        className="absolute flex justify-center items-center w-full h-[100vh] min-h-[100vh] top-0 left-0 bg-secondary-gray/50 z-40 "
      >
        <div onClick={(e) => e.stopPropagation()} className="relative p-5">
          {childComponent}
          <span
            onClick={(e) => toggleIsVisibleCb(e)}
            className="absolute top-8 right-8 cursor-pointer text-2xl font-bold"
          >
            <MdOutlineClose />
          </span>
        </div>
      </div>
    )
  );
};

export default Modal;
