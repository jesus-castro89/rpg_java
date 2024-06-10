<template><div><h2 id="las-fuentes-de-la-ventana" tabindex="-1"><a class="header-anchor" href="#las-fuentes-de-la-ventana"><span>Las fuentes de la ventana</span></a></h2>
<p>La fuente de cada uno de los componentes en Java puede ser cambiada. Esto incluye la fuente de la ventana, la fuente de
los botones, la fuente de las etiquetas, etc. En este tutorial, aprenderemos cómo cambiar la fuente de la ventana de la
aplicación.</p>
<p>Para cambiar la fuente de la ventana, necesitamos crear una instancia de la clase <code v-pre>Font</code> y luego establecer esta fuente
en la ventana.</p>
<p>Para hacer esto, deberemos de dar de alta las fuentes en formato OTF o TTF en la carpeta <code v-pre>fonts</code> de nuestro proyecto.
Esto lo podemos lograr con la clase <code v-pre>FontManager</code> y utilizar las fuentes registradas en cada componente.</p>
<blockquote>
<p>[!important] <strong>Nota:</strong> Recuerda que las fuentes deben de ser cargadas antes de que se cree la ventana. Así mismo, las
fuentes deben modificar la posición en la cual se dibuja el texto para poder quedar correctamente posicionadas.</p>
</blockquote>
<blockquote>
<p>[!important] En este caso deberás modificar al menos las fuentes de las etiquetas y los botones de la interfaz.
Recuerda que puedes usar las fuentes que más te agraden.</p>
</blockquote>
</div></template>


