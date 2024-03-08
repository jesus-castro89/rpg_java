---
icon: user
title: Los Enemigos
description: Entendamos a los enemigos y veamos poco a poco interactuemos con el.
---

Como ya hemos visto, nuestro personaje ya tiene algunos puntos y elementos básicos, pero ahora veamos el otro lado de la
moneda del juego. Los enemigos, por tal razón, veamos la clase base, pero antes, definamos una pequeña interfaz
funcional dentro de un nuevo paquete llamado **util**.

## Randomized

Esta pequeña interfaz contendrá una función que permitirá obtener un valor numérico dentro de un rango determinado.

```java
package util;

import java.util.Random;

public interface Randomized {

    static int randomizeNumber(int min, int max) {

		return new Random().nextInt(max - min + 1) + min;
	}
}
```

## Enemy

Dentro del paquete **enemies**, crearemos una nueva clase llamada **Enemy** que contará con lo siguiente:

- name
    - El nombre del enemigo.
- health
    - La vida del enemigo.
- damage
    - El ataque o daño que puede causar el enemigo.
- gold
    - La cantidad de oro que nos dará el enemigo al derrotarlo.
- experience
    - La cantidad de puntos de experiencia que nos dará el enemigo al derrotarlo.

Con las siguientes funciones:

- takeDamage
    - Función que permitirá recibir el daño del personaje.
- isDead
    - Determina si el enemigo esta o no fuera de combate.
- attack
    - Función abstracta que permitirá a las clases hijas el atacar de diferente manera.

De tal manera que la clase se vería de la siguiente manera:

```java
package enemies;

import player.Player;

public abstract class Enemy {

    private final String name;
    private int health;
    private final int damage;
    private final int gold;
    private final int experience;

    // Recuerda definir un constructor para esta clase

    public void takeDamage(int damage) {

        System.out.println(name + " takes " + damage + " damage!");
        health -= damage;
        if (isDead())
            System.out.println(name + " has been defeated!");
    }

    public boolean isDead() {
        return health <= 0;
    }

    public abstract void attack(Player player);
}
```

En este caso, basado en esta clase, deberás de crear al menos tres clases derivadas en tres paquetes diferentes para
cada familia de enemigos. Como por ejemplo la siguiente clase que representa a los Goblins.

```java
package enemies.goblins;

import enemies.Enemy;
import player.Player;

import static util.Randomized.randomize;

public class RookieGoblin extends Enemy {

	public RookieGoblin() {

		super("Rookie Goblin", 20, 2, 5, 5);
	}

	@Override
	public void attack(Player player) {

		switch (Randomized.randomizeNumber(0, 2)) {

			case 0 -> plainAttack(player);
			case 1 -> runAway();
			case 2 -> stealGold(player);
		}
	}

	private void plainAttack(@NotNull Player player) {

		System.out.println("Rookie Goblin attacks for " + getDamage() + " damage!");
		player.takeDamage(getDamage());
	}

	public void runAway() {

		System.out.println("Rookie Goblin runs away!");
		this.setHealth(0);
	}

	public void stealGold(@NotNull Player player) {

		System.out.println("Rookie Goblin steals 5 gold!");
		player.setGold(player.getGold() - 5);
	}
}
```
