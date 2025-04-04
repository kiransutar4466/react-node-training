import { ReactNode } from "react"

export type tablePropsTypes = {
    tableData:any[],
    columns:{
     name:string,
     width:string
    }[],
    isActions:boolean,
    actions?:{content:ReactNode|string, onClickCb:Function}[],
    pageNum:number,
    perPage:number,
    isLoading:boolean,
    onClickRowCb?:Function

}