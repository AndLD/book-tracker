import { useState } from 'react'

export default function useAuthorizedContextValue() {
    const editModeState = useState<boolean>(false)

    return {
        editModeState
    }
}
