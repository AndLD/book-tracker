import dayjs from 'dayjs'
import { INode, INodePosition } from '@lib/utils/interfaces/nodes.ts'
import { ICategory } from '@lib/utils/interfaces/categories.ts'
import { isProduction } from './constants'

export const Utils = {
    randomInteger(min: number, max: number) {
        // получить случайное число от (min-0.5) до (max+0.5)
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
    },
    // @ts-ignore
    getNodeLabel(node: INode, category?: ICategory) {
        if (!node.payload) {
            return null
        }

        // TODO Andrii Larionov: Remove
        // const titleKey = category?.fields?.find(
        //     (field) => field.type === 'title'
        // )?.name

        let title = node.payload.title

        if (title.length > 20) {
            title = title
                .split(' ')
                .map((word, i) => {
                    if (i % 3 === 0 && i > 0) {
                        return word + '\n'
                    }

                    return word
                })
                .join(' ')
        }

        return (
            node.payload.title +
            (node.payload.startDate
                ? '\n' +
                  dayjs(node.payload.startDate, 'DD.MM.YYYY').format('DD.MM.YYYY').toString() +
                  (node.payload.endDate
                      ? ' - ' + dayjs(node.payload.endDate, 'DD.MM.YYYY').format('DD.MM.YYYY').toString()
                      : '')
                : '')
        )
    },
    getNodeLabelJsx(node: INode) {
        if (!node.payload) {
            return null
        }

        return (
            <>
                <div>{node.payload.title}</div>
                {node.payload.startDate && (
                    <div className="dates">
                        {dayjs(node.payload.startDate, 'DD.MM.YYYY').format('DD.MM.YYYY').toString() +
                            (node.payload.endDate
                                ? ' - ' + dayjs(node.payload.endDate, 'DD.MM.YYYY').format('DD.MM.YYYY').toString()
                                : '')}
                    </div>
                )}
            </>
        )
    },
    renameIdKeyForItems(items: any[]) {
        return items.map(({ _id, ...rest }) => ({
            id: _id,
            ...rest
        }))
    },
    getRandomHexColor() {
        return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    },
    getRandomColor() {
        // TODO Andrii Larionov: Pay attention some of these colors are not handled by CSS, so probably it is required to create some "word to hex" converter to handle color correctly. Generally this method is used choosing random category color, which is rendered in categories list.
        const colors = [
            'magenta',
            'red',
            'volcano',
            'orange',
            'gold',
            'lime',
            'green',
            'cyan',
            'blue',
            'geekblue',
            'purple'
        ]

        return colors[Utils.randomInteger(0, colors.length)]
    },
    mapNodesToNodesPositionsObj(nodes: INode[]): { [id: string]: INodePosition } {
        return nodes.reduce((acc, curr) => {
            acc[curr.id] = { x: curr.x, y: curr.y }
            return acc
        }, {})
    },
    mapNodesObjToNodesPositionsObj(nodesObj: { [id: string]: INode }): { [id: string]: INodePosition } {
        return Object.keys(nodesObj).reduce((acc, curr) => {
            acc[nodesObj[curr].id] = { x: nodesObj[curr].x, y: nodesObj[curr].y }
            return acc
        }, {})
    },
    // Helper function to chunk an array into smaller arrays of a specified size
    chunkArray<T>(array: T[], size: number): T[][] {
        const result: T[][] = []
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    },
    copyToBuffer(text: string) {
        const tempTextArea = document.createElement('textarea')
        tempTextArea.value = text
        document.body.appendChild(tempTextArea)
        tempTextArea.select()

        try {
            const successful = document.execCommand('copy')
            return successful ? true : false
        } catch (err) {
            console.error('Failed to copy text: ', err)
            return false
        } finally {
            document.body.removeChild(tempTextArea)
        }
    },
    ssrLink(url: string) {
        return `${isProduction ? '' : 'http://localhost:3001'}${url}`
    }
}
