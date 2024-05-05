<template><div><h1 id="excepciones" tabindex="-1"><a class="header-anchor" href="#excepciones"><span>Excepciones</span></a></h1>
<p>Las excepciones son errores que ocurren durante la ejecución de un programa. Estos errores pueden ser de varios tipos,
como por ejemplo, errores de sintaxis, errores de lógica, errores de tiempo de ejecución, etc.</p>
<p>En Java, las excepciones son objetos que se lanzan cuando ocurre un error. Estos objetos pueden ser capturados y
tratados por el programador, para evitar que el programa se detenga.</p>
<h2 id="enemydeadexception" tabindex="-1"><a class="header-anchor" href="#enemydeadexception"><span>EnemyDeadException</span></a></h2>
<p>Esta excepción se lanza cuando un enemigo muere.</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>exceptions</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EnemyDeadException</span> <span class="token keyword">extends</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">EnemyDeadException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"El Enemigo recibió un overkill"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="playerdeadexception" tabindex="-1"><a class="header-anchor" href="#playerdeadexception"><span>PlayerDeadException</span></a></h2>
<p>Esta excepción se lanza cuando el jugador muere.</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>exceptions</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PlayerDeadException</span> <span class="token keyword">extends</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">public</span> <span class="token class-name">PlayerDeadException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"El jugador ha muerto"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="zeroexception" tabindex="-1"><a class="header-anchor" href="#zeroexception"><span>ZeroException</span></a></h2>
<p>Esta excepción se lanza cuando se intenta dividir por cero.</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">gui<span class="token punctuation">.</span>exceptions</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ZeroException</span> <span class="token keyword">extends</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ZeroException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">"El Dato ingresado en 0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


