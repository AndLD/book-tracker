import { theme } from 'antd'

export function useColorPrimary() {
    return theme.useToken().token.colorPrimary
}
