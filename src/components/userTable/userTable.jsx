import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import React, { useState } from "react"

function UserTable(props) {

    const deleteUser = (index) => {
        const newArray = [...props.records]
        newArray.splice(index, 1)
        props.setRecords(newArray)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [delUser, setDelUser] = useState(-1)

    return (
        <div className='table-container'>
            <TableContainer>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>CPF</Th>
                            <Th>Idade</Th>
                            <Th>Gênero</Th>
                            <Th>E-mail</Th>
                            <Th>Editar</Th>
                            <Th>Excluir</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.records.sort((a, b) => {
                            if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) {
                                return -1;
                            }
                            if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) {
                                return 1;
                            }
                            return 0;
                        }).map((item, index) => (
                            <Tr key={index}>
                                <Td>{item.fullname}</Td>
                                <Td>{item.cpf}</Td>
                                <Td>{item.age}</Td>
                                <Td>{item.gender}</Td>
                                <Td>{item.email}</Td>
                                <Td>
                                    <button onClick={() => {
                                        props.editUser(index, item)
                                    }}><EditIcon /></button>
                                </Td>
                                <Td>
                                    <button onClick={() => {
                                        setDelUser(index)
                                        onOpen()
                                    }}><DeleteIcon /></button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Deletar Usuário
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Você tem certeza que deseja deletar o usuário? Essa ação não poderá ser desfeita.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                deleteUser(delUser)
                                setDelUser(-1)
                                onClose()
                            }} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </div>
    )
}

export default UserTable