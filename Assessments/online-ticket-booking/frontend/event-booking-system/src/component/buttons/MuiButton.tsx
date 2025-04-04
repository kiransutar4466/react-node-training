


import { Button } from '@mui/material';

const MuiButton = ({ bgcolor, color, text, onClickCB }:any) => {
  return (
    <Button 
      style={{ backgroundColor: bgcolor, color: color, fontSize: '12px', cursor: 'pointer' }} 
      onClick={onClickCB}
    >
      {text}
    </Button>
  );
};

export default MuiButton;
