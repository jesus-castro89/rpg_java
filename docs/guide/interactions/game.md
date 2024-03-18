---
icon: gamepad
title: Game & Exceptions
description: Una vez hecho todo lo anterior es hora de trabajar con los menús del juego.
---

## Game

Esta clase representa la lógica del juego tal y como la manejaremos por ahora:

```java
package game;

import enemies.Enemy;
import enemies.goblins.RookieGoblin;
import enemies.wolfs.AloneWolf;
import game.exceptions.EnemyDeadException;
import game.exceptions.InvalidOptionException;
import game.exceptions.PlayerDeathException;
import org.jetbrains.annotations.NotNull;
import player.Player;
import util.FileManager;
import util.Interactive;
import util.Randomized;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

public class Game {

	private Player player;
	private final List<Enemy> enemies;

	public Game() {

		player = null;
		enemies = new ArrayList<>(5);
		enemies.add(new RookieGoblin());
		enemies.add(new AloneWolf());
		enemies.add(new RookieGoblin());
		enemies.add(new AloneWolf());
		enemies.add(new RookieGoblin());
	}

	public void printMainMenu() {

		String menu = "1. Jugar\n2. Salir";
		try {
			int option = Integer.parseInt(JOptionPane.showInputDialog(menu));
			switch (option) {

				case 1 -> {
					try {
						player = FileManager.loadGame();
						Interactive.printDialog("¡Bienvenido de nuevo!");
					} catch (Exception e) {
						player = new Player(JOptionPane.showInputDialog("Ingresa el nombre del jugador:"));
					}
					printPlayerMenu();
				}
				case 2 -> Interactive.printDialog("Gracias por jugar");
				default -> throw new InvalidOptionException();
			}
		} catch (Exception e) {
			Interactive.printDialog("La opción ingresada no es válida");
			printMainMenu();
		}
	}

	private void printPlayerMenu() {

		String menu = """
				1. Ver estadísticas
				2. Ver inventario
				""";
		if (!enemies.isEmpty()) menu += String.format("3. Atacar [%d/5 Enemigos]\n", enemies.size());
		menu += """
				4. Equipar arma
				5. Equipar armadura
				6. Salir""";
		try {

			int option = Integer.parseInt(JOptionPane.showInputDialog(menu));
			switch (option) {

				case 1 -> player.displayData();
				case 2 -> player.getInventory().printItems();
				case 3 -> attackCycle();
				case 4 -> equipWeaponMenu();
				case 5 -> equipArmorMenu();
				case 6 -> endGame();
				default -> throw new InvalidOptionException();
			}
			if (option < 6) {

				printPlayerMenu();
			}
		} catch (Exception e) {
			Interactive.printDialog("La opción ingresada no es válida");
			printPlayerMenu();
		}
	}

	private void endGame() {

		Interactive.printDialog("Gracias por jugar");
		FileManager.saveGame(player);
		enemies.clear();
	}

	private void attackCycle() {

		Enemy currentEnemy;
		currentEnemy = getEnemy(enemies);
		while (!currentEnemy.isDead() && !player.isDead()) {

			battleMenu(currentEnemy);
		}
		enemies.remove(currentEnemy);
	}

	private void equipArmorMenu() {

		player.getInventory().equipArmorMenu(player);
	}

	private void equipWeaponMenu() {

		player.getInventory().equipWeaponMenu(player);
	}

	private void battleMenu(Enemy enemy) {

		String menu = "1. Atacar\n2. Huir";
		if (!enemy.isDead()) {
			try {

				int battleOption = Integer.parseInt(JOptionPane.showInputDialog(menu));
				switch (battleOption) {

					case 1 -> battleOrder(enemy);
					case 2 -> fleeTry(enemy);
					default -> throw new InvalidOptionException();
				}
			} catch (InvalidOptionException e) {

				Interactive.printDialog("La opción ingresada no es válida");
				battleMenu(enemy);
			} catch (PlayerDeathException e) {

				gameOver();
			} catch (EnemyDeadException e) {

				Interactive.printDialog("El enemigo ha muerto!");
				enemy.setHealth(0);
			}
		}
	}

	private void gameOver() {

		Interactive.printDialog("Has muerto!");
		Interactive.printDialog("Quizás deberías entrenar más antes de intentar pelear con los enemigos.");
		player.revive();
		enemies.clear();
	}

	private void battleOrder(Enemy enemy) throws PlayerDeathException, EnemyDeadException {

		player.attack(enemy);
		if (!enemy.isDead()) {
			enemy.attack(player);
		}
		battleMenu(enemy);
	}

	private void fleeTry(Enemy enemy) {

		if (Randomized.randomizeBoolean()) {
			player.printRun();
			enemy.setHealth(0);
		} else {
			Interactive.printDialog("No has podido huir!");
			battleMenu(enemy);
		}
	}

	@NotNull
	private static Enemy getEnemy(List<Enemy> enemies) {

		Enemy enemy = enemies.get(Randomized.randomizeNumber(0, enemies.size() - 1));
		Interactive.printDialog(String.format("Un %s aparece!", enemy.getName()));
		return enemy;
	}
}
```

## Exceptions

Como sabras no todo es miel sobre hojuelas y nuestro juego no es la excepción... jajaja, precisamente debido a esto, es
que te presento las Exceptions presentes dentro de la lógica de nuestro juego:

### EnemyDeadException

```java
package game.exceptions;

public class EnemyDeadException extends Exception {

	public EnemyDeadException() {

		super("El Enemigo recibió un overkill");
	}
}
```

### InvalidOptionException

```java
package game.exceptions;

public class InvalidOptionException extends Exception {

	public InvalidOptionException() {

		super("La opción ingresada no es válida");
	}
}
```

### PlayerDeathException

```java
package game.exceptions;

public class PlayerDeathException extends Exception {

	public PlayerDeathException() {

		super("El jugador ha muerto");
	}
}
```

### ZeroException

```java
package game.exceptions;

public class ZeroException extends Exception {

	public ZeroException() {

		super("El Dato ingresado en 0");
	}
}
```
