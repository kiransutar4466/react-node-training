import { ReactNode } from "react"

const Card = ({title, subtitle, icon}:{title:string, subtitle:string, icon:ReactNode}) => {
  return (
    <>
    <div className="bg-primary-white min-w-[300px] rounded-xl border-1 text-primary-black flex justify-between p-3 items-center w-fit">
      <div><div className="text-2xl font-bold">{title}</div>
      <div className="">{subtitle}</div></div>
      <div>{icon}</div>
    </div>
    </>
  )
}

export default Card