import { useState } from "react";


const inputs = [
    {label: 'Initial Investment', type: 'initialInvestment'},
    {label: 'Annual Investment', type: 'annualInvestment'},
    {label: 'Expected Return', type: 'expectedReturn'},
    {label: 'Duration', type: 'duration'},
];

export default function InputsSection({handleInputsValuesChanges}) {
    function handleInputChange(event, inputType) {
        handleInputsValuesChanges(inputType, event.target.value);
    }

    return (
            <section id = "user-input">
                <div className = "input-group">
                    {
                        inputs.map((input, index) => {
                            return (
                                <span key = {index}>
                                    <label>{input.label}</label>
                                    <input type = "number" onChange = {() => handleInputChange(event, input.type)} />
                                </span>
                            );
                        })
                    }
                </div>
            </section>
    );
}