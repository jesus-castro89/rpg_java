import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,b as e}from"./app-HJOKgcK2.js";const t={},p=e(`<h1 id="panel-de-fondo" tabindex="-1"><a class="header-anchor" href="#panel-de-fondo"><span>Panel de fondo</span></a></h1><p>En esta sección aprenderemos a añadir un panel de fondo a nuestra ventana principal. Para ello, crearemos una clase <code>BackgroundPanel</code> que extienda de <code>JPanel</code> y sobreescriba el método <code>paintComponent</code> para dibujar una imagen de fondo.</p><h2 id="paso-1-crear-la-clase-backgroundpanel" tabindex="-1"><a class="header-anchor" href="#paso-1-crear-la-clase-backgroundpanel"><span>Paso 1: Crear la clase <code>BackgroundPanel</code></span></a></h2><ol><li>Abra IntelliJ IDEA y cree una nueva clase llamada <code>BackgroundPanel</code> en el paquete <code>gui.panels</code> con el siguiente código:</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>panels</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>swing<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BackGroundPanel</span> <span class="token keyword">extends</span> <span class="token class-name">JPanel</span> <span class="token punctuation">{</span>

	<span class="token keyword">protected</span> <span class="token class-name">Image</span> image<span class="token punctuation">;</span>
	<span class="token keyword">protected</span> <span class="token class-name">Dimension</span> dimension<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">BackGroundPanel</span><span class="token punctuation">(</span><span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name">Dimension</span> dimension<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>image <span class="token operator">=</span> image<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>dimension <span class="token operator">=</span> dimension<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setMaximumSize</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setMinimumSize</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setPreferredSize</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setOpaque</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">paintComponent</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">paintComponent</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Graphics2D</span> g2d <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Graphics2D</span><span class="token punctuation">)</span> g<span class="token punctuation">;</span>
		g2d<span class="token punctuation">.</span><span class="token function">setRenderingHint</span><span class="token punctuation">(</span><span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">KEY_INTERPOLATION</span><span class="token punctuation">,</span> <span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">VALUE_INTERPOLATION_BILINEAR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		g2d<span class="token punctuation">.</span><span class="token function">setRenderingHint</span><span class="token punctuation">(</span><span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">KEY_RENDERING</span><span class="token punctuation">,</span> <span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">VALUE_RENDER_QUALITY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		g2d<span class="token punctuation">.</span><span class="token function">setRenderingHint</span><span class="token punctuation">(</span><span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">KEY_ANTIALIASING</span><span class="token punctuation">,</span> <span class="token class-name">RenderingHints</span><span class="token punctuation">.</span><span class="token constant">VALUE_ANTIALIAS_ON</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		g2d<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> dimension<span class="token punctuation">.</span>width<span class="token punctuation">,</span> dimension<span class="token punctuation">.</span>height<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Con esta clase, podemos crear un panel de fondo que se ajuste a una imagen y a una dimensión específica.</p>`,6),o=[p];function c(i,l){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","BackGroundPanel.html.vue"]]),k=JSON.parse('{"path":"/guide/utilities/BackGroundPanel.html","title":"Panel de fondo","lang":"es-ES","frontmatter":{"icon":"suitcase","title":"Panel de fondo","description":"Añadamos un panel de fondo a nuestra ventana principal.","head":[["meta",{"property":"og:url","content":"https://jesus-castro89.github.io/rpg_java/rpg_java/guide/utilities/BackGroundPanel.html"}],["meta",{"property":"og:site_name","content":"RPG Java"}],["meta",{"property":"og:title","content":"Panel de fondo"}],["meta",{"property":"og:description","content":"Añadamos un panel de fondo a nuestra ventana principal."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"es-ES"}],["meta",{"property":"og:updated_time","content":"2024-05-08T03:27:36.000Z"}],["meta",{"property":"article:author","content":"M. en E. Jesús Aurelio Castro Magaña"}],["meta",{"property":"article:modified_time","content":"2024-05-08T03:27:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Panel de fondo\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-08T03:27:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"M. en E. Jesús Aurelio Castro Magaña\\",\\"url\\":\\"https://github.com/jesus-castro89\\"}]}"]]},"headers":[{"level":2,"title":"Paso 1: Crear la clase BackgroundPanel","slug":"paso-1-crear-la-clase-backgroundpanel","link":"#paso-1-crear-la-clase-backgroundpanel","children":[]}],"git":{"createdTime":1715138856000,"updatedTime":1715138856000,"contributors":[{"name":"Jesús Aurelio Castro Magaña","email":"jesus_castrom@my.unitec.edu.mx","commits":1}]},"readingTime":{"minutes":0.55,"words":166},"filePathRelative":"guide/utilities/BackGroundPanel.md","localizedDate":"8 de mayo de 2024"}');export{r as comp,k as data};