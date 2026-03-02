# Campus Virtual UNSAM Autologin (Extensión)

Esta extensión completa automáticamente el campo:

```html
<input type="password" name="password" id="password">
```

y luego envía el formulario de login en:

`https://campusvirtualecyt.unsam.edu.ar/login/index.php`

## Instalación (Chrome/Edge)

1. Abrí `chrome://extensions` (o `edge://extensions`).
2. Activá **Developer mode / Modo desarrollador**.
3. Clic en **Load unpacked / Cargar descomprimida**.
4. Seleccioná esta carpeta.

## Configuración

1. Abrí los detalles de la extensión y entrá en **Extension options / Opciones**.
2. Escribí tu contraseña.
3. Marcá **Activar autologin**.
4. Guardá.

## Funcionamiento

- Si detecta el formulario y el input de contraseña, lo completa con el valor guardado.
- Si el usuario ya está completado (o no existe), intenta enviar el formulario automáticamente.
- Si no hay contraseña configurada o autologin está desactivado, no hace nada.

## Seguridad

- La contraseña se guarda en `chrome.storage.local` (solo en tu navegador local).
- No subas esta carpeta con datos personales ni exportes el perfil del navegador.
