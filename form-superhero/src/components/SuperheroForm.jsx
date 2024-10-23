import React, { useState } from 'react'
import './superhero-styles.css'

export default function SuperheroForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [superheroes, setSuperheroes] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    validateField(name, value)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, formData[name])
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.length < 4) {
          error = `El ${name === 'firstName' ? 'nombre' : 'apellido'} debe tener al menos 4 caracteres`
        }
        break
      case 'email':
        if (value.length < 10) {
          error = "El correo electrónico debe tener al menos 10 caracteres"
        }
        break
      case 'password':
        if (value.length < 12) {
          error = "La contraseña debe tener al menos 12 caracteres"
        }
        break
      case 'confirmPassword':
        if (value !== formData.password) {
          error = "Las contraseñas no coinciden"
        }
        break
      default:
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const touchedFields = Object.fromEntries(
      Object.keys(formData).map(key => [key, true])
    )
    setTouched(touchedFields)
    
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      validateField(key, formData[key])
      if (errors[key]) acc[key] = errors[key]
      return acc
    }, {})

    if (Object.keys(formErrors).length === 0) {
      console.log('Formulario enviado:', formData)
      // Agregar el nuevo superhéroe a la lista
      setSuperheroes(prev => [...prev, { 
        firstName: formData.firstName, 
        lastName: formData.lastName, 
        email: formData.email 
      }])
      // Limpiar el formulario
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setTouched({})
      setErrors({})
      // Cambiar el estado para indicar que el formulario ha sido enviado
      setFormSubmitted(true)
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className="superhero-container">
      <h1 className="main-title">
        {formSubmitted ? "¡Bienvenido al Equipo de Superhéroes!" : "Registro de Superhéroe"}
      </h1>
      <form onSubmit={handleSubmit} className="superhero-form">
        <h2 className="form-title">Registro de Superhéroe</h2>
        
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.firstName && errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastName && errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="submit-button">
          Crear Super Héroe
        </button>
      </form>
      <img src="https://i.imgflip.com/8pibib.jpg" alt="Superman" className="superman-image" />
      
      <div className="superhero-list">
        <h3>Lista de Superhéroes</h3>
        {superheroes.length === 0 ? (
          <p>No hay superhéroes registrados aún.</p>
        ) : (
          <ul>
            {superheroes.map((hero, index) => (
              <li key={index}>
                {hero.firstName} {hero.lastName} - {hero.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}