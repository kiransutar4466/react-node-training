import {useState, useEffect} from "react"

const useIsVisible = (ref: React.RefObject<HTMLElement>|any) => {
const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

useEffect(()=>{
    const observer = new IntersectionObserver(([entry]) => 
        setIsIntersecting(entry.isIntersecting)
      );
  
   
      observer.observe(ref?.current);
  
   
      return () => {
        observer.disconnect();
      };
},[ref])
  return isIntersecting;
}

export default useIsVisible