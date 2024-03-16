import React, {MutableRefObject, RefObject, useEffect, useRef, useState} from 'react';
import './index.css';
import { Progress } from 'antd';
import { LoadingOutlined, PaperClipOutlined} from "@ant-design/icons";


type Props = React.PropsWithChildren<{}>

export interface UploadFile {
    file: File;
    percent?: number;
    url?: string;
    uploading?: boolean;
    error?: boolean
}

export type DragProps = React.PropsWithChildren<{
    onUpload: any;
    name: string;
    action: string
}>

const Dragger: React.FC<DragProps> = function (props: DragProps): JSX.Element {

    const [uploadFiles, setUploadFiles] = useState<Array<UploadFile>>([])
    let uploadContainer: MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement>()

    const onDragEnter: (ev: DragEvent) => any = (ev: DragEvent): any => {
        ev.preventDefault();
        ev.stopPropagation();
    };
    const onDragOver = (ev: DragEvent): any => {
        ev.preventDefault();
        ev.stopPropagation();
    };
    const onDragLeave = (ev: DragEvent): any => {
        ev.preventDefault();
        ev.stopPropagation();
    };

    useEffect(() => {
        uploadContainer.current!.addEventListener('dragenter', onDragEnter);
        uploadContainer.current!.addEventListener('dragover', onDragOver);
        uploadContainer.current!.addEventListener('drop', onDrop);
        uploadContainer.current!.addEventListener('dragleave', onDragLeave);
        return () => {
            uploadContainer.current!.removeEventListener('dragenter', onDragEnter);
            uploadContainer.current!.removeEventListener('dragover', onDragOver);
            uploadContainer.current!.removeEventListener('drop', onDrop);
            uploadContainer.current!.removeEventListener('dragleave', onDragLeave);
        }
    })

    const onDrop = (ev: DragEvent): any => {
        ev.preventDefault();
        ev.stopPropagation();
        let transfer: DataTransfer | null = ev.dataTransfer;
        if (transfer && transfer.files) {
            upload(transfer.files);
        }
    };
    function upload(files: DataTransfer['files']) {
        for(let i = 0; i < files.length; i++) {
            let file = files[0]
            let formData=new FormData()
            formData.append("filename", file.name)
            formData.append(props.name, file)
            var xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('POST', props.action, true);
            xhr.responseType = 'json';
            let uploadFile: UploadFile = { file, percent: 0, uploading: true, error: false };

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status === 200) {
                    // debugger;
                    uploadFile.url = xhr.response.url;
                    props.onUpload(uploadFile);
                }
            }

            uploadFiles.push(uploadFile);

            const updateProgress = (event: ProgressEvent) => {
                if (event.lengthComputable) {
                    let percent: number = parseInt((event.loaded / event.total * 100).toFixed(0));
                    uploadFile.percent = percent;
                    if (percent >= 100) {
                        uploadFile.uploading = false;
                    }
                    setUploadFiles([...uploadFiles]);
                }
            }
            xhr.onprogress = updateProgress;
            xhr.upload.onprogress = updateProgress;




            xhr.onerror = function () {
                uploadFile.error = true;
                uploadFile.uploading = false;
                setUploadFiles([...uploadFiles]);
            }
            xhr.ontimeout = function () {
                uploadFile.error = true;
                uploadFile.uploading = false;
                setUploadFiles([...uploadFiles]);
            }
            xhr.send(formData);
        }
    }

    return (
        <>
            <div className={'dragger-container'} ref={uploadContainer as RefObject<HTMLDivElement>}>
                { props.children }
            </div>
            {
                uploadFiles.map((uploadFile: UploadFile, index: number) => (
                    <div key={index}>
                        {
                            !uploadFile.error && ( uploadFile.uploading ? <LoadingOutlined /> : <PaperClipOutlined />)
                        }
                        <span style={{ marginLeft: 10 }}>{uploadFile.file.name}</span>
                        <Progress status={uploadFile.error ? 'exception' : undefined} key={index} percent={uploadFile.percent} />
                    </div>
                ))
            }
        </>
    )
}
export default Dragger;
