<template><div><h1 id="la-ventana-de-nuevo-juego" tabindex="-1"><a class="header-anchor" href="#la-ventana-de-nuevo-juego"><span>La ventana de nuevo juego</span></a></h1>
<p>En esta ventana podremos crear un nuevo juego con las opciones que queramos. Para acceder a ella, simplemente debemos
ejecutar el programa.</p>
<figure><img src="@source/guide/interfaz/newgame.png" alt="newgame.png" tabindex="0" loading="lazy"><figcaption>newgame.png</figcaption></figure>
<h2 id="paso-1-crear-el-formulario" tabindex="-1"><a class="header-anchor" href="#paso-1-crear-el-formulario"><span>Paso 1: Crear el formulario</span></a></h2>
<ol>
<li>Abra IntelliJ IDEA y vaya a Archivo &gt; Nuevo &gt; Formulario GUI.</li>
<li>En la ventana emergente, elija un nombre para su formulario (por ejemplo, NewGameWindow).</li>
<li>Seleccione el administrador de diseño como GridLayoutManager.</li>
<li>Marque la opción Crear clase vinculada y especifique el nombre de clase deseado (por ejemplo, gui.NewGameWindow).</li>
<li>Haga clic en Aceptar.</li>
</ol>
<h2 id="paso-2-disenar-el-formulario" tabindex="-1"><a class="header-anchor" href="#paso-2-disenar-el-formulario"><span>Paso 2: Diseñar el formulario</span></a></h2>
<ol>
<li>El formulario se abrirá en la vista de diseño. Verá un diseño de cuadrícula con dos filas y una columna inicialmente.</li>
<li>Agregue otro diseño de cuadrícula con dos filas y dos columnas dentro de la primera fila de la cuadrícula principal.</li>
<li>Esto se usará para la sección de información del jugador.</li>
</ol>
<h2 id="paso-3-agregar-componentes" tabindex="-1"><a class="header-anchor" href="#paso-3-agregar-componentes"><span>Paso 3: Agregar componentes</span></a></h2>
<h3 id="informacion-del-jugador" tabindex="-1"><a class="header-anchor" href="#informacion-del-jugador"><span>Información del jugador:</span></a></h3>
<ol>
<li>En la segunda fila de la cuadrícula interna, agregue un componente JTextField llamado playerName.</li>
<li>Agregue un componente JLabel en la primera fila de la cuadrícula interna y establezca su texto en &quot;Nombre de
Jugador:&quot;.</li>
</ol>
<h3 id="texto-de-bienvenida" tabindex="-1"><a class="header-anchor" href="#texto-de-bienvenida"><span>Texto de bienvenida:</span></a></h3>
<ol>
<li>En la cuadrícula interna, agregue otro diseño de cuadrícula (JPanel) con dos filas y dos columnas.</li>
<li>Agregue un componente JTextArea en la segunda fila de nombre welcomeText.</li>
<li>Agregue un componente vspacer en la primera fila para crear un espacio encima del área de texto.</li>
<li>Agregue un componente JLabel en la primera fila de nombre portraitLabel. Establezca su tamaño
preferido en 117x127 píxeles.</li>
</ol>
<h3 id="botones" tabindex="-1"><a class="header-anchor" href="#botones"><span>Botones:</span></a></h3>
<ol>
<li>En la segunda fila de la cuadrícula principal, agregue otro diseño de cuadrícula (JPanel) con una fila y cuatro
columnas.</li>
<li>Agregue tres componentes JButton. Vincule dos de ellos a las variables startButton y exitButton. Establezca su texto
en &quot;Botón&quot; inicialmente.</li>
<li>Agregue un componente hspacer en la primera columna para crear un espacio entre el borde y los botones.</li>
</ol>
<h2 id="paso-4-ajustar-propiedades" tabindex="-1"><a class="header-anchor" href="#paso-4-ajustar-propiedades"><span>Paso 4: Ajustar propiedades</span></a></h2>
<ol>
<li>Establezca el tamaño preferido del panel principal (backgroundPanel) en 560x254 píxeles con márgenes.</li>
<li>Ajuste los márgenes del campo de texto y la etiqueta para la información del jugador.</li>
<li>Establezca el texto de los botones como desee.</li>
</ol>
<h2 id="paso-5-notas-adicionales" tabindex="-1"><a class="header-anchor" href="#paso-5-notas-adicionales"><span>Paso 5: Notas adicionales</span></a></h2>
<ol>
<li>Puede personalizar aún más la apariencia del formulario cambiando las fuentes, los colores y los bordes de los
componentes.</li>
</ol>
<h2 id="clase-newgamewindow" tabindex="-1"><a class="header-anchor" href="#clase-newgamewindow"><span>Clase NewGameWindow</span></a></h2>
<p>La ventana de nuevo juego es muy sencilla, pero es la base para poder jugar. En la siguiente ventana, podremos ver cómo
se ve el juego en sí.</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">package</span> <span class="token namespace">gui</span><span class="token punctuation">;</span>
    
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>buttons<span class="token punctuation">.</span></span><span class="token class-name">ExitButton</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>buttons<span class="token punctuation">.</span></span><span class="token class-name">StartButton</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>labels<span class="token punctuation">.</span></span><span class="token class-name">PortraitLabel</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">util<span class="token punctuation">.</span>managers<span class="token punctuation">.</span></span><span class="token class-name">FontManager</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">util<span class="token punctuation">.</span>managers<span class="token punctuation">.</span></span><span class="token class-name">ImageManager</span></span><span class="token punctuation">;</span>
    
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>swing<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NewGameWindow</span> <span class="token keyword">extends</span> <span class="token class-name">JFrame</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">private</span> <span class="token class-name">JPanel</span> backgroundPanel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JButton</span> exitButton<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JButton</span> startButton<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JTextArea</span> welcomeText<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JTextField</span> playerName<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JLabel</span> playerLabel<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">JLabel</span> portraitLabel<span class="token punctuation">;</span>
    
        <span class="token keyword">public</span> <span class="token class-name">NewGameWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">"New Game"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">add</span><span class="token punctuation">(</span>backgroundPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">DO_NOTHING_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setLocationRelativeTo</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setResizable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"¡Bienvenido al mundo de JavaRPG!\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"¿Estás listo para comenzar tu aventura?\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"¡Elige tu nombre de jugador y comencemos!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">setOpaque</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">setEditable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token class-name">FontManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token string">"Standard"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            welcomeText<span class="token punctuation">.</span><span class="token function">setForeground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span><span class="token constant">WHITE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            playerName<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token class-name">FontManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token string">"Standard"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            playerName<span class="token punctuation">.</span><span class="token function">setForeground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span><span class="token constant">WHITE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            playerLabel<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token class-name">FontManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token string">"Standard"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            playerLabel<span class="token punctuation">.</span><span class="token function">setForeground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span><span class="token constant">WHITE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">createUIComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            backgroundPanel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
                <span class="token annotation punctuation">@Override</span>
                <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">paintComponent</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
                    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">paintComponent</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">Graphics2D</span> g2d <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Graphics2D</span><span class="token punctuation">)</span> g<span class="token punctuation">;</span>
                    g2d<span class="token punctuation">.</span><span class="token function">setRenderingHint</span><span class="token punctuation">(</span><span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">KEY_ANTIALIASING</span><span class="token punctuation">,</span> <span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">VALUE_ANTIALIAS_ON</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    g2d<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token class-name">ImageManager</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getImage</span><span class="token punctuation">(</span><span class="token string">"skillPanel"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            portraitLabel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PortraitLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            startButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StartButton</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            exitButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ExitButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPlayerName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">return</span> playerName<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


