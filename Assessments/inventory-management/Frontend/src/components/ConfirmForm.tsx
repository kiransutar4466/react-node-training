import { ReactNode } from "react";
import Button from "./Button";

const ConfirmForm = ({
  message,
  buttonContent,
  actionCb,
  cancelCb,
}: {
  message: string;
  buttonContent: ReactNode | string;
  actionCb: Function;
  cancelCb: Function;
}) => {
  return (
    <div className="w-[300px] h-[200px] bg-primary-white text-primary-black rounded-xl p-5 flex flex-col justify-between">
      <div className="message text-left w-full pt-5">{message}</div>

      <div className="actions flex justify-between w-full">
        <Button
          onClickCb={cancelCb}
          bgColor="button-blue"
          color="primary-white"
          width="fit"
          btnContent={"Cancel"}
        />

        <Button
          onClickCb={actionCb}
          bgColor="dark-orange"
          color="primary-white"
          width="fit"
          btnContent={buttonContent}
        />
      </div>
    </div>
  );
};

export default ConfirmForm;
