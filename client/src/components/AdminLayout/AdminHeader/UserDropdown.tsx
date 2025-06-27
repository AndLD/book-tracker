import { Dropdown, Menu } from 'antd'
import UserAvatar from './UserAvatar'
import useAdminPageMenuItem from '../useAdminPageMenuItem'
import useLogoutMenuItem from './useLogoutMenuItem'

export default function UserDropdown() {
    return (
        <>
            <Dropdown
                overlay={
                    <Menu
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch'
                        }}
                        items={[useAdminPageMenuItem(), useLogoutMenuItem()]}
                    />
                }
                arrow={{ pointAtCenter: true }}
                trigger={['click']}
                placement="bottomLeft"
            >
                <div style={{ marginLeft: '20px' }}>
                    <UserAvatar />
                </div>
            </Dropdown>
        </>
    )
}
