import React, { useEffect, useState } from 'react'
import {
    Typography,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Row,
    Col,
    Statistic,
    message,
    Select,
    Space,
    DatePicker,
    Collapse,
    Divider
} from 'antd'
import {
    PlusOutlined,
    BookOutlined,
    ReadOutlined,
    CheckCircleOutlined,
    UserOutlined,
    StarOutlined,
    LaptopOutlined,
    AudioOutlined,
    SoundOutlined
} from '@ant-design/icons'
import { useAddBookMutation } from '../../store/books.api'
import { BookEditionType } from '@lib/utils/interfaces/bookEditions'
import { useGetAuthorsQuery, useAddAuthorMutation } from '../../store/authors.api'
import { useGetGenresQuery, useAddGenreMutation } from '../../store/genres.api'

const { Title, Text } = Typography
const { Option } = Select
const { Panel } = Collapse

import LanguageSelect from '../../components/LanguageSelect'

const editionTypeOptions = {
    [BookEditionType.PAPER]: { label: 'Paper', icon: <BookOutlined /> },
    [BookEditionType.ELECTRONIC]: { label: 'Electronic', icon: <LaptopOutlined /> },
    [BookEditionType.AUDIOBOOK]: { label: 'Audiobook', icon: <AudioOutlined /> },
    [BookEditionType.RADIO_PLAY]: { label: 'Radio Play', icon: <SoundOutlined /> }
}

