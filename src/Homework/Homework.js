import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Homework.css'

export default function Homework() {
    const [fullname , setFullName] = useState('')
    const [department , setDepartment] = useState('')
    const [gender , setGender] = useState('')
    const [birthDate , setBirthDate] = useState('')

    const [modal, setModal] = useState(false)
    const [delModal, setDelModal] = useState(false)

    const itemsPerPage = 10
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const pageCount = Math.ceil(users.length / itemsPerPage)
    const offset = currentPage * itemsPerPage

    const currentItems = users.slice(offset, offset + itemsPerPage)

    useEffect(() => {
        axios.get('http://localhost:8000/users').then(res => {
            setUsers(res.data)
        })
    }, [])

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const addUser = (e) => {
        e.preventDefault()
        let payload ={
            fullname: fullname,
            department: department,
            gender: gender,
            birthDate: birthDate,
        }
        setUsers([...users, {...payload}])
        axios.post('http://localhost:8000/users', {...payload}).then(res => {
            setUsers(res.data)
        })
        setModal(false)
        setFullName('')
        setDepartment('')
        setGender('')
        setBirthDate('')
    }

    const delFunc = (id) => {
        axios.delete(`http://localhost:8000/users/${id}`).then(res => {
            users.filter(item => id !== item.id)
            setUsers(users)
        })
    }

  return (
    <div>
        <Modal isOpen={modal} toggle={() => setModal(false)}>
            <ModalHeader>Add User</ModalHeader>
            <ModalBody>
                <form>
                    <input type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name' className='form-control my-2' />
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='Department' className='form-control my-2' />
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder='Gender' className='form-control my-2' />
                    <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder='Date-month-year' className='form-control my-2' />
                </form>
            </ModalBody>
            <ModalFooter><button onClick={addUser} className='btn btn-success'>Add</button></ModalFooter>
        </Modal>

        {/* <Modal isOpen={delModal} toggle={() => setDelModal(false)}>
            <ModalBody>Are you sure you want to delete this user?!</ModalBody>
            <ModalFooter>
                <button onClick={() => delFunc()} className='btn btn-danger'>Delete</button>
                <button onClick={() => setDelModal(false)} className='btn btn-light'>Cancel</button>
            </ModalFooter>
        </Modal> */}
        <div className="container">
            <div className="header d-flex justify-content-between my-3">
                <span className='d-flex'>
                <select className='custom-select rounded-0'>
                    <option value="" hidden>Departments</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Accounting">Accounting</option>
                    <option value="IT">IT</option>
                </select>
                <button className='btn btn-outline-secondary rounded-0' type='button'>X</button>
                </span>
                <button onClick={() => setModal(true)} className='btn btn-primary'>
                    Add+
                </button>
            </div>
            <div className="parent">
                <table className='table my-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Department</th>
                            <th>Gender</th>
                            <th>Birth Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((item, index) => {
                                return <tr key={item.id}>
                                    <Modal isOpen={delModal} toggle={() => setDelModal(false)}>
                                        <ModalBody>Are you sure you want to delete this user?!</ModalBody>
                                        <ModalFooter>
                                           <button onClick={() => delFunc(item.id)} className='btn btn-danger'>Delete</button>
                                           <button onClick={() => setDelModal(false)} className='btn btn-light'>Cancel</button>
                                    </ModalFooter>
                                     </Modal>
                                    <td>{index + 1}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.department}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.birthDate}</td>
                                    <td className='d-flex gap-3'>
                                        <button onClick={() => setModal(true)} className='btn btn-info'>✍</button>
                                        <button onClick={() => setDelModal(true)} className='btn btn-dark'>🗑</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <ReactPaginate
                previousLabel={"Prev"}
                previousLinkClassName={'page-link'}
                nextLabel={"Next"}
                nextLinkClassName={'page-link'}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination d-flex align-items-center"}
                activeClassName={"active"}
                />
            </div>
        </div>
    </div>
  )
}





// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import ReactPaginate from "react-paginate";
// import "./Posts.css";

// export default function Posts() {
//   const itemsPerPage = 10;
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageCount = Math.ceil(posts.length / itemsPerPage);
//   const offset = currentPage * itemsPerPage;

//   const currentItems = posts.slice(offset, offset + itemsPerPage);

//   useEffect(() => {
//     axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
//       console.log(response);
//       setPosts(response.data);
//     });
//   }, []);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   return (
//     <div>
//       <div className="wrapper">
//         <div className="parent">
//           <ReactPaginate
//             previousLabel={"Previous"}
//             previousLinkClassName={'page-link'}
//             nextLabel={"Next"}
//             nextLinkClassName={'page-link'}
//             breakLabel={"..."}
//             pageCount={pageCount}
//             marginPagesDisplayed={5}
//             pageRangeDisplayed={5}
//             onPageChange={handlePageClick}
//             containerClassName={"pagination"}
//             activeClassName={"active"}
//           />
//         </div>

//         <div className="parent">
//           {currentItems.map((item) => {
//             return (
//               <div className="child">
//                 <h4>{item.id}</h4>
//                 <h5>{item.title}</h5>
//                 <p>{item.body}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
