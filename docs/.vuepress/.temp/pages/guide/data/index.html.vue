<template><div><h1 id="el-guardado-de-datos" tabindex="-1"><a class="header-anchor" href="#el-guardado-de-datos"><span>El guardado de datos</span></a></h1>
<p>En esta sección aprenderemos a guardar y cargar datos en nuestro programa. Para ello, utilizaremos la clase <code v-pre>File</code> de
Java, que nos permitirá leer y escribir archivos en el sistema de archivos del usuario, y modificaremos la
clase <code v-pre>FileManager</code> para que pueda guardar y cargar los datos de nuestro juego.</p>
<h2 id="paso-1-actualizar-la-clase-filemanager" tabindex="-1"><a class="header-anchor" href="#paso-1-actualizar-la-clase-filemanager"><span>Paso 1: Actualizar la clase <code v-pre>FileManager</code></span></a></h2>
<ol>
<li>
<p>Abra IntelliJ IDEA y vaya a la clase <code v-pre>FileManager</code>.</p>
</li>
<li>
<p>Modifica los métodos de la clase para que ahora se vean de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Player</span> <span class="token function">loadGame</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
    
            <span class="token class-name">Player</span> player<span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
    
                <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"files/game%d.dat"</span><span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                player <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Player</span><span class="token punctuation">)</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> <span class="token operator">|</span> <span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> player<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">saveGame</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token class-name">ObjectOutputStream</span> oos<span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Player</span> player <span class="token operator">=</span> <span class="token class-name">Player</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"files/game%d.dat"</span><span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    oos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token function">showMessageDialog</span><span class="token punctuation">(</span><span class="token class-name">GameWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>player<span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">"Error al guardar la partida"</span><span class="token punctuation">,</span> <span class="token string">"Error"</span><span class="token punctuation">,</span> <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token constant">ERROR_MESSAGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
                <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token function">showMessageDialog</span><span class="token punctuation">(</span><span class="token class-name">GameWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">Player</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token string">"Error al guardar la partida"</span><span class="token punctuation">,</span> <span class="token string">"Error"</span><span class="token punctuation">,</span> <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token constant">ERROR_MESSAGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Modifica la clase <code v-pre>GameWindow</code> para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Método que devuelve la instancia de la ventana principal
     *
     * <span class="token keyword">@param</span> <span class="token parameter">player</span> El jugador
     * <span class="token keyword">@param</span> <span class="token parameter">slot</span>   El slot de guardado
     *
     * <span class="token keyword">@return</span> La instancia de la ventana principal
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">GameWindow</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">Player</span> player<span class="token punctuation">,</span> <span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">//Si la instancia es nula, la creamos</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GameWindow</span><span class="token punctuation">(</span>player<span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//Devolvemos la instancia</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Constructor de la clase
     *
     * <span class="token keyword">@param</span> <span class="token parameter">player</span> El jugador
     * <span class="token keyword">@param</span> <span class="token parameter">slot</span>   El slot de guardado
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">GameWindow</span><span class="token punctuation">(</span><span class="token class-name">Player</span> player<span class="token punctuation">,</span> <span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>player <span class="token operator">=</span> player<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>slot <span class="token operator">=</span> slot<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Método que devuelve la instancia de la ventana principal
     *
     * <span class="token keyword">@return</span> La instancia de la ventana principal
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">GameWindow</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Modifica la clase <code v-pre>SaveButton</code> para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>buttons</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>panels<span class="token punctuation">.</span></span><span class="token class-name">DialogPanel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">util<span class="token punctuation">.</span>managers<span class="token punctuation">.</span></span><span class="token class-name">FileManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SaveButton</span> <span class="token keyword">extends</span> <span class="token class-name">ActionButton</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">SaveButton</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"Guardar"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Asignar la acción de guardar el avance del jugador en el archivo correspondiente</span>
        <span class="token function">addActionListener</span><span class="token punctuation">(</span>e <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token comment">// Save the game</span>
            <span class="token class-name">FileManager</span><span class="token punctuation">.</span><span class="token function">saveGame</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// Agregamos un texto al panel de diálogo para indicar que la partida se guardó correctamente</span>
            <span class="token class-name">DialogPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addText</span><span class="token punctuation">(</span><span class="token triple-quoted-string string">"""
                    ------------------------------------------------
                    ¡Partida guardada correctamente!
                    ------------------------------------------------
                    """</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Modifica la clase <code v-pre>BattlePanel</code> para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createUIComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        attackButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AttackButton</span><span class="token punctuation">(</span>enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        fleeButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FleeButton</span><span class="token punctuation">(</span>enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        saveButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SaveButton</span><span class="token punctuation">(</span><span class="token class-name">GameWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSlot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        exitButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ExitButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        skillsPanel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SkillPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>Con estos cambios, la clase <code v-pre>FileManager</code> ahora puede guardar, cargar y borrar partidas de nuestro juego.</p>
<h2 id="paso-2-creemos-la-ventana-de-inicio-del-juego-y-la-ventana-de-carga-de-partida" tabindex="-1"><a class="header-anchor" href="#paso-2-creemos-la-ventana-de-inicio-del-juego-y-la-ventana-de-carga-de-partida"><span>Paso 2: Creemos la ventana de inicio del juego y la ventana de carga de partida.</span></a></h2>
<ol>
<li>Usando el gestor de interfaces de IntelliJ IDEA, crea el panel llamado <code v-pre>StartPanel</code> en el paquete panels.
<img src="@source/guide/data/img.png" alt="img.png" loading="lazy"></li>
<li>Dentro de la ventana <code v-pre>StartPanel</code>, modifica el nombre del panel inicial a <code v-pre>backgroundPanel</code> y agrega un margen de 10
píxeles a cada lado.
<img src="@source/guide/data/img_1.png" alt="img_1.png" loading="lazy"></li>
<li>Modifica las dimensiones de la ventana a 960x540 píxeles.
<img src="@source/guide/data/img_2.png" alt="img_2.png" loading="lazy"></li>
<li>Agrega 5 paneles a la ventana <code v-pre>StartPanel</code> y modifica sus nombres a <code v-pre>titlePanel</code>, <code v-pre>slot1Panel</code>, <code v-pre>slot2Panel</code>,
<code v-pre>slot3Panel</code> y <code v-pre>slot4Panel</code>.
<img src="@source/guide/data/img_6.png" alt="img_6.png" loading="lazy"></li>
<li>Agrega una etiqueta en el panel <code v-pre>titlePanel</code> con el texto &quot;Java RPG&quot; y modifica su fuente a &quot;Arial&quot;, tamaño 36 y
negrita. Alinea la etiqueta al centro del panel. Modifica el color de la fuente a blanco.
<img src="@source/guide/data/img_7.png" alt="img_7.png" loading="lazy">
<img src="@source/guide/data/img_8.png" alt="img_8.png" loading="lazy"></li>
<li>Agrega una etiqueta y tres botones en cada panel de ranura (<code v-pre>slot1Panel</code>, <code v-pre>slot2Panel</code>, <code v-pre>slot3Panel</code> y
<code v-pre>slot4Panel</code>). Modifica el texto de las etiquetas y botones a &quot;&quot;.
<img src="@source/guide/data/img_3.png" alt="img_3.png" loading="lazy"></li>
<li>Modifica las dimensiones de los botones a 117x29 píxeles. Y el alineamiento horizontal de los botones a &quot;centro&quot;.
<img src="@source/guide/data/img_4.png" alt="img_4.png" loading="lazy"></li>
<li>De igual manera, modifica las dimensiones de las etiquetas a 200x50 píxeles. Y el alineamiento horizontal de las
etiquetas a &quot;centro&quot;.
<img src="@source/guide/data/img_5.png" alt="img_5.png" loading="lazy"></li>
<li>Modifica el nombre de cada etiqueta y botón de la siguiente manera:
<ul>
<li><code v-pre>slot1Label</code>, <code v-pre>slot1NewGameButton</code> y <code v-pre>slot1LoadGameButton</code> para el panel <code v-pre>slot1Panel</code>.</li>
<li><code v-pre>slot2Label</code>, <code v-pre>slot2NewGameButton</code> y <code v-pre>slot2LoadGameButton</code> para el panel <code v-pre>slot2Panel</code>.</li>
<li><code v-pre>slot3Label</code>, <code v-pre>slot3NewGameButton</code> y <code v-pre>slot3LoadGameButton</code> para el panel <code v-pre>slot3Panel</code>.</li>
<li><code v-pre>slot4Label</code>, <code v-pre>slot4NewGameButton</code> y <code v-pre>slot4LoadGameButton</code> para el panel <code v-pre>slot4Panel</code>.</li>
</ul>
</li>
<li>En cada botón deberás marcar la opción de &quot;Custom Create&quot;.
<img src="@source/guide/data/img_10.png" alt="img_10.png" loading="lazy"></li>
</ol>
<p>Con estos cambios, hemos creado la ventana de inicio del juego y la ventana de carga de partida.</p>
<h2 id="paso-3-creemos-los-botones-de-la-ventana-de-inicio-del-juego" tabindex="-1"><a class="header-anchor" href="#paso-3-creemos-los-botones-de-la-ventana-de-inicio-del-juego"><span>Paso 3: Creemos los botones de la ventana de inicio del juego.</span></a></h2>
<ol>
<li>
<p>Abra IntelliJ IDEA y crea las clases <code v-pre>NewGameButton</code> y <code v-pre>LoadGameButton</code> en el paquete <code v-pre>buttons</code>.</p>
</li>
<li>
<p>Haz que las clases <code v-pre>NewGameButton</code> y <code v-pre>LoadGameButton</code> hereden de <code v-pre>ActionButton</code>.</p>
</li>
<li>
<p>Modifica el constructor de cada clase para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">NewGameButton</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"Nueva Partida"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">LoadGameButton</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"Cargar Partida"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Agrega un atributo de la clase <code v-pre>int slot</code> a cada clase.</p>
</li>
<li>
<p>Crea una clase llamada <code v-pre>FileListener</code> en el paquete <code v-pre>events</code>.</p>
</li>
<li>
<p>Haz que la clase <code v-pre>FileListener</code> implemente la interfaz <code v-pre>ActionListener</code>.</p>
</li>
<li>
<p>Agrega un atributo de la clase <code v-pre>int slot</code> a la clase <code v-pre>FileListener</code>.</p>
</li>
<li>
<p>Agrega un atributo de la clase <code v-pre>ActionButton action</code> a la clase <code v-pre>FileListener</code>.</p>
</li>
<li>
<p>Agrega un constructor a la clase <code v-pre>FileListener</code> que reciba un <code v-pre>ActionButton action</code> y un <code v-pre>int slot</code>.</p>
</li>
<li>
<p>Modifica el constructor de cada clase para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">NewGameButton</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"Nueva Partida"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">addActionListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">LoadGameButton</span><span class="token punctuation">(</span><span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"Cargar Partida"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">addActionListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Modifica la clase <code v-pre>FileListener</code> para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>events</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>windows<span class="token punctuation">.</span></span><span class="token class-name">GameWindow</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>windows<span class="token punctuation">.</span></span><span class="token class-name">NewGameWindow</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>buttons<span class="token punctuation">.</span></span><span class="token class-name">ActionButton</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>buttons<span class="token punctuation">.</span></span><span class="token class-name">LoadGameButton</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>buttons<span class="token punctuation">.</span></span><span class="token class-name">NewGameButton</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>windows<span class="token punctuation">.</span></span><span class="token class-name">StartWindow</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">player<span class="token punctuation">.</span></span><span class="token class-name">Player</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">util<span class="token punctuation">.</span>managers<span class="token punctuation">.</span></span><span class="token class-name">FileManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>swing<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">ActionEvent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">ActionListener</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileNotFoundException</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileListener</span> <span class="token keyword">implements</span> <span class="token class-name">ActionListener</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> slot<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ActionButton</span> button<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">FileListener</span><span class="token punctuation">(</span><span class="token class-name">ActionButton</span> button<span class="token punctuation">,</span> <span class="token keyword">int</span> slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>


        <span class="token keyword">this</span><span class="token punctuation">.</span>slot <span class="token operator">=</span> slot<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>button <span class="token operator">=</span> button<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">actionPerformed</span><span class="token punctuation">(</span><span class="token class-name">ActionEvent</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// Este método se encarga de gestionar las acciones de los botones de la ventana de inicio</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>button<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token class-name">NewGameButton</span> _ <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">StartWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// Si el botón es de nueva partida, se abre la ventana de nueva partida</span>
                <span class="token class-name">NewGameWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">case</span> <span class="token class-name">LoadGameButton</span> _ <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token comment">// Si el botón es de cargar partida, se carga la partida del slot correspondiente</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Se carga la partida y se abre la ventana de juego</span>
                    <span class="token class-name">Player</span> player <span class="token operator">=</span> <span class="token class-name">FileManager</span><span class="token punctuation">.</span><span class="token function">loadGame</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">StartWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">GameWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>player<span class="token punctuation">,</span> slot<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> fileNotFoundException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Si no se encuentra la partida, se muestra un mensaje de error</span>
                    <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token function">showMessageDialog</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"No hay partida guardada en este slot"</span><span class="token punctuation">,</span>
                            <span class="token string">"Error"</span><span class="token punctuation">,</span> <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token constant">ERROR_MESSAGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">default</span> <span class="token operator">-></span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">"Unexpected value: "</span> <span class="token operator">+</span> button<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="paso-4-editemos-la-clase-de-la-ventana-de-inicio-del-juego-startpanel" tabindex="-1"><a class="header-anchor" href="#paso-4-editemos-la-clase-de-la-ventana-de-inicio-del-juego-startpanel"><span>Paso 4: Editemos la clase de la ventana de inicio del juego <code v-pre>StartPanel</code>.</span></a></h2>
<ol>
<li>
<p>Abra IntelliJ IDEA y vaya a la clase <code v-pre>StartPanel</code>.</p>
</li>
<li>
<p>Haz que la clase <code v-pre>StartPanel</code> herede de <code v-pre>BackgroundPanel</code>. La clase <code v-pre>BackgroundPanel</code> es una clase que hemos creado
para poder agregar un fondo a los paneles de nuestra interfaz gráfica. Para ello, modifica la clase de la siguiente
manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StartPanel</span> <span class="token keyword">extends</span> <span class="token class-name">BackgroundPanel</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Usaremos el patrón Singleton, por lo que debemos agregar un atributo estático de la clase <code v-pre>StartPanel</code> llamado
<code v-pre>instance</code> y un método estático llamado <code v-pre>getInstance</code> que devuelva la instancia de la clase. Modifica la clase de la
siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">StartPanel</span> instance<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">StartPanel</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StartPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Agrega un constructor privado a la clase <code v-pre>StartPanel</code> para que no se pueda instanciar desde fuera de la clase.</p>
</li>
<li>
<p>Modifica el constructor de la clase para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">StartPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token class-name">ImageManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getImage</span><span class="token punctuation">(</span><span class="token string">"skillPanel"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Dimension</span><span class="token punctuation">(</span><span class="token number">960</span><span class="token punctuation">,</span> <span class="token number">540</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">add</span><span class="token punctuation">(</span>backgroundPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Cargamos el nombre de la partida</span>
            <span class="token class-name">String</span> slotName <span class="token operator">=</span> <span class="token string">"Slot "</span> <span class="token operator">+</span> i<span class="token punctuation">;</span>
            <span class="token class-name">JLabel</span> slotLabel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>

                slotLabel <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">JLabel</span><span class="token punctuation">)</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"slot"</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">"Label"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Player</span> player <span class="token operator">=</span> <span class="token class-name">FileManager</span><span class="token punctuation">.</span><span class="token function">loadGame</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>player <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    slotName <span class="token operator">=</span> player<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span>slotName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setHorizontalAlignment</span><span class="token punctuation">(</span><span class="token class-name">SwingConstants</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setHorizontalTextPosition</span><span class="token punctuation">(</span><span class="token class-name">SwingConstants</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setForeground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span><span class="token constant">WHITE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token class-name">FontManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token string">"Standard"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token number">1</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                        slot1NewGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        slot1LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">case</span> <span class="token number">2</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                        slot2NewGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        slot2LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">case</span> <span class="token number">3</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                        slot3NewGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        slot3LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">case</span> <span class="token number">4</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                        slot4NewGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        slot4LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IllegalAccessException</span> <span class="token operator">|</span> <span class="token class-name">NoSuchFieldException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>

                <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token function">showMessageDialog</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">"Error al cargar la partida "</span> <span class="token operator">+</span> i<span class="token punctuation">,</span>
                        <span class="token string">"Error"</span><span class="token punctuation">,</span> <span class="token class-name">JOptionPane</span><span class="token punctuation">.</span><span class="token constant">ERROR_MESSAGE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>

                slotLabel<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">"-- Vació --"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setHorizontalAlignment</span><span class="token punctuation">(</span><span class="token class-name">SwingConstants</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setHorizontalTextPosition</span><span class="token punctuation">(</span><span class="token class-name">SwingConstants</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setForeground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span><span class="token constant">RED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                slotLabel<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token class-name">FontManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token string">"Standard"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token number">1</span> <span class="token operator">-></span> slot1LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token number">2</span> <span class="token operator">-></span> slot2LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token number">3</span> <span class="token operator">-></span> slot3LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">case</span> <span class="token number">4</span> <span class="token operator">-></span> slot4LoadGameButton<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Modifica la función <code v-pre>createUIComponents</code> para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createUIComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// Creamos los botones de cargar partida</span>
        slot1LoadGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LoadGameButton</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slot2LoadGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LoadGameButton</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slot3LoadGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LoadGameButton</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slot4LoadGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LoadGameButton</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Creamos los botones de nueva partida</span>
        slot1NewGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewGameButton</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slot2NewGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewGameButton</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slot3NewGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewGameButton</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        slot4NewGameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewGameButton</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Retira la opacidad a todos los paneles de la ventana <code v-pre>StartPanel</code>.</p>
</li>
<li>
<p>Modifica la clase <code v-pre>StartWindow</code> para que ahora se vea de la siguiente manera:</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>windows</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>panels<span class="token punctuation">.</span></span><span class="token class-name">StartPanel</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>swing<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StartWindow</span> <span class="token keyword">extends</span> <span class="token class-name">JFrame</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">StartWindow</span> instance<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">StartWindow</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StartWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">StartWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"Start Window"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">StartPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setLocationRelativeTo</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setResizable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">StartPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">StartWindow</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">Consejos</p>
<p>En este paso, hemos creado la ventana de inicio del juego y los botones para crear, borrar y cargar partidas. Además,
hemos implementado la lógica para guardar, borrar y cargar partidas en la clase <code v-pre>FileListener</code>.</p>
</div>
</div></template>


