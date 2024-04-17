<template><div><p>Una vez que hemos visto la estructura general del proyecto, es momento de hablar sobre la ventana principal del juego.
En este apartado, vamos a definir los elementos que conforman la ventana principal y cómo se relacionan entre sí.</p>
<h2 id="objetivo" tabindex="-1"><a class="header-anchor" href="#objetivo"><span>Objetivo</span></a></h2>
<p>El objetivo de este apartado es definir los elementos de la ventana principal y cómo se relacionan entre sí. La ventana
principal es la parte del juego que se muestra al jugador al iniciar el juego, por lo tanto, es importante que sea clara
y fácil de entender.</p>
<h2 id="elementos-de-la-ventana-principal" tabindex="-1"><a class="header-anchor" href="#elementos-de-la-ventana-principal"><span>Elementos de la Ventana Principal</span></a></h2>
<p>La ventana principal está compuesta por varios elementos que permiten al jugador interactuar con el juego. Algunos de
los elementos más comunes son:</p>
<ul>
<li><strong>Fondo</strong>: Representa el entorno en el que se encuentra el jugador.</li>
<li><strong>Personaje</strong>: Representa al jugador y se puede mover por la pantalla.</li>
<li><strong>Enemigos</strong>: Representan a los enemigos con los que el jugador puede interactuar.</li>
<li><strong>Objetos</strong>: Representan objetos con los que el jugador puede interactuar.</li>
<li><strong>HUD (Heads-Up Display)</strong>: Muestra información importante como la vida, la energía o el inventario del jugador.</li>
<li><strong>Menús</strong>: Permiten al jugador acceder a diferentes opciones como el inventario, el mapa o las opciones del juego.</li>
<li><strong>Texto</strong>: Muestra información al jugador como diálogos, instrucciones o mensajes de error.</li>
<li><strong>Iconos</strong>: Representan objetos, habilidades o estados del jugador.</li>
<li><strong>Botones</strong>: Permiten al jugador realizar acciones como atacar, moverse o interactuar con objetos.</li>
<li><strong>Barra de Vida</strong>: Muestra la cantidad de vida que tiene el jugador o un enemigo.</li>
<li><strong>Barra de Energía</strong>: Muestra la cantidad de energía que tiene el jugador o un enemigo.</li>
<li><strong>Barra de Experiencia</strong>: Muestra la cantidad de experiencia que tiene el jugador.</li>
</ul>
<h2 id="la-clase-gamewindow" tabindex="-1"><a class="header-anchor" href="#la-clase-gamewindow"><span>La clase <code v-pre>GameWindow</code></span></a></h2>
<p>La clase <code v-pre>GameWindow</code> es la encargada de gestionar la ventana principal del juego. Esta clase se encarga de inicializar
los elementos de la ventana principal, como el fondo, el personaje, los enemigos, los objetos, el HUD, los menús, el
texto, los iconos, los botones, las barras de vida, las barras de energía y la barra de experiencia.</p>
<p>La clase <code v-pre>GameWindow</code> también se encarga de gestionar la interacción entre los diferentes elementos de la ventana
principal, como las acciones del personaje, los ataques de los enemigos y los objetos, la actualización del HUD y las
barras de vida, energía y experiencia, la apertura y cierre de los menús, la visualización del texto y los iconos, y la
respuesta a los botones pulsados por el jugador.</p>
<p>Para crear nuestra clase, usaremos el editor de interfaces integrado de IntelliJ IDEA. Para ello, seguiremos los
siguientes pasos:</p>
<ol>
<li>Abre IntelliJ IDEA y crea un paquete llamado <code v-pre>gui</code> en el directorio <code v-pre>src</code>.</li>
<li>Haz clic derecho en el paquete <code v-pre>gui</code> y selecciona <code v-pre>New -&gt; Swing UI Designes -&gt; GUI Form</code>.</li>
<li>Coloca como nombre <code v-pre>GameWindow</code> y haz clic en <code v-pre>OK</code>.</li>
<li>Selecciona la clase creada y haz que esta extienda de <code v-pre>JFrame</code>.</li>
<li>Diseña la interfaz de la ventana principal con los elementos mencionados anteriormente de la siguiente manera:
<ol>
<li>Divide la ventana en dos paneles, un panel superior para información del usuario, el enemigo y el sistema,
mientras el segundo es el panel de menús de acción.</li>
<li>En el panel superior, coloca un panel para el personaje, un panel para el enemigo y un panel para el sistema.</li>
<li>En el panel de menús, coloca un <code v-pre>JTabbedPane</code> para los menús del jugador.</li>
<li>Puedes guiarte de la siguiente imagen:
<img src="@source/guide/interfaz/images/GameWindow.png" alt="GameWindow" loading="lazy"></li>
</ol>
</li>
<li>Guarda la clase y cierra el editor de interfaces.</li>
</ol>
</div></template>


