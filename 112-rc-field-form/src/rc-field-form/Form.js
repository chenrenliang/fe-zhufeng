import React, {useRef} from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";


const Form = ({ initialValues, onFinish, children }) => {
    const [formInstance] = useForm()
    formInstance.setCallbacks({
        onFinish
    })

    const mountRef = useRef(null)
    formInstance.setInitialValues(initialValues, !mountRef.current)
    if(!mountRef.current) {
        mountRef.current = true
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                event.stopPropagation()
                formInstance.submit()
            }}
        >
            <FieldContext.Provider value={formInstance}>
                { children }
            </FieldContext.Provider>
        </form>
    )

}

export default Form
