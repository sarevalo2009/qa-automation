// ============================================
// DIA 2 — Ejercicios TypeScript
// ============================================

// Interfaces
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'viewer'
  active: boolean
}

interface Task {
  id: number
  title: string
  assignee: User
  status: 'todo' | 'in_progress' | 'done'
}

// Crear un usuario con el molde User
const admin: User = {
  id: 1,
  name: 'Ana',
  email: 'ana@empresa.com',
  role: 'admin',
  active: true,
}

// Crear una tarea con el molde Task
const tarea: Task = {
  id: 101,
  title: 'Implementar login',
  assignee: admin,
  status: 'in_progress',
}

console.log(`${tarea.assignee.name} está trabajando en: ${tarea.title}`)

// Funciones de validación con tipos
const isValidEmail = (email: string): boolean => email.includes('@') && email.includes('.')
const isNotEmpty = (value: string): boolean => value.trim().length > 0
const isInRange = (num: number, min: number, max: number): boolean => num >= min && num <= max

console.log(isValidEmail('ana@test.com'))  // true
console.log(isNotEmpty('hola'))            // true
console.log(isInRange(5, 1, 10))           // true