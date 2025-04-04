import { ReactNode } from "react"

export type buttonPropsTypes={

    btnContent:string | ReactNode,
    onClickCb?:Function ,
    classNames?:string
    color:string,
    bgColor?:string,
    width:string,
    type?:"submit" | "reset" | "button" | undefined
}