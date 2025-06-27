import { useState } from 'react'

export default function useClustersContextValue() {
    const editModeState = useState<boolean>(false)

    return {
        editModeState
    }
}
