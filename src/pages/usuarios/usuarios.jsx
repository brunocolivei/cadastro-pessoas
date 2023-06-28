import { useContext, useEffect, useRef, useState } from 'react'
import { Heading} from '@chakra-ui/react'
import UserTable from '../../components/userTable/userTable'
import { useNavigate } from 'react-router-dom'
import AppContextModule from '../../config/AppContext/appContext'

function Usuarios() {

  const formRef = useRef(null)
  const [records, setRecords] = useState([])
  const navigate = useNavigate()
  const {user} = useContext(AppContextModule.AppContext)

  useEffect(() => {
    const localStorageRecords = JSON.parse(localStorage.getItem('Records'))
    if (localStorageRecords.length > 0) {
      setRecords(localStorageRecords)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Records', JSON.stringify(records))
  }, [records])

  const editUser = (index) => {
    navigate(`/cadastro?index=${index}`)
  }

  const clearForm = () => {
    formRef.current.clearForm()
  }

  return (
    <div className="app">
      <Heading as='h1' size='lg'>Tabela de Usuários</Heading>
      <Heading size='md'>{user}</Heading>
      <UserTable records={records} setRecords={setRecords} editUser={editUser} clearForm={clearForm} />
    </div>
  )
}

export default Usuarios
