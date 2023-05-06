import { useReducer } from "react";
import "./style.css"

import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete_digit',
  EVALUATE: 'evaluate'
}

function reducer (state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          current: payload.digit,
          overwrite: false
      }
      }
      if(payload.digit === "0" && state.current === 0){
        return state
      } 
      if(payload.digit === "." && state.current.includes(".")){
        return state 
      } 
      return{
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.current == null && state.history == null) {
          return state
        }

        if (state.history == null) {
          return {
            ...state,
            operator: payload.operator,
            history: state.current,
            current: null
          }
        }

        return{
          ...state,
          history: evaluate(state),
          operator: payload.operator,
          current: null
        }
      case ACTIONS.CLEAR:
        return{}
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            current: null,
            overwrite: false
          }
        }
        if(state.current == null) return state
        if(state.current.length === 1){
          return {...state, current: null}
        }
        return {
          ...state,
          current: state.current.slice(0,-1)
        }
      case ACTIONS.EVALUATE:
        if(
          state.operator == null ||
          state.current  == null ||
          state.history == null 
        ){
          return state
        }

        return {
          ...state,
          
          history: null,
          operator: null,
          current: evaluate(state)
        }

  }

}


function evaluate({current, history, operator}){
  const hist = parseFloat(history)
  const cur = parseFloat(current)

  if(isNaN(hist) || isNaN(cur)) return ""
  let computation = ""
  switch(operator){
    case "+":
      computation = hist + cur
      break
    case "-":
        computation = hist - cur
        break
    case "*":
        computation = hist * cur
        break
    case "÷":
        computation = hist / cur
        break
  }

  return computation

}

function App() {
  const [{current, history, operator}, dispatch] = useReducer(
    reducer, 
    {}
  )

  // dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}})
  return (
    <div className="layout-grid">
      <div className="output">
        <div className="history-showup">{history} {operator}</div>
          <div className="present-showup">{current}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type:ACTIONS.DELETE_DIGIT})}>DELETE</button>
      {/* <button>DELETE</button> */}
      <OperatorButton operator="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperatorButton operator="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperatorButton operator="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperatorButton operator="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
      


    </div>

  );
}

export default App;
