---
icon: gamepad
title: Los enemigo y sus Drops
description: Agreguemos los Drops a los enemigos.
---

## Enemy

Para que nuestros enemigos puedas darnos recompensas además de la experiencia y el oro, es necesario que agreguemos uan
función extra a nuestra clase abstracta:

```java
public abstract void attack(Player player) throws EnemyDeadException;
```

Como puedes notar, esta función abstracta puede lanzar una excepción de tipo EnemyDeadException porque debemos
asegurarnos de que el enemigo no pueda seguir atacando si es que ya está muerto, ya sea porque el jugador lo derroto, o
porque su vida se redujo a 0 al huir de la batalla.

Por lo que nuestra clase Enemy quedaría de la siguiente forma:

```java
package enemies;

import game.exceptions.EnemyDeadException;
import player.Player;
import util.Interactive;

public abstract class Enemy {

	private final String name;
	private int health;
	private final int damage;
	private final int gold;
	private final int experience;

	public Enemy(String name, int health, int damage, int gold, int experience) {

		this.name = name;
		this.health = health;
		this.damage = damage;
		this.gold = gold;
		this.experience = experience;
	}

	public void takeDamage(int damage) {

		Interactive.printDialog(String.format("¡%s sufre %d daños!", name, damage));
		health -= damage;
		if (isDead())
			Interactive.printDialog(String.format("¡%s ha sido derrotado!", name));
	}

	public boolean isDead() {

		return health <= 0;
	}

	public abstract void attack(Player player) throws EnemyDeadException;

	public abstract void dropItem(Player player);
}
```

> [!important]
> Recuerda que en este caso deberás de crear las funciones get y set de cada atributo para que la clase funcione
> adecuadamente.


Para ejemplificar el uso de esta función y las probabilidades de los diversos ataques de un enemigo, puedes tomar como
ejemplo las tres siguientes clases:

::: code-tabs#java
@tab RookieGoblin.java

```java
package enemies.goblins;

import enemies.Enemy;
import game.exceptions.EnemyDeadException;
import game.exceptions.ZeroException;
import items.misc.GoblinEar;
import items.weapons.blades.WoodBlade;
import org.jetbrains.annotations.NotNull;
import player.Player;
import util.Interactive;
import util.Randomized;

public class RookieGoblin extends Enemy {

	public RookieGoblin() {

		super("Duende novato", 10, 7, 5, 5);
	}

	@Override
	public void attack(Player player) throws EnemyDeadException {

		if (!isDead()) {

			double plainAttackProbability = 0.5;
			double runAwayProbability = 0.2;
			double stealGoldProbability = 0.3;
			double totalProbability = plainAttackProbability + runAwayProbability + stealGoldProbability;
			double ratio = Randomized.randomizeDouble(totalProbability);
			// plainAttackProbability = 50%, runAwayProbability = 20%, stealGoldProbability = 30%
			// plainAttackProbability + runAwayProbability + stealGoldProbability = 100%
			// ratio = 0.0 - 0.5 -> plainAttack, ratio = 0.51 - 0.8 -> stealGold, ratio = 0.81 - 1.0 -> runAway
			if (ratio <= plainAttackProbability) plainAttack(player);
			else if (ratio <= plainAttackProbability + stealGoldProbability) stealGold(player);
			else runAway();
		} else {
			throw new EnemyDeadException();
		}
	}

	@Override
	public void dropItem(Player player) {

		int ratio = Randomized.randomizeNumber(1, 100);
		player.getInventory().addItem(ratio > 50 ? new WoodBlade() : new GoblinEar());
	}

	private void plainAttack(@NotNull Player player) {

		Interactive.printDialog(String.format("¡El duende novato ataca con %d daño!", getDamage()));
		player.takeDamage(getDamage());
	}

	public void runAway() {

		Interactive.printDialog("¡El Duende novato huye!");
		this.setHealth(0);
	}

	public void stealGold(@NotNull Player player) {

		try {
			int minus = player.getGold() - 5;
			if (minus < 0)
				throw new ZeroException();
			player.setGold(minus);
			Interactive.printDialog("¡El Duende novato roba 5 de oro!");
		} catch (ZeroException e) {
			player.setGold(0);
			Interactive.printDialog("¡La billetera del jugador está vacía!");
		}
	}
}
```

@tab AloneWolf.java

