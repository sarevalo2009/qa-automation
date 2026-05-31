// utils/test-data.ts
// Funciones que generan datos únicos para cada test

export function generateTestUser() {
  const timestamp = Date.now()  // número único basado en la hora exacta
  return {
    name: `QA Test User ${timestamp}`,
    email: `qa-${timestamp}@test.com`,
    password: 'TestPass123!',
  }
}

export function generateTestTask() {
  const timestamp = Date.now()
  return {
    title: `QA Task ${timestamp}`,
    description: `Test task created at ${new Date().toISOString()}`,
    status: 'todo' as const,
  }
}

export function generateTestItem(prefix: string = 'Item') {
  const timestamp = Date.now()
  return {
    title: `QA ${prefix} ${timestamp}`,
    createdAt: new Date().toISOString(),
  }
}