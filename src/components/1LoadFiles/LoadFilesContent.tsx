import React, {useState, useEffect} from 'react';
import { Breadcrumb, Space, Card, Button } from 'antd';

import { Upload, message, Radio } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadProps, RcFile } from 'antd/lib/upload';

import Jimp, { read } from 'jimp';
import { UploadFile } from 'antd/lib/upload/interface';
import { resolve } from 'dns';
import { rejects } from 'assert';

const { Dragger } = Upload;
//https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
//https://stackoverflow.com/questions/5826286/how-do-i-use-google-chrome-11s-upload-folder-feature-in-my-own-code?lq=1
//https://www.lucidchart.com/techblog/2018/01/03/folder-upload-in-an-angular-app/
//https://github.com/facebook/react/issues/3468
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
//https://stackoverflow.com/questions/29382914/getting-base64-string-from-html-file-upload-element
//https://stackoverflow.com/questions/33306015/pass-submited-file-to-web-worker-by-refference-with-as-little-overhead-as-possib
//      Also: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm    

enum MyUploadType {
    Files, Folder
}

enum MyNameSource {
    Existing, FolderStructure
}

export default function LoadFileContent() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isDirectory, setIsDirectoryUpload] = useState(true);
    const [uploadType, setUploadType] = useState(MyUploadType.Folder);
    const [nameSource, setNameSource] = useState(MyNameSource.FolderStructure);
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    const [imgSrc, setImgSrc] = useState("");

    const props : UploadProps = {
        name: 'file',
        multiple: true,
        onChange(info: UploadChangeParam)  {
            // status is undefined at "add" without upload
            let removed = (info.file.status == "removed");

            // w 
            let fullName = (info.file.originFileObj as any)?.webkitRelativePath || 
                (info.file as any).webkitRelativePath ||
                info.file.name;

            console.log(
                "[On Change]",
                "Added?", !removed,
                "Date", info.file.lastModified || 0,
                "Size", info.file.size,
                "Path", `"${fullName}`
            );

            setFileList(info.fileList);
        },
        beforeUpload (file: RcFile, FileList: RcFile[]) {
            return false;
        }
        };

    const LoadImage = () => {
        let reader = new FileReader();
        let f = fileList[0];
        reader.onloadend = async function () {
            let imageB64 = reader.result as string;
            //setImgSrc();

            let buffer = new Buffer(imageB64.replace(/^data:image\/\w+;base64,/, ""),'base64');
            let img = await Jimp.read(buffer);
            img.greyscale().blur(100);
            var greyScalestring = await img.getBase64Async(Jimp.MIME_PNG);
            setImgSrc(greyScalestring);
        }
        reader.readAsDataURL(f.originFileObj || (f as unknown as File));
    }

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Choose Images</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background">
                <Space direction="vertical" style={{width: "100%"}}>
                    <Card title="Dialog Type">
                        <Radio.Group onChange={e=>setUploadType(e.target.value)} value={uploadType}>
                            <Radio value={MyUploadType.Files}>Files</Radio>
                            <Radio value={MyUploadType.Folder}>Folder (+Subfolders)</Radio>
                        </Radio.Group>
                    </Card>
                    <Radio.Group onChange={e=>setNameSource(e.target.value)} value={nameSource} >
                        <Radio value={MyNameSource.Existing} style={radioStyle}><Button>Add</Button> or Choose:</Radio>
                        <Radio value={MyNameSource.FolderStructure} style={radioStyle}>From folder structure</Radio>
                    </Radio.Group>

                    <Dragger {...props} directory={uploadType==MyUploadType.Folder}  >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag to add <b>files</b></p>
                    </Dragger> 
                    
                </Space>
                <Button onClick={LoadImage}>Load Image</Button>
                <img src={imgSrc} />
            </div>
        </>
    )
}