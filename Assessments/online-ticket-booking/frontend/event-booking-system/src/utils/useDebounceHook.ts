

import { useEffect, useState } from 'react'

export const useDebounceHook = (value:any,delay=1000) => {
    const [debounceValue,setDebounceValue]=useState("")

    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebounceValue(value)
        },delay)
        return ()=>{
            clearTimeout(handler)
        }
    },[value,delay])
  return debounceValue;
}
