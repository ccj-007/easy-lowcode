import { useContext } from 'react'
import { Context } from "../App";

const useCtx = () => {
  const ctx = useContext(Context)
  return ctx
}

export default useCtx