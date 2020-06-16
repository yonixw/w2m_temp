import React, {useState, useEffect} from 'react';
import { Breadcrumb } from 'antd';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadProps, RcFile } from 'antd/lib/upload';

import { buildInputFile, execute } from 'wasm-imagemagick'


const { Dragger } = Upload;
//https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
//https://stackoverflow.com/questions/5826286/how-do-i-use-google-chrome-11s-upload-folder-feature-in-my-own-code?lq=1
//https://www.lucidchart.com/techblog/2018/01/03/folder-upload-in-an-angular-app/
//https://github.com/facebook/react/issues/3468
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory


export default function LoadFileContent() {
    const [flist, setFlist] = useState<RcFile[]>([]);

    const customID = "zfcfaf13212321"

    const props : UploadProps = {
        name: 'file',
        multiple: true,
        action: 'http://local',
        onChange(info: UploadChangeParam)  {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        beforeUpload(file: RcFile, FileList: RcFile[]) : boolean {
            setFlist([...flist, file]);
            return false;
        }
    };

    let makeDirectoryUpload = (x: HTMLElement | null) => {
        //document.querySelector("input[type=file]")

        //x?.setAttribute("directory","");
        x?.setAttribute("webkitdirectory","");
        //x?.setAttribute("mozdirectory","");
        //x?.setAttribute("multiple","");
    }


    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background">
               <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger> 
                <input id={customID} ref={x=>makeDirectoryUpload(x)} type="file" onChange={(e)=>console.log(e)} multiple />
            </div>
        </>
    )
}