import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import ThemeProvider from './components/ThemeProvider'

function App() {
    // useAuth()

    return (
        <ThemeProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
