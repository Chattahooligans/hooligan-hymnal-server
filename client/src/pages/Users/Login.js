import React, { useState } from 'react'
import Axios from 'axios'

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleFormSubmit = e => {
    const storage = sessionStorage || localStorage;
    Axios.post(`/api/users/login`, values)
      .then(res => {
        console.log(res)
        // storage.setItem('key', )
      })
      .catch(res => console.log(res))
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value})
  }

  return (
    <>
      <h2>Login</h2>
      <form method="POST" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={values.email} onChange={handleInputChange} placeholder="Email Address" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={values.password} onChange={handleInputChange} placeholder="Password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login