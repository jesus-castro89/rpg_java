import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,b as t}from"./app-HJOKgcK2.js";const p={},e=t(`<h2 id="player" tabindex="-1"><a class="header-anchor" href="#player"><span>Player</span></a></h2><p>Ahora que ya contamos con nuestro inventario, recuerda agregarlo a la clase Player, en este caso dejo para ustedes el formato completo de la clase para tomar como referencia. Recuerden que pueden y deben cambiar los nombres de algunas funciones, puesto que se deberán de agregar atributos diferentes en cada uno de los equipos de trabajo.</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">player</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">characters<span class="token punctuation">.</span></span><span class="token class-name">BasicCharacter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">enemies<span class="token punctuation">.</span></span><span class="token class-name">Enemy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span>armors<span class="token punctuation">.</span></span><span class="token class-name">Armor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">items<span class="token punctuation">.</span>weapons<span class="token punctuation">.</span></span><span class="token class-name">Weapon</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>jetbrains<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">NotNull</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">player<span class="token punctuation">.</span>debuffs<span class="token punctuation">.</span></span><span class="token class-name">Debuff</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">util<span class="token punctuation">.</span></span><span class="token class-name">Randomized</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token keyword">extends</span> <span class="token class-name">BasicCharacter</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token keyword">int</span> strength<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> defense<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> intelligence<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> dexterity<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> luck<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> experience<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> level<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">int</span> gold<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">Weapon</span> weapon<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">Armor</span> armor<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Inventory</span> inventory<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		experience <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		level <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
		gold <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		weapon <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		armor <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token function">randomizeStats</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		inventory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Inventory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">randomizeStats</span><span class="token punctuation">(</span><span class="token keyword">int</span> maxPoints<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">int</span> stat <span class="token operator">=</span> <span class="token class-name">Randomized</span><span class="token punctuation">.</span><span class="token function">randomizeNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>maxPoints <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">switch</span> <span class="token punctuation">(</span>stat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">case</span> <span class="token number">1</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span>strength <span class="token operator">&lt;</span> <span class="token punctuation">(</span>level <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> strength<span class="token operator">++</span><span class="token punctuation">;</span>
					<span class="token keyword">else</span> maxPoints<span class="token operator">++</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">case</span> <span class="token number">2</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span>defense <span class="token operator">&lt;</span> <span class="token punctuation">(</span>level <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> defense<span class="token operator">++</span><span class="token punctuation">;</span>
					<span class="token keyword">else</span> maxPoints<span class="token operator">++</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">case</span> <span class="token number">3</span> <span class="token operator">-&gt;</span> intelligence<span class="token operator">++</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">4</span> <span class="token operator">-&gt;</span> dexterity<span class="token operator">++</span><span class="token punctuation">;</span>
				<span class="token keyword">case</span> <span class="token number">5</span> <span class="token operator">-&gt;</span> luck<span class="token operator">++</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			maxPoints<span class="token operator">--</span><span class="token punctuation">;</span>
			stat <span class="token operator">=</span> <span class="token class-name">Randomized</span><span class="token punctuation">.</span><span class="token function">randomizeNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">displayData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Name: &quot;</span> <span class="token operator">+</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Level: &quot;</span> <span class="token operator">+</span> level<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Experience: &quot;</span> <span class="token operator">+</span> experience <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> level <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Health: &quot;</span> <span class="token operator">+</span> <span class="token function">getMaxHp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Mana: &quot;</span> <span class="token operator">+</span> <span class="token function">getMaxMp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Strength: &quot;</span> <span class="token operator">+</span> strength<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Defense: &quot;</span> <span class="token operator">+</span> defense<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Intelligence: &quot;</span> <span class="token operator">+</span> intelligence<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Dexterity: &quot;</span> <span class="token operator">+</span> dexterity<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Luck: &quot;</span> <span class="token operator">+</span> luck<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Gold: &quot;</span> <span class="token operator">+</span> gold<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">gainExperience</span><span class="token punctuation">(</span><span class="token keyword">int</span> experience<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">+=</span> experience<span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have gained &quot;</span> <span class="token operator">+</span> experience <span class="token operator">+</span> <span class="token string">&quot; experience!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>experience <span class="token operator">&gt;=</span> level <span class="token operator">*</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			level<span class="token operator">++</span><span class="token punctuation">;</span>
			strength<span class="token operator">++</span><span class="token punctuation">;</span>
			defense<span class="token operator">++</span><span class="token punctuation">;</span>
			intelligence<span class="token operator">++</span><span class="token punctuation">;</span>
			dexterity<span class="token operator">++</span><span class="token punctuation">;</span>
			luck<span class="token operator">++</span><span class="token punctuation">;</span>
			maxHp <span class="token operator">+=</span> <span class="token number">5</span><span class="token punctuation">;</span>
			maxMp <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">;</span>
			hp <span class="token operator">=</span> maxHp<span class="token punctuation">;</span>
			mp <span class="token operator">=</span> maxMp<span class="token punctuation">;</span>
			<span class="token function">randomizeStats</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">printLevelUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">gainGold</span><span class="token punctuation">(</span><span class="token keyword">int</span> gold<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>gold <span class="token operator">+=</span> gold<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printLevelUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Congratulations! You have leveled up to level &quot;</span> <span class="token operator">+</span> level <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">displayData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printDeath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have died!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have successfully ran away!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printGold</span><span class="token punctuation">(</span><span class="token keyword">int</span> gold<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have gained &quot;</span> <span class="token operator">+</span> gold <span class="token operator">+</span> <span class="token string">&quot; gold!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printExperience</span><span class="token punctuation">(</span><span class="token keyword">int</span> experience<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have gained &quot;</span> <span class="token operator">+</span> experience <span class="token operator">+</span> <span class="token string">&quot; experience!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printHeal</span><span class="token punctuation">(</span><span class="token keyword">int</span> heal<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have healed for &quot;</span> <span class="token operator">+</span> heal <span class="token operator">+</span> <span class="token string">&quot; health!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printEquipWeapon</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NotNull</span> <span class="token class-name">Weapon</span> weapon<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have equipped &quot;</span> <span class="token operator">+</span> weapon<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printEquipArmor</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NotNull</span> <span class="token class-name">Armor</span> armor<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have equipped &quot;</span> <span class="token operator">+</span> armor<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printUnequipWeapon</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NotNull</span> <span class="token class-name">Weapon</span> weapon<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have unequipped &quot;</span> <span class="token operator">+</span> weapon<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printUnequipArmor</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NotNull</span> <span class="token class-name">Armor</span> armor<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;You have unequipped &quot;</span> <span class="token operator">+</span> armor<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//Getters and Setters</span>

	<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Debuff</span><span class="token punctuation">&gt;</span></span> <span class="token function">getDebuffs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> debuffs<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setDebuffs</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Debuff</span><span class="token punctuation">&gt;</span></span> debuffs<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>debuffs <span class="token operator">=</span> debuffs<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> level<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getGold</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> gold<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setGold</span><span class="token punctuation">(</span><span class="token keyword">int</span> gold<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>gold <span class="token operator">=</span> gold<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getExperience</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> experience<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getStrength</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> strength<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getDefense</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> defense<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setDefense</span><span class="token punctuation">(</span><span class="token keyword">int</span> defense<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>defense <span class="token operator">=</span> defense<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIntelligence</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> intelligence<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getDexterity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> dexterity<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getLuck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> luck<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">Weapon</span> <span class="token function">getWeapon</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> weapon<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">Armor</span> <span class="token function">getArmor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> armor<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getWeaponName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> weapon <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> weapon<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;None&quot;</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getArmorName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> armor <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> armor<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">&quot;None&quot;</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getDamage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> weapon <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> strength <span class="token operator">+</span> weapon<span class="token punctuation">.</span><span class="token function">getAtk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> strength<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">Inventory</span> <span class="token function">getInventory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">return</span> inventory<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","player.html.vue"]]),d=JSON.parse('{"path":"/guide/inventory/player.html","title":"Actualizando el Jugador","lang":"es-ES","frontmatter":{"icon":"user","title":"Actualizando el Jugador","description":"En esta ocasión debemos de actualizar nuestra clase Player para generar los stats de forma aleatoria mientras agregamos las mecánicas de atacar y recibir daño.","head":[["meta",{"property":"og:url","content":"https://jesus-castro89.github.io/rpg_java/rpg_java/guide/inventory/player.html"}],["meta",{"property":"og:site_name","content":"RPG Java"}],["meta",{"property":"og:title","content":"Actualizando el Jugador"}],["meta",{"property":"og:description","content":"En esta ocasión debemos de actualizar nuestra clase Player para generar los stats de forma aleatoria mientras agregamos las mecánicas de atacar y recibir daño."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"es-ES"}],["meta",{"property":"og:updated_time","content":"2024-03-08T06:46:49.000Z"}],["meta",{"property":"article:author","content":"M. en E. Jesús Aurelio Castro Magaña"}],["meta",{"property":"article:modified_time","content":"2024-03-08T06:46:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Actualizando el Jugador\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-08T06:46:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"M. en E. Jesús Aurelio Castro Magaña\\",\\"url\\":\\"https://github.com/jesus-castro89\\"}]}"]]},"headers":[{"level":2,"title":"Player","slug":"player","link":"#player","children":[]}],"git":{"createdTime":1709880409000,"updatedTime":1709880409000,"contributors":[{"name":"Jesús Aurelio Castro Magaña","email":"jesus_castrom@my.unitec.edu.mx","commits":1}]},"readingTime":{"minutes":1.73,"words":519},"filePathRelative":"guide/inventory/player.md","localizedDate":"8 de marzo de 2024"}');export{r as comp,d as data};
