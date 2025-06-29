import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ru', label: 'Russian' }
    // Add more languages as needed
]

interface LanguageSelectProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    allowClear?: boolean
    showSearch?: boolean
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange, placeholder, allowClear, showSearch }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            allowClear={allowClear}
            showSearch={showSearch}
            placeholder={placeholder}
            filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {languages.map((lang) => (
                <Option key={lang.value} value={lang.value}>
                    {lang.label}
                </Option>
            ))}
        </Select>
    )
}

export default LanguageSelect
