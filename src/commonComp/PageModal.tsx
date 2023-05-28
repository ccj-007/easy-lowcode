import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import { useCtx } from '@/hooks';
import useStore, { setBaseURL, setProjectName, setRouteName } from "@/store";

type Props = {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
}

type FromProp = {
    projectName: string
    routeName: string
    baseURL: string
}

const PageModal: React.FC<Props> = (props) => {
    const { isModalOpen, handleCancel, handleOk } = props
    const { projectName, routeName, baseURL } = useStore((state) => state)
    const [form] = Form.useForm();
    const { api } = useCtx()

    const onFinish = (values: FromProp) => {
        console.log('Success:', values);
        setProjectName(values.projectName)
        setRouteName(values.routeName)
        setBaseURL(values.baseURL)
        api && api.success({
            message: `配置成功 ！`,
            description: `你已成功进入${projectName}的${routeName}页面`,
        });
    };

    return (
        <Modal footer={false} title="配置低代码页面" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
                initialValues={{ projectName, routeName, baseURL }}
            >
                <Form.Item label="项目名" name='projectName' rules={[{ required: true, message: 'Please input your item name!' }]}>
                    <Input placeholder="输入你的项目名" />
                </Form.Item>
                <Form.Item label="路由名" name='routeName' rules={[{ required: true, message: 'Please input your route name!' }]}>
                    <Input placeholder="输入你的路由名" />
                </Form.Item>
                <Form.Item label="根路径" name='baseURL' rules={[{ required: true, message: 'Please input your baseURL!' }]}>
                    <Input placeholder="输入你的根路径" />
                </Form.Item>
                <Form.Item  >
                    <Button type="primary" htmlType="submit">保存设置</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PageModal;