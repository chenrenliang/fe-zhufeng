import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
//import Dragger from './Dragger';
import { Upload, message } from 'antd';
import { InboxOutlined} from "@ant-design/icons";

import Dragger, { UploadFile, DragProps } from './Dragger';




const props: DragProps = {
    name: 'file',
    action: 'http://localhost:8080/upload',
    onUpload(uploadFile: UploadFile) {
        console.log(uploadFile);
        if (uploadFile.error) {
            message.error(`${uploadFile.file.name} 上传失败!`);
        } else {
            message.success(`${uploadFile.file.name} 上传成功!`);
        }
    },
};
ReactDOM.render(
    <Dragger {...props}><InboxOutlined /></Dragger>,
    document.getElementById('root'),
);
