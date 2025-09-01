import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "./counterSlice";

const Counter = () => {
  //state bilgilerine useSelector ile erişiliyor
  const value = useSelector((state) => state.counter.value);
  //metotlara ise useDispatch ile erişiyoruz
  const dispatch = useDispatch();

  return (
    <>
      <Typography>{value}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByValue(5))}>
          Increment By Value
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Counter;