```java
package enemies.wolfs;

import enemies.Enemy;
import game.exceptions.EnemyDeadException;
import items.armors.helmets.WoodHelmet;
import items.misc.WolfFur;
import player.Player;
import util.Interactive;
import util.Randomized;

public class AloneWolf extends Enemy {

	public AloneWolf() {

		super("Lobo solitario", 30, 5, 10, 10);
	}

	@Override
	public void attack(Player player) throws EnemyDeadException {

		if (!isDead()) {

			double simpleAttackProbability = 0.5;
			double howlProbability = 0.3;
			double biteProbability = 0.2;
			double totalProbability = simpleAttackProbability + howlProbability + biteProbability;
			double ratio = Randomized.randomizeDouble(totalProbability);
			// simpleAttackProbability = 50%, howlProbability = 30%, biteProbability = 20%
			// simpleAttackProbability + howlProbability + biteProbability = 100%
			// ratio = 0.0 - 0.5 -> simpleAttack, ratio = 0.51 - 0.7 -> bite, ratio = 0.71 - 1.0 -> howl
			if (ratio <= simpleAttackProbability) simpleAttack(player);
			else if (ratio <= simpleAttackProbability + biteProbability) bite(player);
			else howl(player);
		} else {
			throw new EnemyDeadException();
		}
	}

	@Override
	public void dropItem(Player player) {

		int ratio = Randomized.randomizeNumber(1, 100);
		player.getInventory().addItem(ratio > 65 ? new WoodHelmet() : new WolfFur());
	}

	public void simpleAttack(Player player) {

		Interactive.printDialog(String.format("¡%s ataca con %d puntos de daño!", getName(), getDamage()));
		player.takeDamage(getDamage());
	}

	public void howl(Player player) {

		Interactive.printDialog("¡Lobo solitario aúlla!");
		//TODO: Implementar efecto de aullido.
	}

	public void bite(Player player) {

		int totalDamage = getDamage() + 3;
		Interactive.printDialog(String.format("¡%s muerde con %d puntos de daño!", getName(), totalDamage));
		player.takeDamage(totalDamage);
	}
}
```

@tab TinyBat.java

```java
package enemies.bats;

import enemies.Enemy;
import game.exceptions.EnemyDeadException;
import items.misc.BatEar;
import items.misc.BatWing;
import player.Player;
import util.Interactive;
import util.Randomized;

public class TinyBat extends Enemy {

	public TinyBat() {

		super("Murciélago diminuto", 8, 4, 4, 4);
	}


	@Override
	public void attack(Player player) throws EnemyDeadException {

		if (!isDead()) {

			double simpleAttackProbability = 0.5;
			double screechProbability = 0.5;
			double totalProbability = simpleAttackProbability + screechProbability;
			double ratio = Randomized.randomizeDouble(totalProbability);
			// simpleAttackProbability = 50%, screechProbability = 50%
			// simpleAttackProbability + screechProbability = 100%
			// ratio = 0.0 - 0.5 -> simpleAttack, ratio = 0.51 - 1.0 -> screech
			if (ratio <= simpleAttackProbability) simpleAttack(player);
			else screech(player);
		} else {
			throw new EnemyDeadException();
		}
	}

	@Override
	public void dropItem(Player player) {

		int ratio = Randomized.randomizeNumber(1, 100);
		player.getInventory().addItem(ratio > 50 ? new BatWing() : new BatEar());
	}

	public void simpleAttack(Player player) {

		Interactive.printDialog(String.format("¡%s ataca con %d puntos de daño!", getName(), getDamage()));
		player.takeDamage(getDamage());
	}

	public void screech(Player player) {

		Interactive.printDialog(String.format("¡El murciélago diminuto emite un chillido ensordecedor que causa %d de " +
		                                      "daño!", getDamage() * 2));
		player.takeDamage(getDamage() * 2);
	}
}
```

:::

Como puedes notar, cada una de las clases de enemigos tienen una probabilidad para cada uno de sus ataques que usaremos
para determinar que ataque realizará dicho enemigo. Lo importante en estos casos es recordar que la suma de
probabilidades deberá ser 1.0 o lo que es lo mismo 100%.

## Drop Items

Tomando las clases previas, te comparto las clases que representan a los items que pueda darnos cada enemigo.

::: code-tabs#java
@tab BatEar.java

```java
package items.misc;

import items.Item;

import java.io.Serializable;

public class BatEar extends Item implements Serializable {

	public BatEar() {
		super("Oreja de murciélago", "Una oreja de murciélago diminuto. Se puede vender por un buen precio.",
				5);
	}
}
```

@tab BatWing.java

```java
package items.misc;

import items.Item;

import java.io.Serializable;

public class BatWing extends Item implements Serializable {

	public BatWing() {
		super("Ala de murciélago", "Una ala de murciélago diminuto. Se puede vender por un buen precio.",
				7);
	}
}
```

@tab GoblinEar.java

```java
package items.misc;

import items.Item;

import java.io.Serializable;

public class GoblinEar extends Item implements Serializable {

	public GoblinEar() {

		super("Oreja de duende", "Una oreja de duende que puede ser vendida por un buen precio.",
				10);
	}
}
```

@tab WolfFur.java

```java
package items.misc;

import items.Item;

import java.io.Serializable;

public class WolfFur extends Item implements Serializable {

	public WolfFur() {

		super("Piel de lobo", "Una piel de lobo que puede ser vendida por un buen precio.",
				15);
	}
}
```

:::
