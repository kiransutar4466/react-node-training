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
      <div className="relative flex w-full min-h-10 justify-center gap-3 py-2 items-center bg-secondary-gray rounded-b-md border-1 border-t-0">
        {totolPages > 0 && (
          <>
            <Button
              btnContent={
                <span className="flex items-center">
                  <GrFormPreviousLink /> Prev
                </span>
              }
              onClickCb={pageNum > 1 ? prevPageCb : () => {}}
              width="fit"
              color="primary-white"
              bgColor="primary-gray"
              classNames="text-sm"
            />

            <span className="w-10 text-center">
              {pageNum}/{totolPages}
            </span>

            <Button
              btnContent={
                <span className="flex items-center">
                  Next <GrFormNextLink />
                </span>
              }
              onClickCb={pageNum < totolPages ? nextPageCb : () => {}}
              width="fit"
              color="primary-white"
              bgColor="primary-gray"
              classNames="text-sm"
            />

            <div className="absolute left-2 text-sm">Per Page-10 </div>
          </>
        )}
      </div>
    </>
  );
};

export default TableControllers;
