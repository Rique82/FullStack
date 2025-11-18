import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../api/users'

function Users() {
    const [conteudo, setConteudo] = useState(<>Carregando</>)

    async function TranformaEmLista() {
        const todosUsuarios = await getUsers()

        console.log(todosUsuarios)

        return todosUsuarios.map(user =>
            <div className='user' key={user.id}>
                <label>{ user.nome }</label>
                <label>{ user.email }</label>
                <div className="actions">
                    <button>Alterar</button>
                    <button>Deleta</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        async function carregar() {
            setConteudo(
                await TranformaEmLista()
            )
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
                {conteudo}
            </div>
        </main>
    )
}

export default Users
