import { CircularProgress } from '@mui/material';
import React from 'react'

const Loader = () => {
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center bg-[#ffffff81]">
        <CircularProgress size="50px" />

</div>
  )
}

export default Loader