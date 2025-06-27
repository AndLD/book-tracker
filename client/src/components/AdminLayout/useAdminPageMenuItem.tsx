import { ControlOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { parseUser } from '../../utils/jwt'
import { useToken } from '../../hooks/auth'

export default function useAdminPageMenuItem() {
    const token = useToken()
    const [userState, setUserState] = useState(parseUser(token))

    const location = useLocation()

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(
            (userState?.status === 'admin' || userState?.status === 'owner') && !location.pathname?.includes('/admin')
        )
    }, [location])

    return isVisible
        ? {
              key: 'admin-page',
              icon: <ControlOutlined style={{ marginRight: '4px', fontSize: '20px' }} />,
              label: (
                  <Link to={'/admin/constructor'} style={{ fontSize: '17px' }}>
                      Сторінка адміністратора
                  </Link>
              )
          }
        : null
}
