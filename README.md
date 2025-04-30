
# 📱 ListoTodoApp

Aplicación móvil desarrollada con **Ionic + Angular** como parte de una prueba técnica para desarrollador Mobile.

## ✨ Funcionalidades

- Crear, completar y eliminar tareas.
- Categorizar tareas, con opción de crear, editar y eliminar categorías.
- Filtrar tareas por categoría.
- Onboarding interactivo que guía al usuario en su primer inicio.
- Feature Flag con Firebase Remote Config para activar/desactivar funcionalidades.
- Almacenamiento local persistente con `@ionic/storage-angular`.
- Interfaz estilizada con paleta **vibrant dark**.
- Generación de APK y preparación para Andrid mediante Capacitor.

---

## 🚀 Instalación del proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/carlmors/ListoTodoApp.git
   ```

2. Entra al proyecto:
   ```bash
   cd ListoTodoApp
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicializa Ionic Storage (opcional si no se ha hecho aún):
   ```bash
   npx cap sync
   ```

---

## 🧪 Ejecutar en desarrollo

```bash
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`.

---

## Compilar para Android e iOS

### Android

Nota Importante : Cómo la aplicación no subí la carpeta android para esto debe generase , dejo los pasos
de cómo realizarlo 

# Instalar el paquete de Android de Capacitor
npm install @capacitor/android

# Agregar la plataforma Android
npx cap add android

# Construir el proyecto Angular
ng build

# Sincronizar con Capacitor
npx cap sync android

# Acceder a la carpeta Android
cd android

# Generar el APK en modo debug
./gradlew assembleDebug
Esto generará el archivo APK en android/app/build/outputs/apk/debug/app-debug.apk, el cual puedes instalar en tu dispositivo o emulador.

Desde Android Studio, abre la aplicacón o instala en tu dispositivo

### iOS (solo en macOS)

1. Agrega la plataforma:
   ```bash
   ionic cap add ios
   ```

2. Abre Xcode:
   ```bash
   ionic cap open ios
   ```

3. Compila desde Xcode y genera el archivo `.ipa`.

---

## 🔥 Configuración de Firebase

- La app está conectada a Firebase para usar **Remote Config**.
- Feature flag utilizada: `activarAgregarTarea`
- Para editar la funcionalidad desde Firebase:
  1. Inicia sesión en Firebase Console.
  2. Ve a Remote Config > agregar `activarAgregarTarea` como `boolean`.
  3. Cambia su valor para mostrar u ocultar el botón de agregar tarea.

---

## 📂 Estructura del Proyecto

- `/src/app/home` → Página principal (to-do list)
- `/src/app/modals/` → Modales independientes (Agregar tarea, categoría, onboarding, etc.)
- `/src/app/services/` → Servicios para manejar tareas y categorías
- `/src/app/models/` → Interfaces `Tarea` y `Categoria`
- `/src/theme/` → Estilos globales personalizados con paleta oscura

---

## 📸 Video de Funcionalidad

[Test To do list Ionic + Angular](https://youtu.be/MlEUbkpf2TU?si=crYElnGHzh2PFCeP)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines de evaluación técnica. Libre de uso para fines no comerciales.
