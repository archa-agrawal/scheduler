import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  
  const transition = (newMode, option) => {
    
    if (!option) {
      const newHistory = [...history];
      newHistory.push(newMode)
      setHistory(newHistory)
    }  
    setMode(newMode)
  }
  const back = () => {
    if(history.length > 1){
      const newHistory = [...history];
      newHistory.pop()
      setMode(newHistory[newHistory.length -1]);
      setHistory(newHistory)
    }
  }
  return {mode, transition, back}

}
export default useVisualMode;