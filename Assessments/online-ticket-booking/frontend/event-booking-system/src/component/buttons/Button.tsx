
type buttontext={
    text?:string;
    onClickCB:any,
    bgColor:string;
    icon:any;
    
    textColor:string;
   
}
const Button = ({text,onClickCB,icon}:buttontext) => {


  return (
        <button className={`p-2 px-4 bg-[black] text-white cursor-pointer  flex items-center justify-center rounded-[8px]`} onClick={onClickCB}>{icon?icon:text}</button>
  )
}

export default Button