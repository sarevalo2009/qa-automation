import { test, expect } from '@playwright/test'

// Usamos una API pública de práctica
const API_URL = 'https://jsonplaceholder.typicode.com'

test.describe('API: Users', () => {

  test('GET /users should return users list', async ({ request }) => {
    const response = await request.get(`${API_URL}/users`)

    // Verificar que el servidor respondió OK
    expect(response.status()).toBe(200)

    // Verificar que llegaron datos
    const users = await response.json()
    expect(users.length).toBeGreaterThan(0)

    // Verificar que cada usuario tiene nombre y email
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('email')
  })

  test('GET /users/:id should return one user', async ({ request }) => {
    const response = await request.get(`${API_URL}/users/1`)

    expect(response.status()).toBe(200)

    const user = await response.json()
    expect(user.name).toBe('Leanne Graham')
    expect(user).toHaveProperty('email')
  })

  test('POST /users should create a user', async ({ request }) => {
    const response = await request.post(`${API_URL}/users`, {
      data: {
        name: 'QA Tester',
        email: 'qa@test.com',
        username: 'qatester'
      }
    })

    // 201 significa "creado exitosamente"
    expect(response.status()).toBe(201)

    const user = await response.json()
    expect(user.name).toBe('QA Tester')
    expect(user.email).toBe('qa@test.com')
  })

  test('PUT /users/:id should update a user', async ({ request }) => {
    const response = await request.put(`${API_URL}/users/1`, {
      data: {
        name: 'Updated Name',
        email: 'updated@test.com'
      }
    })

    expect(response.status()).toBe(200)

    const user = await response.json()
    expect(user.name).toBe('Updated Name')
  })

  test('DELETE /users/:id should delete a user', async ({ request }) => {
    const response = await request.delete(`${API_URL}/users/1`)

    // 200 significa que se eliminó correctamente
    expect(response.status()).toBe(200)
  })

})