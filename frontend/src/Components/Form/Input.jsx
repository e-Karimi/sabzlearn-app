import React, { useEffect, useReducer } from 'react'
import validate from './../../validators/validate'
import './Input.css'

const inputReducer = (state, action) => {

    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validations)
            }

        default:
            return state
    }
}


export default function Input(props) {
    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

    const { loginDispatchHandler,enrollDispatchHandler, inputId ,formId} = props
    const { value, isValid } = inputState

    useEffect(() => {
        if(formId === 'login'){
            loginDispatchHandler(inputId, value, isValid);
        }else{
            enrollDispatchHandler(inputId, value, isValid);
        }
       
    }, [value])



    const changeHandler = (e) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validations: props.validations,
        })
    }

    const element = props.element === 'textarea' ? (
        <textarea
            id={props.inputId}
            className={`${props.className} ${inputState.isValid ? 'success' : 'error'}`}
            placeholder={props.placeholder}
            value={inputState.value}
            onChange={changeHandler}
        />

    ) : (
        <input
            id={props.inputId}
            className={`${props.className} ${inputState.isValid ? 'success' : 'error'}`}
            placeholder={props.placeholder}
            type={props.type}
            value={inputState.value}
            onChange={changeHandler}
        />
    );

    return (
        <>
            {element}
        </>
    )
}
