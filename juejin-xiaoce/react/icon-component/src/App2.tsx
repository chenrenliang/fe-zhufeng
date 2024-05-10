import React from 'react';
import { Space } from 'antd';
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})


const App = () => (
    <Space>
        <IconFont type={'icon-tuichu'} />
        <IconFont type={'icon-facebook'} />
        <IconFont type={'icon-twitter'} />
    </Space>
)

export default  App