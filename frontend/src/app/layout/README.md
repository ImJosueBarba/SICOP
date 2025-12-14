# Nuevo Layout - Sidebar y Header

## 🎨 Características implementadas

### ✅ **Sidebar Colapsable**
- Navegación lateral basada en TailAdmin
- Se puede colapsar/expandir con botón en el header
- Menús con dropdown para Matrices y Producción
- Indicadores visuales para rutas activas
- Información de usuario en el footer
- Botón de cerrar sesión
- Responsive para móviles

### ✅ **Header Moderno**
- Botón de toggle para sidebar
- Título de la aplicación
- Botón de modo oscuro/claro
- Menú de usuario con dropdown
- Información de perfil
- Responsive

### ✅ **Layout Principal**
- Integración de sidebar y header
- Contenido principal con router-outlet
- Overlay para móviles
- Transiciones suaves

### ✅ **Soporte de Modo Oscuro**
- Toggle de modo oscuro en el header
- Preferencia guardada en localStorage
- Estilos adaptados para dark mode

## 📁 Estructura de archivos creados

```
frontend/src/app/
├── layout/
│   ├── sidebar/
│   │   ├── sidebar.ts
│   │   ├── sidebar.html
│   │   └── sidebar.css
│   ├── header/
│   │   ├── header.ts
│   │   ├── header.html
│   │   └── header.css
│   └── main-layout/
│       ├── main-layout.ts
│       ├── main-layout.html
│       └── main-layout.css
└── directives/
    └── click-outside.directive.ts
```

## 🚀 Cómo funciona

### Navegación del Sidebar

El sidebar muestra menús diferentes según el rol del usuario:

**Para ADMINISTRADOR:**
- Dashboard
- Gestión de Usuarios
- Matrices (Control de Operación, Control de Cloro, Monitoreo Fisicoquímico)
- Producción (Producción de Filtros, Consumo Diario, Consumo Mensual)

**Para OPERADOR:**
- Dashboard
- Matrices
- Producción

### Características interactivas

1. **Colapsar sidebar**: Click en el botón de hamburguesa en el header
2. **Modo oscuro**: Click en el icono de luna/sol en el header
3. **Menú de usuario**: Click en el avatar del usuario
4. **Dropdowns**: Click en los menús "Matrices" y "Producción"

## 🎨 Personalización

### Cambiar colores

Edita las variables CSS en [styles.css](../../styles.css):

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #1f2937;
  --accent-color: #2563eb;
  /* ... más variables */
}
```

### Agregar nuevos items al menú

Edita el array `menuItems` en [sidebar.ts](sidebar/sidebar.ts):

```typescript
menuItems: MenuItem[] = [
  {
    label: 'Nuevo Item',
    icon: 'pi-nombre-icono',
    route: '/ruta',
    roles: ['ADMINISTRADOR', 'OPERADOR']
  }
]
```

### Iconos disponibles

Los iconos usan PrimeIcons. Ver todos los iconos disponibles:
https://primeng.org/icons

## 📱 Responsive

- **Desktop (>1024px)**: Sidebar visible, se puede colapsar
- **Tablet/Mobile (<1024px)**: Sidebar oculto por defecto, se muestra con overlay

## ⚙️ Configuración adicional

### Logo

Coloca tu logo en `frontend/public/images/logo.png`

Para cambiar el logo, edita [sidebar.html](sidebar/sidebar.html):

```html
<img src="images/tu-logo.png" alt="Logo" class="logo-img" />
```

## 🔧 Solución de problemas

### El sidebar no se colapsa

Verifica que el botón de toggle esté emitiendo el evento:

```typescript
// En header.ts
onToggleSidebar() {
  this.toggleSidebar.emit();
}
```

### El modo oscuro no persiste

Asegúrate de que localStorage está habilitado en tu navegador.

### Los dropdowns no funcionan en móviles

Verifica que el sidebar tenga la clase `.open` cuando está visible:

```html
<app-sidebar [class.open]="sidebarOpen()"></app-sidebar>
```

## 🎯 Próximos pasos sugeridos

1. **Agregar breadcrumbs** en el header para mejor navegación
2. **Implementar notificaciones** en el header
3. **Agregar búsqueda global** en el header
4. **Personalizar página de perfil** del usuario
5. **Agregar animaciones** más suaves con Angular Animations

## 📝 Notas

- El layout solo se muestra cuando el usuario está autenticado (no en `/login`)
- Los permisos por rol se verifican automáticamente
- El estado del sidebar colapsado NO persiste al recargar (se puede agregar si se desea)
