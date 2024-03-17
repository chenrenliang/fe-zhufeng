import React from "react";

const warningFunc = () => {
    console.warn(false, '无法找到FormContext. 请确定你是在Form下面使用Field');
};

const Context = React.createContext({
    getFieldValue: warningFunc,
    getFieldsValue: warningFunc,
    setFieldsValue: warningFunc,
    submit: warningFunc,
});

export default Context;
