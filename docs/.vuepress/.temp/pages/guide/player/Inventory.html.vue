<template><div><h1 id="inventario" tabindex="-1"><a class="header-anchor" href="#inventario"><span>Inventario</span></a></h1>
<p>Para poder trabajar con el inventario, es primordial modificar los Items, es por ello que crearemos la clase Item, esta
clase servirá como base para todo Item del juego, desde armas, armaduras, etc.</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">package</span> <span class="token namespace">player</span><span class="token punctuation">;</span>
    
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">gui<span class="token punctuation">.</span>panels<span class="token punctuation">.</span></span><span class="token class-name">DialogPanel</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span></span><span class="token class-name">Item</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">util<span class="token punctuation">.</span></span><span class="token class-name">FixedArrayList</span></span><span class="token punctuation">;</span>
    
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
    
    <span class="token doc-comment comment">/**
     * Inventory es una clase que representa el inventario del jugador.
     *
     * <span class="token keyword">@version</span> 1.0
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Inventory</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    
        <span class="token doc-comment comment">/**
         * La lista de elementos en el inventario.
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">FixedArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token punctuation">;</span>
    
        <span class="token doc-comment comment">/**
         * Construye un nuevo inventario con una capacidad fija de 15.
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">Inventory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FixedArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Agrega un elemento al inventario.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">item</span> el elemento a agregar
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addItem</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token class-name">String</span> addMessage <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"%s se ha agregado al Inventario!\n"</span><span class="token punctuation">,</span> item<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">DialogPanel</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addText</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">?</span> addMessage <span class="token operator">:</span> <span class="token string">"Inventario Lleno.\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Remueve un elemento del inventario.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">item</span> el elemento a remover
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            items<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Obtiene la lista de elementos en el inventario.
         *
         * <span class="token keyword">@return</span> la lista de elementos en el inventario
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">FixedArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">getItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">return</span> items<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Como podrás notar, solo cuenta con un nombre y una descripción, aunque tu puedes agregar lo que gustes a esta nueva
clase base.</p>
<h2 id="fixedarraylist" tabindex="-1"><a class="header-anchor" href="#fixedarraylist"><span>FixedArrayList</span></a></h2>
<p>La clase <code v-pre>FixedArrayList</code> es una clase que extiende de <code v-pre>ArrayList</code> y que tiene una capacidad fija, es decir, no puede
crecer más allá de la capacidad que se le haya asignado.</p>
<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre v-pre class="language-java"><code>    <span class="token keyword">package</span> <span class="token namespace">util</span><span class="token punctuation">;</span>
    
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span></span><span class="token class-name">Item</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span></span><span class="token class-name">ItemType</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span>armors<span class="token punctuation">.</span></span><span class="token class-name">Armor</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span>weapons<span class="token punctuation">.</span></span><span class="token class-name">Weapon</span></span><span class="token punctuation">;</span>
    
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token class-name">Collectors</span></span><span class="token punctuation">;</span>
    
    <span class="token doc-comment comment">/**
     * Una FixedArrayList es una lista que tiene una capacidad fija y puede cambiar de tamaño de acuerdo a su función
     * expandCapacity.
     *
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span> the type of elements in the list
     *
     * <span class="token keyword">@author</span> jesus
     * <span class="token keyword">@version</span> 1.0
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FixedArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> capacity<span class="token punctuation">;</span>
    
        <span class="token doc-comment comment">/**
         * Construye una nueva FixedArrayList con la capacidad especificada.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">capacity</span> la capacidad de la lista
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">FixedArrayList</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">super</span><span class="token punctuation">(</span>capacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Agrega el elemento especificado a la lista si la lista no está llena.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">e</span> el elemento a agregar
         *
         * <span class="token keyword">@return</span> verdadero si se agregó el elemento, falso si la lista está llena.
         */</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">T</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">return</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> capacity <span class="token operator">&amp;&amp;</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Expande la capacidad de la lista en la cantidad especificada.
         *
         * <span class="token keyword">@param</span> <span class="token parameter">amount</span> la cantidad en la que se expandirá la capacidad.
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">expandCapacity</span><span class="token punctuation">(</span><span class="token keyword">int</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            capacity <span class="token operator">+=</span> amount<span class="token punctuation">;</span>
            <span class="token function">ensureCapacity</span><span class="token punctuation">(</span>capacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Filtra los elementos de la lista que son armaduras.
         *
         * <span class="token keyword">@return</span> una lista de armaduras
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Armor</span><span class="token punctuation">></span></span> <span class="token function">filterArmors</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Item</span><span class="token punctuation">)</span> item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">ItemType</span><span class="token punctuation">.</span><span class="token constant">ARMOR</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token class-name">Armor</span><span class="token punctuation">)</span> item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">filterMiscItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Item</span><span class="token punctuation">)</span> item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">ItemType</span><span class="token punctuation">.</span><span class="token constant">MISC</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token class-name">Item</span><span class="token punctuation">)</span> item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    
        <span class="token doc-comment comment">/**
         * Filtra los elementos de la lista que son armas.
         *
         * <span class="token keyword">@return</span> una lista de armas
         */</span>
        <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Weapon</span><span class="token punctuation">></span></span> <span class="token function">filterWeapons</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Item</span><span class="token punctuation">)</span> item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">ItemType</span><span class="token punctuation">.</span><span class="token constant">WEAPON</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token class-name">Weapon</span><span class="token punctuation">)</span> item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Como podrás notar, la clase <code v-pre>FixedArrayList</code> tiene métodos para filtrar los elementos de la lista que son armaduras o
armas, además de un método para filtrar los elementos que son de tipo misceláneo.</p>
</div></template>


