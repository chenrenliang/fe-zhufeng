import  {useRef, useState} from "react";

class FormStore {
    store = {}
    fieldEntities = []
    initialValues = {}
    callbacks = {}
    constructor(forceRootUpdate) {
        this.forceRootUpdate = forceRootUpdate
    }

    getForm = () => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,
        setFieldsValue: this.setFieldsValue,
        setInitialValues: this.setInitialValues,
        setCallbacks: this.setCallbacks,
        registerField: this.registerField,
        submit: this.submit,
    })

    setInitialValues = (initialValues) => {
        this.store = { ...initialValues };
    };
    setCallbacks = (callbacks) => {
        this.callbacks = callbacks;
    };
    getFieldValue = (name) => {
        return this.store[name];
    };
    getFieldsValue = () => {
        return this.store;
    }

    registerField = (entity) => {
        this.fieldEntities.push(entity);
    };

    setFieldsValue = (store) => {
        this.store = { ...this.store, ...store };
        this.fieldEntities.forEach(({ onStoreChange }) => {
            onStoreChange();
        });
    };

    submit = () => {
        const { onFinish } = this.callbacks;
        if (onFinish) {
            onFinish(this.store);
        }
    };


}

export default function useForm(form) {
    const formRef = useRef()
    const [, forceUpdate] = useState({})

    if(!formRef.current) {
        if(form) {
            formRef.current = form
        } else {
            const forceReRender = () => {
                forceUpdate({})
            }

            const formStore = new FormStore(forceReRender)
            formRef.current = formStore.getForm()
        }
    }

    return [formRef.current]
}

