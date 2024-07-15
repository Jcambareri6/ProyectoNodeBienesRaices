# Proyecto de Bienes Raíces con Node.js y Pug

Este proyecto de bienes raíces está desarrollado en Node.js utilizando el motor de plantillas Pug. Proporciona funcionalidades para usuarios, administradores y una parte pública, además de filtros de categorías para facilitar la búsqueda de propiedades.

## Características Principales

- **Autenticación y Autorización:**
  - Sesiones de usuario para acceso seguro.
  - Roles diferenciados para usuarios y administradores.

- **Administración de Propiedades:**
  - CRUD completo para administradores sobre propiedades.
  - Gestión de categorías y características de las propiedades.

- **Búsqueda Avanzada:**
  - Filtros por categorías (ej. apartamentos, casas, terrenos) para facilitar la búsqueda pública.
  - Búsqueda por ubicación, precio y características.

- **Interfaz Amigable:**
  - Diseño intuitivo utilizando Pug para las vistas.
  - Integración de tailwind css para una experiencia moderna de usuario.

## Tecnologías Utilizadas

- **Node.js:** Plataforma de desarrollo del lado del servidor.
- **Express:** Framework web para Node.js que facilita la creación de aplicaciones web.
- **Pug (antes conocido como Jade):** Motor de plantillas para la generación de vistas HTML.
- **sequelize:** Base de datos SQL utilizada para almacenar información de propiedades y usuarios.

## Instalación y Configuración

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tuusuario/proyecto-bienes-raices.git
   cd proyecto-bienes-raices
