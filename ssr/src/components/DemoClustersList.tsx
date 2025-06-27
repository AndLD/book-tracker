import { csrLink } from '@/utils/utils'
import { ICluster } from '@lib/utils/interfaces/clusters'
import { Button } from 'antd'
import Link from 'next/link'

export default function DemoClustersList({ demoClusters }: { demoClusters: ICluster[] }) {
    return (
        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
            {Array.isArray(demoClusters)
                ? demoClusters.map((cluster, i) => (
                      <div key={cluster._id}>
                          <span
                              style={{
                                  fontSize: 25,
                                  fontWeight: 'bold'
                              }}
                          >
                              {i + 1}
                          </span>
                          <Link href={csrLink(`/clusters/${cluster._id}`)}>
                              <Button type="link" style={{ fontSize: 25, fontWeight: 'bold', height: 50 }}>
                                  {cluster.title}
                              </Button>
                          </Link>
                          {cluster.description ? (
                              <div style={{ fontSize: 18, maxWidth: 800, textAlign: 'justify' }}>
                                  {cluster.description}
                              </div>
                          ) : null}
                      </div>
                  ))
                : null}
        </div>
    )
}
