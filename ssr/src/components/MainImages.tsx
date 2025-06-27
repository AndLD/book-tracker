import Image from 'next/image'

export default function MainImages() {
    return (
        <div className="main-images-wrapper">
            <div className="main-images-1">
                <Image src="/cluster-main-example.png" alt="Cluster Main Example" width={1081} height={547} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}>
                <Image src="/mobile-node-form-main-example.png" alt="Node Form Main Example" width={246} height={500} />
            </div>
        </div>
    )
}
