import { isProduction } from './constants'

export const Utils = {
    randomInteger(min: number, max: number) {
        // получить случайное число от (min-0.5) до (max+0.5)
        const rand = min - 0.5 + Math.random() * (max - min + 1)
        return Math.round(rand)
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
