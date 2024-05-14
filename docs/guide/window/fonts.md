---
icon: window-restore
title: Las fuentes de la ventana
description: Cómo cambiar las fuentes de la ventana de la aplicación.
---

## Las fuentes de la ventana

La fuente de cada uno de los componentes en Java puede ser cambiada. Esto incluye la fuente de la ventana, la fuente de
los botones, la fuente de las etiquetas, etc. En este tutorial, aprenderemos cómo cambiar la fuente de la ventana de la
aplicación.

Para cambiar la fuente de la ventana, necesitamos crear una instancia de la clase `Font` y luego establecer esta fuente
en la ventana.

Para hacer esto, deberemos de dar de alta las fuentes en formato OTF o TTF en la carpeta `fonts` de nuestro proyecto.
Esto lo podemos lograr con la clase `FontManager` y utilizar las fuentes registradas en cada componente.

> [!important] **Nota:** Recuerda que las fuentes deben de ser cargadas antes de que se cree la ventana. Así mismo, las
> fuentes deben modificar la posición en la cual se dibuja el texto para poder quedar correctamente posicionadas.

> [!important] En este caso deberás modificar al menos las fuentes de las etiquetas y los botones de la interfaz.
> Recuerda que puedes usar las fuentes que más te agraden.
