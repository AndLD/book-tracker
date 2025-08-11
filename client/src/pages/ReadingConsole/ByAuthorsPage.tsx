import { useState } from 'react'
import { Collapse, List, Radio, Space, Typography } from 'antd'
import { useGetAuthorsQuery } from '../../store/authors.api'
import { useGetBooksQuery } from '../../store/books.api'

const { Title } = Typography
const { Panel } = Collapse

export default function ByAuthorsPage() {
    const [authorSort, setAuthorSort] = useState('name')
    const [bookSort, setBookSort] = useState('name')

    const { data: authors, isLoading: isAuthorsLoading } = useGetAuthorsQuery()
    const { data: books, isLoading: isBooksLoading } = useGetBooksQuery()

    const sortedAuthors = authors?.result
        ? [...authors.result].sort((a, b) => {
              if (authorSort === 'name') {
                  return a.name.localeCompare(b.name)
              }
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
        : []

    const getBooksByAuthor = (authorId: string) => {
        const authorBooks = books?.result?.filter((book) => book.authorIds.includes(authorId)) || []
        return authorBooks.sort((a, b) => {
            if (bookSort === 'name') {
                return a.title.localeCompare(b.title)
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
    }

    return (
        <div>
            <Title level={2}>By Authors</Title>
            <Space style={{ marginBottom: 16 }}>
                <Radio.Group value={authorSort} onChange={(e) => setAuthorSort(e.target.value)}>
                    <Radio.Button value="name">Sort Authors by Name</Radio.Button>
                    <Radio.Button value="createdAt">Sort Authors by Date</Radio.Button>
                </Radio.Group>
                <Radio.Group value={bookSort} onChange={(e) => setBookSort(e.target.value)}>
                    <Radio.Button value="name">Sort Books by Name</Radio.Button>
                    <Radio.Button value="createdAt">Sort Books by Date</Radio.Button>
                </Radio.Group>
            </Space>
            <Collapse ghost size="small">
                {sortedAuthors.map((author) => (
                    <Panel header={author.name} key={author._id}>
                        <List
                            style={{ paddingLeft: '40px' }}
                            dataSource={getBooksByAuthor(author._id)}
                            renderItem={(book) => (
                                <List.Item
                                    style={{
                                        display: 'list-item',
                                        listStyleType: 'disc',
                                        margin: 0,
                                        padding: '0 0 8px'
                                    }}
                                >
                                    {book.title}
                                </List.Item>
                            )}
                        />
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}
