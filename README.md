# Test de Visión Cromática Ishihara

Aplicación web basada en las **Placas Ishihara** para la detección preliminar de daltonismo (deficiencias en la visión de colores rojo-verde).

## ⚠️ Descargo de Responsabilidad

Esta herramienta es **exclusivamente informativa** y no sustituye el diagnóstico profesional de un oftalmólogo u optometrista. Los resultados deben ser siempre interpretados por un especialista.

## 🎯 Características

- **Test Ishihara Estándar**: 18 placas con diferentes tipos de estímulos cromáticos
- **Diagnóstico Preliminar**: Detección de Protanopia, Deuteranopia, Visión Normal y otros patrones
- **Placas Especiales**:
  - **Vanishing plates**: Visibles solo para personas con visión cromática normal
  - **Transformation plates**: Diferentes números según el tipo de visión
  - **Diagnostic plates**: Para distinguir entre Protan y Deutan
  - **Control plates**: Verificación de la integridad del test
- **Interfaz Moderna**: Diseño responsivo con animaciones CSS
- **Análisis Automatizado**: Cálculo de diagnóstico basado en patrones de respuesta

## 🛠️ Tecnologías

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones (vanilla)
- **JavaScript ES6+**: Lógica de la aplicación (vanilla, sin frameworks)

## 🚀 Instalación y Ejecución

### Opción 1: Ejecutar directamente (Recomendado)
Simplemente abre `index.html` en tu navegador web. No requiere build process.

### Opción 2: Ejecutar con servidor HTTP

```bash
npm install
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:8000`

## 🧪 Ejecutar Tests

```bash
npm test
```

Ejecuta el suite de pruebas unitarias que valida la lógica de diagnóstico con diferentes escenarios de visión cromática.

## 📊 Tipos de Daltonismo Detectados

| Tipo | Códigos | Descripción |
|------|---------|-------------|
| **Visión Normal** | NORMAL | Percepción cromática estándar |
| **Protanopia** | PROTAN | Deficiencia en conos Rojo (L) |
| **Protanomalía** | PROTANOMAL | Reducción de sensibilidad al Rojo |
| **Deuteranopia** | DEUTAN | Deficiencia en conos Verde (M) |
| **Deuteranomalía** | DEUTANOMAL | Reducción de sensibilidad al Verde |
| **Acromatopsia** | TRITAN / ACHROMATOPSIA | Ceguera total al color (rara) |

## 📁 Estructura del Proyecto

```
├── index.html          # Estructura principal (3 screens)
├── style.css           # Estilos CSS y animaciones
├── script.js           # Lógica UI (navegación, inputs)
├── logic.js            # Lógica del test (placas, análisis, diagnóstico)
├── package.json        # Configuración npm
├── test.js             # Tests unitarios
├── config.yaml         # Configuración LiteLLM (LLM local)
├── run.bat             # Script de configuración rápida
└── assets/
    └── images/         # Imágenes de las placas Ishihara (.webp)
```

## 🔧 Configuración para Ejecutar en Windows

1. Instala [Python](https://www.python.org/downloads/)
2. Ejecuta `run.bat` o usa el comando:

```bash
npm install
npm start
```

## 🧩 Contribuir

¡Las contribuciones son bienvenidas! Para agregar nuevas placas:

1. Edita `logic.js` → `platesConfig` array
2. Añade el objeto de la placa:

```javascript
{ id: 13, img: 'test-13.webp', normal: 123, alt: [], type: 'vanishing' }
```

3. Los tipos de placa son: `vanishing`, `transformation`, `diagnostic`, `control`

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y diagnóstico preliminar.
