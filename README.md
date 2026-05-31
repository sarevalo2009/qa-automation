# QA Automation - Saucedemo Training

Suite de tests automatizados con Playwright para el proyecto de training QA.

---

## 🚀 Setup inicial

### Requisitos
- Node.js v20+
- npm v10+

### Instalación

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

---

## ▶️ Correr tests

# Todos los tests
npx playwright test

# Solo smoke tests
npx playwright test tests/smoke/

# Solo test specs (TDD)
npx playwright test tests/specs/

# Ver el navegador mientras corre
npx playwright test --headed

# Modo debug (paso a paso)
npx playwright test --debug

# Tests que contengan una palabra
npx playwright test --grep "login"

---

## 📊 Ver reporte

npx playwright show-report

---

## 📁 Estructura del proyecto

qa-automation/
├── playwright.config.ts     → Configuración de Playwright
├── .env                     → Variables de entorno (no se sube a Git)
├── .env.example             → Plantilla de variables de entorno
├── README.md                → Este archivo
├── .github/
│   └── workflows/
│       └── playwright.yml   → Pipeline CI/CD
├── pages/                   → Page Object Models
│   ├── login.page.ts
│   ├── products.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
├── tests/
│   ├── smoke/               → Smoke tests (corren en cada PR)
│   │   ├── auth.spec.ts
│   │   ├── products.spec.ts
│   │   ├── cart.spec.ts
│   │   └── navigation.spec.ts
│   └── specs/               → Test specs por ticket (TDD)
│       ├── TASK-101.spec.ts
│       ├── TASK-102.spec.ts
│       └── TASK-103.spec.ts
└── utils/                   → Helpers reutilizables
    ├── auth.ts
    └── test-data.ts

---

## 🔄 Workflow del QE

### Sprint Planning
1. Leer tickets nuevos del sprint
2. Crear tests/specs/TASK-XXX.spec.ts por cada ticket
3. Escribir tests completos + test.fixme() para lo que falta
4. Compartir con el dev asignado

### Durante el sprint
1. Cuando el dev termina un ticket → revisar que los fixme ahora pasan
2. Agregar edge cases si se descubren
3. Mantener smoke tests actualizados

### Antes del release
1. Correr toda la suite: npx playwright test
2. Revisar reporte HTML
3. Go/No-go basado en:
   - Pass rate >95%
   - Todos los smoke tests P0 pasando
   - Sin regresiones en flujos críticos

---

## 🚦 CI/CD

Los tests corren automáticamente en cada Pull Request.
Ver resultados en la pestaña Actions de GitHub.