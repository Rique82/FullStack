import { useState } from "react"
import { createUser } from "../../api/users";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        nome: '',
        email: '',
        senha: '',
        ativo: true
    })

    const HandleChange = (e) => {
        const {id, value} = e.target;
        setUser({
            ...user,
            [id]: value
        })
    }

    const HandleSave = async (e) => {
        e.preventDefault()
        const response = await createUser(user)

        if(response.status === 201){
            navigate('/users')
        } else {
            console.log(response)
        }

        console.log(response)
    }

    return (
        <main>

            <form>

                <div>
                    <label>Nome: </label>
                    <input type="text" name="nome" id="nome" value={user.nome} onChange={HandleChange} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" id="email" value={user.email} onChange={HandleChange} />
                </div>
                <div>
                    <label>Senha: </label>
                    <input type="password" name="senha" id="senha" value={user.senha} onChange={HandleChange} />
                </div>

                <button type="reset">Limpar</button>
                <button type="submit" onClick={HandleSave}>Enviar</button>

            </form>

        </main>
    )
}