export default function DashboardPage() {
    const [isAddBookModalVisible, setIsAddBookModalVisible] = useState(false)
    const [isAddAuthorModalVisible, setIsAddAuthorModalVisible] = useState(false)
    const [isAddGenreModalVisible, setIsAddGenreModalVisible] = useState(false)

    const [addBookForm] = Form.useForm()
    const [addAuthorForm] = Form.useForm()
    const [addGenreForm] = Form.useForm()

    const editionType = Form.useWatch('type', addBookForm)
    const editionLanguage = Form.useWatch('language', addBookForm)
    const originalLanguage = Form.useWatch('originalLn', addBookForm)

    const [addBook, { isLoading: isAddBookLoading }] = useAddBookMutation()
    const [addAuthor, { isLoading: isAddAuthorLoading }] = useAddAuthorMutation()
    const [addGenre, { isLoading: isAddGenreLoading }] = useAddGenreMutation()

    const { data: authors, isLoading: isAuthorsLoading } = useGetAuthorsQuery()
    const { data: genres, isLoading: isGenresLoading } = useGetGenresQuery()

    const showAddBookModal = () => {
        setIsAddBookModalVisible(true)
    }

    const handleAddBookOk = () => {
        addBookForm
            .validateFields()
            .then(async (values) => {
                try {
                    await addBook({
                        book: {
                            title: values.title,
                            authorIds: values.authorIds || [],
                            genreIds: values.genreIds || [],
                            rating: 0,
                            disableRating: false,
                            originalTitle: values.originalTitle,
                            originalLn: values.originalLn,
                            firstPublishedYear: values.firstPublishedYear,
                            description: values.description
                        },
                        edition: {
                            type: values.type,
                            hoursDuration: values.hoursDuration,
                            readers: values.readers,
                            publisher: values.publisher,
                            year: values.year,
                            language: values.language,
                            translators: values.translators,
                            isbn: values.isbn,
                            imageUrl: values.imageUrl,
                            colorPalette: []
                        }
                    }).unwrap()
                    message.success('Book added successfully!')
                    setIsAddBookModalVisible(false)
                    addBookForm.resetFields()
                } catch (error) {
                    message.error('Failed to add book.')
                    console.error('Failed to add book:', error)
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info)
            })
    }

    const handleAddBookCancel = () => {
        setIsAddBookModalVisible(false)
        addBookForm.resetFields()
    }

    const showAddAuthorModal = () => {
        setIsAddAuthorModalVisible(true)
    }

    const handleAddAuthorOk = () => {
        addAuthorForm
            .validateFields()
            .then(async (values) => {
                try {
                    const birthDate = values.birthDate ? values.birthDate.valueOf() : undefined
                    const deathDate = values.deathDate ? values.deathDate.valueOf() : undefined

                    const { result: newAuthor } = await addAuthor({
                        ...values,
                        birthDate,
                        deathDate,
                        rating: 0,
                        disableRating: false,
                        colorPalette: []
                    }).unwrap()
                    message.success('Author added successfully!')
                    setIsAddAuthorModalVisible(false)
                    addAuthorForm.resetFields()

                    setTimeout(() => {
                        const currentAuthorIds = addBookForm.getFieldValue('authorIds') || []
                        addBookForm.setFieldsValue({
                            authorIds: [...currentAuthorIds, newAuthor._id]
                        })
                    }, 0)
                } catch (error) {
                    message.error('Failed to add author.')
                    console.error('Failed to add author:', error)
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info)
            })
    }

    const handleAddAuthorCancel = () => {
        setIsAddAuthorModalVisible(false)
        addAuthorForm.resetFields()
    }

    const showAddGenreModal = () => {
        setIsAddGenreModalVisible(true)
    }

    const handleAddGenreOk = () => {
        addGenreForm
            .validateFields()
            .then(async (values) => {
                try {
                    const { result: newGenre } = await addGenre({ name: values.name }).unwrap()
                    message.success('Genre added successfully!')
                    setIsAddGenreModalVisible(false)
                    addGenreForm.resetFields()

                    setTimeout(() => {
                        const currentGenreIds = addBookForm.getFieldValue('genreIds') || []
                        addBookForm.setFieldsValue({
                            genreIds: [...currentGenreIds, newGenre._id]
                        })
                    }, 0)
                } catch (error) {
                    message.error('Failed to add genre.')
                    console.error('Failed to add genre:', error)
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info)
            })
    }

    const handleAddGenreCancel = () => {
        setIsAddGenreModalVisible(false)
        addGenreForm.resetFields()
    }

    return (
        <div>
            <Title level={2}>Reading Dashboard</Title>
            <Text type="secondary">Track your reading journey and discover insights</Text>

            <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddBookModal}>
                    Add Book
                </Button>
            </div>

            <Row gutter={16}>
                <Col span={4}>
                    <Statistic title="Books Total" value={2500} prefix={<BookOutlined />} />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        (Read + Planned + Recommendations)
                    </Text>
                </Col>
                <Col span={4}>
                    <Statistic title="Books Read" value={247} prefix={<ReadOutlined />} />
                </Col>
                <Col span={4}>
                    <Statistic title="Books in Reading Plan" value={2134} prefix={<CheckCircleOutlined />} />
                </Col>
                <Col span={4}>
                    <Statistic title="Authors" value={312} prefix={<UserOutlined />} />
                </Col>
                <Col span={4}>
                    <Statistic title="Unique Recommendations" value={89} prefix={<StarOutlined />} />
                </Col>
            </Row>

            <Modal
                title="Add New Book"
                open={isAddBookModalVisible}
                onOk={handleAddBookOk}
                onCancel={handleAddBookCancel}
                okText="Add Book"
                confirmLoading={isAddBookLoading}
            >
                <Form form={addBookForm} layout="vertical" name="add_book_form">
                    <h3>Book Info</h3>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title of the book!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="authorIds" label="Author">
                        <Space.Compact style={{ width: '100%' }}>
                            <Select
                                mode="multiple"
                                allowClear
                                showSearch
                                placeholder="Select authors"
                                loading={isAuthorsLoading}
                                options={authors?.result?.map((author) => ({ value: author._id, label: author.name }))}
                            />
                            <Button onClick={showAddAuthorModal} icon={<PlusOutlined />} />
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item
                        name="genreIds"
                        label="Genre"
                        rules={[{ required: true, message: 'Please select at least one genre!' }]}
                    >
                        <Space.Compact style={{ width: '100%' }}>
                            <Select
                                mode="multiple"
                                allowClear
                                showSearch
                                placeholder="Select genres"
                                loading={isGenresLoading}
                                options={genres?.result?.map((genre) => ({ value: genre._id, label: genre.name }))}
                            />
                            <Button onClick={showAddGenreModal} icon={<PlusOutlined />} />
                        </Space.Compact>
                    </Form.Item>
                    <Collapse
                        ghost
                        items={[
                            {
                                key: '1',
                                label: 'Advanced fields',
                                children: (
                                    <>
                                        <Form.Item name="originalTitle" label="Original Title">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="originalLn" label="Original Language">
                                            <LanguageSelect
                                                allowClear
                                                showSearch
                                                placeholder="Select original language"
                                            />
                                        </Form.Item>
                                        <Form.Item name="firstPublishedYear" label="First Published Year">
                                            <InputNumber style={{ width: '100%' }} min={0} />
                                        </Form.Item>
                                        <Form.Item name="description" label="Description">
                                            <Input.TextArea rows={4} />
                                        </Form.Item>
                                    </>
                                )
                            }
                        ]}
                    />

                    <Divider />

                    <h3>Edition Info</h3>
                    <Form.Item
                        name="type"
                        label="Edition Type"
                        rules={[{ required: true, message: 'Please select an edition type!' }]}
                    >
                        <Select
                            allowClear
                            placeholder="Select edition type"
                            onChange={(value) => addBookForm.setFieldsValue({ type: value })}
                        >
                            {Object.values(BookEditionType).map((type) => (
                                <Option key={type} value={type}>
                                    <Space>
                                        {editionTypeOptions[type].icon}
                                        {editionTypeOptions[type].label}
                                    </Space>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {editionType === BookEditionType.AUDIOBOOK || editionType === BookEditionType.RADIO_PLAY ? (
                        <>
                            <Form.Item name="hoursDuration" label="Hours Duration">
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                            <Form.Item name="readers" label="Readers">
                                <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
                            </Form.Item>
                        </>
                    ) : null}

                    <Collapse
                        ghost
                        items={[
                            {
                                key: '2',
                                label: 'Advanced fields',
                                children: (
                                    <>
                                        <Form.Item name="publisher" label="Publisher">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="year" label="Year">
                                            <InputNumber style={{ width: '100%' }} min={0} />
                                        </Form.Item>
                                        <Form.Item name="language" label="Language">
                                            <LanguageSelect
                                                allowClear
                                                showSearch
                                                placeholder="Select language"
                                                onChange={(value) => addBookForm.setFieldsValue({ language: value })}
                                            />
                                        </Form.Item>

                                        {editionLanguage !== originalLanguage ? (
                                            <Form.Item name="translators" label="Translators">
                                                <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
                                            </Form.Item>
                                        ) : null}

                                        <Form.Item name="isbn" label="ISBN">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="imageUrl" label="Image URL">
                                            <Input />
                                        </Form.Item>
                                    </>
                                )
                            }
                        ]}
                    />
                </Form>
            </Modal>

            <Modal
                title="Add New Author"
                open={isAddAuthorModalVisible}
                onOk={handleAddAuthorOk}
                onCancel={handleAddAuthorCancel}
                okText="Add Author"
                confirmLoading={isAddAuthorLoading}
            >
                <Form form={addAuthorForm} layout="vertical" name="add_author_form">
                    <Form.Item
                        name="name"
                        label="Author Name"
                        rules={[{ required: true, message: "Please input the author's name!" }]}
                    >
                        <Input />
                    </Form.Item>
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
                </Form>
            </Modal>

            <Modal
                title="Add New Genre"
                open={isAddGenreModalVisible}
                onOk={handleAddGenreOk}
                onCancel={handleAddGenreCancel}
                okText="Add Genre"
                confirmLoading={isAddGenreLoading}
            >
                <Form form={addGenreForm} layout="vertical" name="add_genre_form">
                    <Form.Item
                        name="name"
                        label="Genre Name"
                        rules={[{ required: true, message: "Please input the genre's name!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
