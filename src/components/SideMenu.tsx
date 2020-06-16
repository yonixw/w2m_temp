import React, {useState} from 'react';

import {
    FolderAddOutlined,
    EditOutlined,
    BookOutlined,
    SaveOutlined
  } from '@ant-design/icons';
import { Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

export default function SideMenu(setSelected:(a:string)=>void) {
    return (
        <Menu onClick={(p)=>setSelected(p.key)}
            theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<FolderAddOutlined />}>
                Load Files
            </Menu.Item>
            <Menu.Item key="2" icon={<EditOutlined />}>
                Edit Chapters
            </Menu.Item>
            <Menu.Item key="3" icon={<BookOutlined />}>
                Bind
            </Menu.Item>
            <Menu.Item key="4" icon={<SaveOutlined />}>
                Export PDF
            </Menu.Item>
            <Menu.Item key="5" icon={<GithubOutlined />}>
                About
            </Menu.Item>
            
            {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
        </Menu>
    )
}