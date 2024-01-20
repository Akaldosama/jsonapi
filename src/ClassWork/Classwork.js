import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

export default function Classwork() {
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [address, setAddress] = useState('')

  const [modal, setModal] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:8000/users").then(res => {
      console.log(res.data)
      setUsers(res.data)
    })
  }, [])
  


  const addUser = (e) => {
    e.preventDefault()
    let payload = {
      name: name,
      surname: surname,
      age: +age,
      address: address,
    }
    setUsers([...users, {...payload}])
    localStorage.setItem('users', users)
    axios.post('http://localhost:8000/users', {...payload}).then((res) => {
      console.log(res)
    })
    setModal(false)
    setName('')
    setSurname('')
    setAge('')
    setAddress('')
  } 

  const deleteFunc = (id) => { 
      // users.splice(index, 1)
      // setUsers([...users])
      axios.delete(`http://localhost:8000/users/${id}`).then(res => {
        setUsers(res.data)
      })  
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader>Add User</ModalHeader>
        <ModalBody>
          <form>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='form-control my-2' />
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname' className='form-control my-2' />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Age' className='form-control my-2' />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' className='form-control my-2' />
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={addUser}>Add</button>
        </ModalFooter>
      </Modal>
      <div className="container">
        <button onClick={() => setModal(true)} className='btn btn-info my-2'>Add User</button>
        <div className="parent">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Address</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((item, index) => {
                  return <tr key={+item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>
                      <button onClick={() => setCount(prev => prev + 1)} className='btn btn-info'>+</button>
                      {count}
                      <button onClick={() => setCount(prev => prev - 1)} className='btn btn-danger'>-</button>
                    </td>
                    <td>
                      <button className='btn btn-dark' onClick={() => deleteFunc(item.id)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
