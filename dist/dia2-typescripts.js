"use strict";
// ============================================
// DIA 2 — Ejercicios TypeScript
// ============================================
// Crear un usuario con el molde User
const admin = {
    id: 1,
    name: 'Ana',
    email: 'ana@empresa.com',
    role: 'admin',
    active: true,
};
// Crear una tarea con el molde Task
const tarea = {
    id: 101,
    title: 'Implementar login',
    assignee: admin,
    status: 'in_progress',
};
console.log(`${tarea.assignee.name} está trabajando en: ${tarea.title}`);
// Funciones de validación con tipos
const isValidEmail = (email) => email.includes('@') && email.includes('.');
const isNotEmpty = (value) => value.trim().length > 0;
const isInRange = (num, min, max) => num >= min && num <= max;
console.log(isValidEmail('ana@test.com')); // true
console.log(isNotEmpty('hola')); // true
console.log(isInRange(5, 1, 10)); // true
