import { Collapse, List, Spin, Typography } from 'antd'
import { useGetCompletedBooksQuery, ICompletedReading } from '../../store/books.api'

const { Panel } = Collapse
const { Title } = Typography

interface GroupedReading {
    book: ICompletedReading['book']
    authors: ICompletedReading['authors']
    edition: ICompletedReading['edition']
    readings: ICompletedReading[]
}

function formatReading(groupedReading: GroupedReading) {
    const { book, authors, edition, readings } = groupedReading
    const authorNames = authors.map((author) => author.name).join(', ')
    const dates = readings.map((r) => (r.endDate ? new Date(r.endDate).toLocaleDateString() : 'X')).join(', ')
    const duration = edition.hoursDuration ? `(${edition.hoursDuration}ч)` : ''
    const comment = readings[readings.length - 1].comment ? `(${readings[readings.length - 1].comment})` : ''
    const publishYear = edition.year ? `(${edition.year})` : ''

    return `${book.title} ${publishYear} - ${authorNames} [${dates}] ${duration} ${comment}`
}

function groupReadings(readings: ICompletedReading[]): GroupedReading[] {
    const grouped: Record<string, GroupedReading> = {}

    for (const reading of readings) {
        const key = reading.book._id + reading.authors.map((a) => a._id).join('')
        if (!grouped[key]) {
            grouped[key] = {
                book: reading.book,
                authors: reading.authors,
                edition: reading.edition,
                readings: []
            }
        }
        grouped[key].readings.push(reading)
    }

    return Object.values(grouped)
}

export default function CompletedBooksPage() {
    const { data, isLoading, isError } = useGetCompletedBooksQuery()

    if (isLoading) {
        return <Spin />
    }

    if (isError || !data) {
        return <div>Error fetching data</div>
    }

    const { result: groups } = data

    const earliestYear = groups.reduce((min, group) => {
        if (group._id === null) return min
        return group._id < min ? group._id : min
    }, new Date().getFullYear())

    const readingsWithoutYear = groups.find((group) => group._id === null)
    const readingsWithYear = groups.filter((group) => group._id !== null)

    return (
        <div>
            <Title level={1}>Completed Books</Title>
            {readingsWithoutYear && (
                <Collapse>
                    <Panel header={`Before ${earliestYear}`} key="before">
                        <List
                            dataSource={groupReadings(readingsWithoutYear.readings)}
                            renderItem={(groupedReading) => <List.Item>{formatReading(groupedReading)}</List.Item>}
                        />
                    </Panel>
                </Collapse>
            )}
            <Collapse>
                {readingsWithYear.map((group) => (
                    <Panel header={group._id} key={group._id}>
                        <List
                            dataSource={groupReadings(group.readings)}
                            renderItem={(groupedReading) => <List.Item>{formatReading(groupedReading)}</List.Item>}
                        />
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}
