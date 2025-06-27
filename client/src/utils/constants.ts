export const VERSION = 'v1.0'
export const isProduction = import.meta.env.PROD
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const LINE_SPLITTER = '::'
export const isMacOS = /Mac/.test(navigator.platform)
export const KEYBOARD = {
    CTRL_KEY: isMacOS ? 'metaKey' : 'ctrlKey',
    SHIFT_KEY: 'shiftKey'
}
export const appName = 'App Boilerplate'
export const appShortName = 'AB'
