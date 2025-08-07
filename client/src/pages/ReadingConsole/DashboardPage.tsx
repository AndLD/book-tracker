import { useState } from 'react'
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
import { useGetReadersQuery, useAddReaderMutation } from '../../store/readers.api'

const { Title, Text } = Typography
const { Option } = Select
const { Panel } = Collapse

import LanguageSelect from '../../components/LanguageSelect'
import AddNewPersonModal from '../../components/modals/AddNewPersonModal'

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
    const [isAddReaderModalVisible, setIsAddReaderModalVisible] = useState(false)

    const [addBookForm] = Form.useForm()
    const [addAuthorForm] = Form.useForm()
    const [addGenreForm] = Form.useForm()
    const [addReaderForm] = Form.useForm()

    const authorIds: string[] = Form.useWatch('authorIds', addBookForm) || []
    const genreIds: string[] = Form.useWatch('genreIds', addBookForm)
    const editionType = Form.useWatch('type', addBookForm)
    const editionLanguage = Form.useWatch('language', addBookForm)
    const originalLanguage = Form.useWatch('originalLn', addBookForm)

    const [addBook, { isLoading: isAddBookLoading }] = useAddBookMutation()
    const [addAuthor, { isLoading: isAddAuthorLoading }] = useAddAuthorMutation()
    const [addGenre, { isLoading: isAddGenreLoading }] = useAddGenreMutation()
    const [addReader, { isLoading: isAddReaderLoading }] = useAddReaderMutation()

    const { data: authors, isLoading: isAuthorsLoading } = useGetAuthorsQuery()
    const { data: genres, isLoading: isGenresLoading } = useGetGenresQuery()
    const { data: readers, isLoading: isReadersLoading } = useGetReadersQuery()

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
                            readerIds: values.readerIds,
                            publisher: values.publisher,
                            year: values.year,
                            language: values.language,
                            translators: values.translators,
                            isbn: values.isbn,
                            imageUrl: values.imageUrl,
                            colorPalette: [],
                            rating: 0,
                            disableRating: false,
                            description: values.editionDescription
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

                    const currentAuthorIds = addBookForm.getFieldValue('authorIds') || []
                    addBookForm.setFieldsValue({
                        authorIds: [...currentAuthorIds, newAuthor._id]
                    })
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

                    const currentGenreIds = addBookForm.getFieldValue('genreIds') || []
                    addBookForm.setFieldsValue({
                        genreIds: [...currentGenreIds, newGenre._id]
                    })
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

    const showAddReaderModal = () => {
        setIsAddReaderModalVisible(true)
    }

    const handleAddReaderOk = () => {
        addReaderForm
            .validateFields()
            .then(async (values) => {
                try {
                    const birthDate = values.birthDate ? values.birthDate.valueOf() : undefined
                    const deathDate = values.deathDate ? values.deathDate.valueOf() : undefined

                    const { result: newReader } = await addReader({
                        ...values,
                        birthDate,
                        deathDate,
                        rating: 0,
                        disableRating: false,
                        colorPalette: []
                    }).unwrap()
                    message.success('Reader added successfully!')
                    setIsAddReaderModalVisible(false)
                    addReaderForm.resetFields()

                    const currentReaderIds = addBookForm.getFieldValue('readerIds') || []
                    addBookForm.setFieldsValue({
                        readerIds: [...currentReaderIds, newReader._id]
                    })
                } catch (error) {
                    message.error('Failed to add reader.')
                    console.error('Failed to add reader:', error)
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info)
            })
    }

    const handleAddReaderCancel = () => {
        setIsAddReaderModalVisible(false)
        addReaderForm.resetFields()
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
                                value={authorIds}
                                onChange={(value) => addBookForm.setFieldsValue({ authorIds: value })}
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
                                value={genreIds}
                                onChange={(value) => addBookForm.setFieldsValue({ genreIds: value })}
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
                            <Form.Item name="readerIds" label="Readers">
                                <Space.Compact style={{ width: '100%' }}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        placeholder="Select readers"
                                        loading={isReadersLoading}
                                        options={readers?.result?.map((reader) => ({
                                            value: reader._id,
                                            label: reader.name
                                        }))}
                                    />
                                    <Button onClick={showAddReaderModal} icon={<PlusOutlined />} />
                                </Space.Compact>
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
                                        <Form.Item name="editionDescription" label="Description">
                                            <Input.TextArea rows={4} />
                                        </Form.Item>
                                    </>
                                )
                            }
                        ]}
                    />
                </Form>
            </Modal>

            <AddNewPersonModal
                open={isAddAuthorModalVisible}
                onOk={handleAddAuthorOk}
                onCancel={handleAddAuthorCancel}
                form={addAuthorForm}
                title="Add New Author"
                nameLabel="Author Name"
                nameRulesMessage="Please input the author's name!"
                loading={isAddAuthorLoading}
            />

            <AddNewPersonModal
                open={isAddReaderModalVisible}
                onOk={handleAddReaderOk}
                onCancel={handleAddReaderCancel}
                form={addReaderForm}
                title="Add New Reader"
                nameLabel="Reader Name"
                nameRulesMessage="Please input the reader's name!"
                loading={isAddReaderLoading}
            />

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
