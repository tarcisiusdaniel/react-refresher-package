import { useState } from "react";
import Header from "./components/Header/Header";
import InputsSection from "./components/InputsSection/InputsSection";
import Result from "./components/Result/Result";
import { calculateInvestmentResults } from "./util/investment";

function App() {
  const [inputsValues, setInputValues] = useState({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  });

  let resultToTable = calculateInvestmentResults(inputsValues);

  function handleInputsValuesChanges(inputType, inputValue) {
    setInputValues((prevInputValue) => {
      const value = (inputValue === "") ? 0 : inputValue;
      return {
        ...prevInputValue,
        [inputType]: Number(value),
      }
    })
  }

  return (
    <>
      <Header />
      <InputsSection handleInputsValuesChanges = {handleInputsValuesChanges}/>
      {/* The condition for the ternary rendering depends on what you want. */}
      {/* I decided to only check the duration since there wont be results when the duration 0 or below */}
      {(inputsValues.duration <= 0) ? 
        <p className = "center">The duration must be greater than 0.</p> 
        : 
        <Result tableResult = {resultToTable}/>}
    </>
  )
}

export default App
