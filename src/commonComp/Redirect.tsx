import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

type Props = {
  to: string
}

const Redirect = (props: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(props.to);
  }, []);
  return (
    <></>
  )
}

export default Redirect