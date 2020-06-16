import React, {useState} from 'react';
import { Breadcrumb } from 'antd';

export default function EditFileContent() {
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background"
                style={{ padding: 24, backgroundColor: "white" }}>
                Bill is a cat. 2
            </div>
        </>
    )
}