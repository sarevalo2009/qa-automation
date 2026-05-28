// Tus funciones van aquí arriba igual que antes
async function getUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = await response.json()
  console.log(user.name)
  return user
}

async function getUserPosts(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const posts = await response.json()
  console.log(`El usuario ${userId} tiene ${posts.length} posts`)
  posts.forEach((post) => console.log(`- ${post.title}`))
  return posts
}

async function getUserWithPosts(userId) {
  const user = await getUser(userId)
  const posts = await getUserPosts(userId)
  return { ...user, posts, totalPosts: posts.length }
}

async function parallelFetch() {
  const [user1, user2, user3] = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3),
  ])
  console.log('Usuarios en paralelo:', user1.name, user2.name, user3.name)
}

// ✅ Todo lo que ejecutas va dentro de esta función main
async function main() {
  const result = await getUserWithPosts(1)
  console.log(`${result.name} tiene ${result.totalPosts} posts`)

  await parallelFetch()
}

// Esta línea arranca todo
main()