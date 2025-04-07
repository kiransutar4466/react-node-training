import { tablePropsTypes } from "../types/components-props-types/tablePropsTypes";
import {clsx} from 'clsx'
import Loader from "./Loader";

const Table = ({ tableData, columns ,isActions, actions, pageNum, perPage, isLoading, onClickRowCb, }: tablePropsTypes) => {

  const columnWidth = columns.map((value) => value.width);

  return (
    <>
    <div className="h-fit">
     <div className="h-fit w-full border-x-[1px] border-table-border bg-sidebar-bg overflow-x-scroll rounded-t-[5px] overflow-hidden">
        <div className="flex bg-header-bg border-table-border border-y-[1px] text-text-dark justify-between items-center  p-2 w-full min-w-fit">
          {columns.map((column, index: number | string) => (
            <span
            style={{
              width: column.width,
              minWidth: column.width,
              maxWidth: column.width,
            }}
              className={clsx(` text-left font-medium `)}
              key={index}
            >
              {column.name}
            </span>
          ))}
          {isActions && <span className="text-center font-medium w-[100px]">Actions</span>}
        </div>

        <div className="">
          {isLoading ? <Loader/> : tableData.map(
            (
              row: { [s: string]: unknown } | ArrayLike<unknown> | any,
              index: number
            ) => {
              return (
                <div
                  
                  key={index}
                  className="flex justify-between items-center bg-primary-white p-2  border-table-border border-b-[1px] hover:bg-header-bg w-full min-w-fit duration-100 ease-in-out"
                >
                  {Object.values(row).map((data: any, key: number) => {
                    return (
                      <span
                        onClick={(e)=>{e.stopPropagation(); onClickRowCb && key==1 &&  onClickRowCb(row.id) }}
                        style={{
                        width: columnWidth[key],
                        minWidth:columnWidth[key],
                        maxWidth:columnWidth[key],
                      }}
                        key={key}
                        className={clsx(`text-left ${key==1 && onClickRowCb &&  'cursor-pointer  hover:underline-offset-4 hover:text-dark-orange duration-100 ease-in-out'}`)}
                      >
                        {key == 0 && columns[0].name=="Sr no." ? index + 1 + ((pageNum-1)*perPage): data}
                      </span>
                    );
                  })}
                  {isActions && <span className="text-center font-medium w-[100px] flex justify-center items-center gap-3">
                    
                       {actions?.map((action,key)=><span className="cursor-pointer" key={key} onClick={()=>{ action.onClickCb(row.id)}}>{action.content}</span>)}
                    
                    </span>}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Table;
