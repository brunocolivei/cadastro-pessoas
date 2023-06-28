import { useContext, useEffect, useRef, useState } from 'react'
import { Heading } from '@chakra-ui/react'
import UserForm from '../../components/userForm/userForm'
import { useLocation, useNavigate } from 'react-router-dom'
import AppContextModule from '../../config/AppContext/appContext'

function Cadastro() {

  const formRef = useRef(null)
  const [records, setRecords] = useState([])
  const [edit, setEdit] = useState(-1)
  const [objectToEdit, setObjectToEdit] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const {user} = useContext(AppContextModule.AppContext)

  useEffect(() => {
    const localStorageRecords = JSON.parse(localStorage.getItem('Records'))
    if (localStorageRecords.length > 0) {
      setRecords(localStorageRecords)
    }
    const index = new URLSearchParams(location.search).get('index')
    if (index) {
      setEdit(parseInt(index))
      setObjectToEdit(localStorageRecords[parseInt(index)])
    }
  }, [])

  const saveUser = (objeto) => {
    const newArray = [...records]
    if (edit >= 0) {
      newArray[edit] = {...objeto}
      setEdit(-1)
    } else {
      newArray.push({...objeto})
    }
    setRecords(newArray)
    localStorage.setItem('Records', JSON.stringify(newArray))
    setObjectToEdit(null)
    navigate('/usuarios')
  }

  return (
    <div className="app">
      <Heading as='h1' size='lg'>Cadastro de Usuários</Heading>
      <Heading size='md'>{user}</Heading>
      <UserForm ref={formRef} saveUser={saveUser} initialData={objectToEdit} />
    </div>
  )
}

export default Cadastro
