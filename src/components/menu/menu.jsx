import { Link, useNavigate } from "react-router-dom"
import './menu.css'
import { useContext } from "react"
import AppContextModule from "../../config/AppContext/appContext"

const Menu = (props) => {

    const navigate = useNavigate()
    const {setUser} = useContext(AppContextModule.AppContext)

    return (
        <>
            <nav>
                <Link to="/cadastro">Cadastro</Link>
                <Link to="/usuarios">Usuários</Link>
                <button onClick={() => {
                    setUser('')
                    props.setSession(false)
                    navigate('/')
                }}>Logout</button>
            </nav>
        </>
    )
}

export default Menu