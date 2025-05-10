import {useState, useEffect} from 'react'

const useDebounce = ({value, delay}:{value:string, delay:number}) => {
  const [debounceValue, setDebounceValue] = useState<string>("")

  const timeOut = setTimeout(()=>setDebounceValue(value),delay)
  const debounceHandler = ()=> timeOut
 
  useEffect(()=>{
    debounceHandler()

    return ()=>{
      clearTimeout(timeOut)
    }

  },[value, delay])

  return debounceValue;
}

export default useDebounce