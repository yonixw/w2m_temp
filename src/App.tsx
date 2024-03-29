import React, { useState } from 'react';
import './App.css';
import FolderChooser from './components/FolderChooser';



import { Layout, Breadcrumb, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { FullDescription, githubUrl } from './info';
import SideMenu from './components/SideMenu';
import LoadFileContent from './components/1LoadFiles/LoadFilesContent';
import EditFileContent from './components/2Edit/EditContent';

//https://dev.to/nicolasrannou/web-workers-in-create-react-app-cra-without-unmounting-4865
//https://stackoverflow.com/questions/61382521/using-webwoker-with-create-react-app-and-typescript
import * as Comlink from 'comlink';

/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./WebWorker/ImageJobs';
import { IWorker } from './WebWorker/ImageJobs';
const worker = new Worker();
export const ImageJobs = Comlink.wrap<IWorker>(worker);

const { Header, Content, Footer, Sider } = Layout;


let sessionID = `${Math.random()}-${Date.now}`;
function App() {
  const [menuKey, setMenuKey] = useState("1");

  const chooseContent = (menuKey:string) => {
      switch(menuKey) {
        case "1":
          return LoadFileContent;
        case "2":
          return EditFileContent;
        default:
          return ()=>{return <div>No content</div>}
      }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">

        <Header style={{ color: "white", fontWeight: "bold" }} >
          <Space size="middle">
            <a href={githubUrl} target="_blank"><GithubOutlined /></a>
            <span>{FullDescription}</span>
          </Space>
        </Header>

        <Layout>
          <Sider>
            {SideMenu((a: string) => { console.log(a); setMenuKey(a); })}
          </Sider>

          <Layout>
            <Content style={{ margin: '0 16px' }} >
              {chooseContent(menuKey)()}
            </Content>
            <Footer style={{ textAlign: 'center' }}>{FullDescription}©</Footer>
          </Layout>

        </Layout>

      </Layout>
    </Layout>
  );
}

export default App;
