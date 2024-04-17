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
<img src="@source/guide/interfaz/GameWindow.png" alt="GameWindow" loading="lazy"></li>
</ol>
</li>
<li>Cada una de las secciones de la ventana principal debe ser un panel separado unas dimensiones específicas:
<ol>
<li>La ventana completa debe tener un tamaño de 1024x768 pixeles. En este caso es el panel inicial que aparece al
crear la interfaz. Es por ello que lo llamamos <code v-pre>backgroundPanel</code>.</li>
<li>El panel superior es un JPanel que debe tener un tamaño de 1024x384 pixeles y se llamará <code v-pre>topPanel</code>.
Se dividirá como en la imagen previa.
<ol>
<li>El panel del personaje debe ser un JPanel y tener un tamaño de 256x384 pixeles y se llamará <code v-pre>playerPanel</code>.</li>
<li>El panel del enemigo debe ser un JPanel y tener un tamaño de 256x384 pixeles y se llamará <code v-pre>enemyPanel</code>.</li>
<li>El panel del sistema debe ser un JPanel y tener un tamaño de 512x384 pixeles y se llamará <code v-pre>mainPanel</code>.</li>
</ol>
</li>
<li>El panel debe ser un JTabbedPane y tener un tamaño de 1024x384 pixeles y se llamará <code v-pre>actionsPanel</code>.</li>
</ol>
</li>
<li>Para nuestra ventana, marcaremos que los elementos playerPanel, enemyPanel, mainPanel y actionsPanel serán creado con
un Custom Create esto creara la función <code v-pre>createUIComponents</code> en nuestra clase de Java.</li>
<li>Puedes Cerrar el editor una vez que hayas arrastrado los objetos en el editor y proceder al
archivo <code v-pre>GameWindow.java</code>.</li>
</ol>
<h2 id="implementacion-de-la-clase-gamewindow" tabindex="-1"><a class="header-anchor" href="#implementacion-de-la-clase-gamewindow"><span>Implementación de la clase <code v-pre>GameWindow</code></span></a></h2>
<p>Una vez que hayas diseñado la interfaz de la ventana principal, puedes proceder a implementar la clase <code v-pre>GameWindow</code> en
el archivo <code v-pre>GameWindow.java</code>. Para ello, sigue los siguientes pasos:</p>
<ol>
<li>Abre el archivo <code v-pre>GameWindow.java</code> y agrega los siguientes atributos a la clase:<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">GameWindow</span> instance<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">Player</span> player<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">Enemy</span> enemy<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>Agrega el siguiente método para obtener la instancia de la clase:<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">GameWindow</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">Player</span> player<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GameWindow</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>Agrega el siguiente constructor a la clase:<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">GameWindow</span><span class="token punctuation">(</span><span class="token class-name">Player</span> player<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>player <span class="token operator">=</span> player<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>enemy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Enemy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">startGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>Agrega el siguiente método para iniciar el juego:<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">startGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//Título de la Ventana</span>
    <span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">"Game Window"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Operación por defecto de cierre</span>
    <span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//No la hacemos escalable</span>
    <span class="token function">setResizable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Agregamos el panel principal</span>
    <span class="token function">add</span><span class="token punctuation">(</span>backgroundPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Tamaño de la ventana</span>
    <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Centramos la ventana</span>
    <span class="token function">setLocationRelativeTo</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Hacemos visible la ventana</span>
    <span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>Creamos los componentes personalizados en la clase <code v-pre>GameWindow</code>:<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createUIComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">//Agregamos el panel del jugador</span>
   playerPanel <span class="token operator">=</span> <span class="token class-name">PlayerPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//Agregamos el enemigo</span>
   enemy <span class="token operator">=</span> <span class="token class-name">EnemyFactory</span><span class="token punctuation">.</span><span class="token function">generateRegularEnemy</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//Agregamos el panel del enemigo</span>
   enemyPanel <span class="token operator">=</span> <span class="token class-name">EnemyPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//Agregamos el panel principal</span>
   mainPanel <span class="token operator">=</span> <span class="token class-name">MainPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//Agregamos las pestañas</span>
   actionTabs <span class="token operator">=</span> <span class="token class-name">ActionsPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//Agregamos el panel de estado</span>
   statusPanel <span class="token operator">=</span> <span class="token class-name">StatusPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//Agregamos el panel de batalla</span>
   battlePanel <span class="token operator">=</span> <span class="token class-name">BattlePanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>Si seguimos estos pasos nuestra clase se debería de ver de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GameWindow</span> <span class="token keyword">extends</span> <span class="token class-name">JFrame</span> <span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">GameWindow</span> instance<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> backgroundPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Player</span> player<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Enemy</span> enemy<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JTabbedPane</span> actionTabs<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> topPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> playerPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> enemyPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> mainPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> statusPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> battlePanel<span class="token punctuation">;</span>
    
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">GameWindow</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">Player</span> player<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token comment">//Si la instancia es nula, la creamos</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
                instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GameWindow</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//Devolvemos la instancia</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">private</span> <span class="token class-name">GameWindow</span><span class="token punctuation">(</span><span class="token class-name">Player</span> player<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">this</span><span class="token punctuation">.</span>player <span class="token operator">=</span> player<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">startGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token comment">//Título de la Ventana</span>
            <span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">"Game Window"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Operación por defecto de cierre</span>
            <span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//No la hacemos escalable</span>
            <span class="token function">setResizable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos el panel principal</span>
            <span class="token function">add</span><span class="token punctuation">(</span>backgroundPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Tamaño de la ventana</span>
            <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Centramos la ventana</span>
            <span class="token function">setLocationRelativeTo</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Hacemos visible la ventana</span>
            <span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createUIComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token comment">//Agregamos el panel del jugador</span>
            playerPanel <span class="token operator">=</span> <span class="token class-name">PlayerPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos el enemigo</span>
            enemy <span class="token operator">=</span> <span class="token class-name">EnemyFactory</span><span class="token punctuation">.</span><span class="token function">generateRegularEnemy</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos el panel del enemigo</span>
            enemyPanel <span class="token operator">=</span> <span class="token class-name">EnemyPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos el panel principal</span>
            mainPanel <span class="token operator">=</span> <span class="token class-name">MainPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos las pestañas</span>
            actionTabs <span class="token operator">=</span> <span class="token class-name">ActionsPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos el panel de estado</span>
            statusPanel <span class="token operator">=</span> <span class="token class-name">StatusPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Agregamos el panel de batalla</span>
            battlePanel <span class="token operator">=</span> <span class="token class-name">BattlePanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container important">
<p class="hint-container-title">Importante</p>
<p>Recuerda que debes crear las funciones get de los atributos de la ventana para tener acceso fuera de la clase.</p>
</div>
<p>Con esto, hemos creado la clase <code v-pre>GameWindow</code> que se encarga de gestionar la ventana principal del juego. En el siguiente
apartado, veremos cómo implementar los elementos de la ventana principal, como el fondo, el personaje, los enemigos, los
objetos, el HUD, los menús, el texto, los iconos, los botones, las barras de vida, las barras de energía y la barra de
experiencia.</p>
<p>Las clases <code v-pre>PlayerPanel</code>, <code v-pre>EnemyPanel</code>, <code v-pre>MainPanel</code>, <code v-pre>ActionsPanel</code>, <code v-pre>StatusPanel</code> y <code v-pre>BattlePanel</code> son clases que
representan los paneles de la ventana principal y se encargan de gestionar la información y la interacción entre los
elementos de la ventana principal. En el siguiente apartado, veremos cómo implementar estas clases y cómo se relacionan
entre sí.</p>
</div></template>


