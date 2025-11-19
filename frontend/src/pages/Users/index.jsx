import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../../api/users'
import './styles.css'
import { toast } from 'react-toastify'

function Users() {
    const [users, setUsers] = useState([])

    const HandleDelete = async (id) => {
        const response = await deleteUser(id)

        if (response.status !== 204) {
            toast("erro ao deletar, tente novamente mais tarde")
            return
        }

        setUsers(users => users.filter(user => user.id !== id))
    }

    useEffect(() => {
        async function carregar() {
            const allusers = await getUsers()
            setUsers(allusers)
        }
        carregar()
    }, [])

    return (
        <main>
            <div className='user-list'>
                <Link to={'/create/user'}>
                    <button>Criar</button>
                </Link>
                <div className='user header' key='header'>
                    <div>Nome</div>
                    <div>Email</div>
                    <div>Ações</div>
                </div>
                {
                    users.length == 0
                        ? <div className='user'>
                            <label>nao tem ninguem</label>
                        </div>
                    : users.map(user =>
                        <div className='user' key={user.id}>
                            <label>{user.nome}</label>
                            <label>{user.email}</label>
                            <div className="actions">
                                <button>Alterar</button>
                                <button type='button' onClick={() => HandleDelete(user.id)}>Deleta</button>
                            </div>
                        </div>
                    )
                }

            </div>
        </main>
    )
}

export default Users
