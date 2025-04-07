import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { tableControllersPropsTypes } from "../types/components-props-types/tableControllersPropsTypes";
import Button from "./Button";

const TableControllers = ({
  nextPageCb,
  prevPageCb,
  pageNum,
  totolPages,
}: tableControllersPropsTypes) => {
  return (
    <>
      <div className="relative flex w-full min-h-10 justify-end gap-3 py-2 items-center rounded-b-md ">
        {totolPages > 0 && (
          <>
            <Button
              btnContent={
                <span className="flex items-center rounded-[10px]">
                  <GrFormPreviousLink />
                </span>
              }
              onClickCb={pageNum > 1 ? prevPageCb : () => {}}
              width="fit"
              color="text-dark"
              bgColor={pageNum==1?"header-bg":"primary-orange"}
              classNames="text-sm rounded-[10px] overflow-hidden"
            />

            <span className="w-10 text-center">
              {pageNum}/{totolPages}
            </span>

            <Button
              btnContent={
                <span className="flex items-center rounded-[10px] overflow-hidden">
                  <GrFormNextLink />
                </span>
              }
              onClickCb={pageNum < totolPages ? nextPageCb : () => {}}
              width="fit"
              color="text-dark"
              bgColor={pageNum == totolPages ? "header-bg" :"primary-orange"}
              classNames="text-sm rounded-[10px] overflow-hidden"
            />

          </>
        )}
      </div>
    </>
  );
};

export default TableControllers;
