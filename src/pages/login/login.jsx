import { Button } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Heading } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router"
import AppContextModule from "../../config/AppContext/appContext"


function Login(props) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const {setUser} = useContext(AppContextModule.AppContext)

    // Usuário e senha de teste
    const user = 'joao'
    const correctPassword = '12345'

    const Login = () => {
        if ((user == login) && (password == correctPassword)){
            props.setSession(true)
            setUser(login)
            navigate('/cadastro')
        }
    }

    return(
        <div className="app">
            <Heading as='h1' size='lg'>Login do Sistema</Heading>
            <Input width="400px" type="text" placeholder="Login" onChange={(e) => setLogin(e.target.value)} value={login}/>
            <InputGroup width="400px" size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Senha'
                onChange={(e) => setPassword(e.target.value)} value={password}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Ocultar' : 'Mostrar'}
                </Button>
            </InputRightElement>
            </InputGroup>
            <Button onClick={Login} colorScheme='blue'>Login</Button>
        </div>
    )
}

export default Login