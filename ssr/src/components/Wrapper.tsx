export default function Wrapper({ children, style }: { children?: any; style?: any }) {
    return <div style={{ margin: 'auto', maxWidth: 1351, padding: '0 50px', ...style }}>{children || null}</div>
}
