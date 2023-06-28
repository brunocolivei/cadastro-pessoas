import { CheckIcon } from "@chakra-ui/icons"
import { Button, Input, Select, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

const componenteUserForm = ({ saveUser, initialData },ref) => {
let teste = 'bruno'

  const formObject = {
    fullname: '',
    cpf: '',
    age: '',
    gender: '',
    email: ''
  }

  const [form, setForm] = useState(formObject)

  useEffect(() => {
    if (initialData) {
      setForm({...initialData})
    }
  }, [initialData])

  const clearForm = () => {
    setForm(formObject)
  }

  const handleSaveUser = () => {
    saveUser({...form})
    clearForm()
  }

  React.useImperativeHandle(ref,() => ({
    clearForm
  }))

  const toast = useToast()

  return (
    <div className='form-area'>
      <Input width='400px' placeholder='Nome' maxLength='50' onChange={(e) => setForm({...form,fullname:e.target.value})} value={form.fullname} isRequired/>
      <Input width='400px' placeholder='CPF' maxLength='14' onChange={(e) => setForm({...form,cpf:e.target.value})} value={form.cpf} />
      <Input width='400px' placeholder='Idade' maxLength='3' onChange={(e) => setForm({...form,age:e.target.value})} value={form.age} />
      <Select width='400px' placeholder='Sexo' onChange={(e) => setForm({...form,gender:e.target.value})} value={form.gender}>
        <option value='' hidden>Selecione seu sexo</option>
        <option value='Masculino'>Masculino</option>
        <option value='Feminino'>Feminino</option>
      </Select>
      <Input width='400px' placeholder='E-mail' maxLength='30' onChange={(e) => setForm({...form,email:e.target.value})} value={form.email} />
      <Button leftIcon={<CheckIcon/>} colorScheme='blue' onClick={() => {
        handleSaveUser()
        toast({
          title: 'Usuário salvo.',
          description: "O usuário foi salvo na base de dados!",
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
        }}>Salvar Cadastro</Button>
    </div>
  )
}

const UserForm = React.forwardRef(componenteUserForm)

export default UserForm