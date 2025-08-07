import React from 'react'
import { Modal, Form, Input, DatePicker, Collapse } from 'antd'
import LanguageSelect from '../LanguageSelect'

interface AddNewPersonModalProps {
    open: boolean
    onOk: () => void
    onCancel: () => void
    form: any
    title: string
    nameLabel: string
    nameRulesMessage: string
    loading: boolean
}

const AddNewPersonModal: React.FC<AddNewPersonModalProps> = ({
    open,
    onOk,
    onCancel,
    form,
    title,
    nameLabel,
    nameRulesMessage,
    loading
}) => {
    return (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} okText="Add" confirmLoading={loading}>
            <Form form={form} layout="vertical" name="add_person_form">
                <Form.Item name="name" label={nameLabel} rules={[{ required: true, message: nameRulesMessage }]}>
                    <Input />
                </Form.Item>
                <Collapse ghost>
                    <Collapse.Panel header="Advanced fields" key="1">
                        <Form.Item name="englishName" label="English Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="nativeLn" label="Native Language">
                            <LanguageSelect allowClear showSearch placeholder="Select native language" />
                        </Form.Item>
                        <Form.Item name="bio" label="Bio">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="birthDate" label="Birth Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="deathDate" label="Death Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="imageUrl" label="Image URL">
                            <Input />
                        </Form.Item>
                    </Collapse.Panel>
                </Collapse>
            </Form>
        </Modal>
    )
}

export default AddNewPersonModal
