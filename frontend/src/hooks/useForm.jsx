import { useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {

        case 'INPUT_CHANGED': {
            let isFormValid = true;

            for (let inputID in state.inputs) {
                if (inputID === action.inputId) {
                    isFormValid = isFormValid && action.isValid
                } else {
                    isFormValid = isFormValid && state.inputs[inputID].isValid
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isFormValid: isFormValid
            }

        }
        default:
            return state;
    }
}

export default function useForm(initInputs, initIsFormValid) {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initInputs,
        isFormValid: initIsFormValid,
    })

    const dispatchHandler = (inputId, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGED',
            inputId,
            value,
            isValid
        })
    }

    return [formState, dispatchHandler]
}