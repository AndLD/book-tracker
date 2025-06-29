import { useState } from 'react'

export default function useReadingConsoleContextValue() {
    const editModeState = useState<boolean>(false)

    return {
        editModeState
    }
}
