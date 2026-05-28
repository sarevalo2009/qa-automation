// ============================================
// DIA 2 — Práctica Async/Await
// ============================================

// Ejercicio 1: Obtener un usuario
async function getUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const user = await response.json()
    console.log('Usuario encontrado:', user.name)
    return user
  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
}

// Ejercicio 2: Obtener todos los usuarios
async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()
  console.log(`Se encontraron ${users.length} usuarios`)
  return users
}

// Ejecutar los ejercicios
getUser(1)    // prueba con ID válido
getUser(999)  // prueba con ID que no existe
getUsers()