import UsersSearch from '../components/Users/UsersSearch'
import { usersContext } from '../context'
import UsersTable from '../components/Users/UsersTable'
import { useUsersContextValue } from '../hooks/pages/users'
import { useTitle } from '../hooks/pages/layout'

function Users() {
    useTitle('Users')

    return (
        <usersContext.Provider value={useUsersContextValue()}>
            <UsersSearch />
            <UsersTable />
        </usersContext.Provider>
    )
}

export default Users
