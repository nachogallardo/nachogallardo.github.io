# 🚀 Portfolio de Ignacio Gallardo Sánchez

Un portfolio moderno y elegante desarrollado con **Next.js 15**, **TypeScript** y **Tailwind CSS**, diseñado para mostrar las habilidades y proyectos de un desarrollador.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante con tema oscuro y efectos visuales
- 📱 **Responsive**: Completamente adaptable a todos los dispositivos
- ⚡ **Rendimiento Optimizado**: Construido con Next.js 15 y Turbopack
- 🎯 **SEO Optimizado**: Meta tags y estructura optimizada para motores de búsqueda
- 🎭 **Animaciones Suaves**: Transiciones y efectos visuales fluidos
- 🖱️ **Cursor Personalizado**: Cursor customizado para una experiencia única
- 🎨 **UI Components**: Sistema de componentes basado en Radix UI y shadcn/ui

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.3.3** - Framework React con App Router
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 3.4.1** - Framework de estilos utilitarios
- **Radix UI** - Componentes de interfaz accesibles
- **Lucide React** - Iconografía moderna

### Herramientas de Desarrollo
- **Turbopack** - Bundler ultra-rápido para desarrollo
- **PostCSS** - Procesador de CSS
- **ESLint** - Linter para JavaScript/TypeScript
- **Genkit** - Framework de IA para Google
- **hCaptcha** - Sistema de verificación anti-spam gratuito

### Características Técnicas
- **App Router** de Next.js 15
- **Server Components** y **Client Components**
- **Optimización de imágenes** con Next.js Image
- **Fonts optimizadas** con Google Fonts
- **Scroll suave** y navegación fluida

## 🔐 Configuración de hCaptcha

El formulario de contacto utiliza **hCaptcha** para protección anti-spam:

### ✅ **Ventajas de hCaptcha:**
- ✅ **Completamente gratuito**
- ✅ **No requiere configuración compleja**
- ✅ **Funciona inmediatamente en desarrollo**
- ✅ **Respetuoso con la privacidad**
- ✅ **API simple y fácil de usar**

### 📋 **Configuración:**

#### **Variables de entorno necesarias:**

```bash
# .env.local
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=tu_clave_de_web3forms
```

#### **Para hCaptcha:**
1. Ir a [hCaptcha.com](https://hcaptcha.com)
2. Crear una cuenta gratuita
3. Obtener tu clave pública (sitekey)
4. Actualizar `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`

#### **Para Web3Forms:**
1. Ir a [Web3Forms.com](https://web3forms.com)
2. Crear una cuenta gratuita
3. Obtener tu access key
4. Actualizar `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

### 2. Prerrequisitos
- Node.js 18+ 
- npm o yarn


### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.


---

⭐ **¡No olvides darle una estrella al proyecto si te gusta!** ⭐
