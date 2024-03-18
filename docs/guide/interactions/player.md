---
icon: gamepad
title: Actualizando el Jugador
description: En esta ocasión debemos de actualizar nuestra clase Player para generar los stats de forma aleatoria mientras agregamos las mecánicas de atacar y recibir daño.
---

## BasicCharacter

Antes de modificar a nuestro jugador, es hora de modificar a nuestra clase base de la siguiente manera:

```java
package characters;

import java.io.Serializable;

public abstract class BasicCharacter implements Serializable {

    protected String name;
    protected int hp;
    protected int mp;
    protected int maxHp;
    protected int maxMp;

    public BasicCharacter(String name, int hp, int mp) {

        this.name = name;
        this.hp = hp;
        this.mp = mp;
        this.maxHp = hp;
        this.maxMp = mp;
    }

    public abstract void displayData();

    public void takeDamage(int damage) {
        hp -= damage;
    }

    public void heal(int amount) {
        hp += amount;
        if (hp > maxHp) hp = maxHp;
    }

    public void recoverMp(int amount) {

        mp += amount;
        if (mp > maxMp) mp = maxMp;
    }

    public void useMp(int amount) {
        mp -= amount;
    }

    public boolean isDead() {
        return hp <= 0;
    }
}
```

## Player

Ahora vemos los cambios de Player, pues aquí agregaremos varias cosas interesantes tal y como muestra:

```java
package player;

import characters.BasicCharacter;
import enemies.Enemy;
import game.exceptions.PlayerDeathException;
import items.armors.Armor;
import items.weapons.Weapon;
import org.jetbrains.annotations.NotNull;
import util.Interactive;
import util.Randomized;

import java.io.Serializable;
import java.util.ArrayList;

public class Player extends BasicCharacter implements Serializable {

	private int strength;
	private int defense;
	private int intelligence;
	private int dexterity;
	private int luck;
	private int experience;
	private int level;
	private int gold;
	private Weapon weapon;
	private Armor armor;
	private final Inventory inventory;

	public Player(String name) {

		super(name, 30, 10);
		experience = 0;
		level = 1;
		gold = 0;
		weapon = null;
		armor = null;
		randomizeStats(30);
		inventory = new Inventory();
	}

	public void randomizeStats(int maxPoints) {

		int stat = Randomized.randomizeNumber(1, 5);
		while (maxPoints > 0) {
			switch (stat) {
				case 1 -> {
					if (strength < (level * 3)) strength++;
					else maxPoints++;
				}
				case 2 -> {
					if (defense < (level * 3)) defense++;
					else maxPoints++;
				}
				case 3 -> intelligence++;
				case 4 -> dexterity++;
				case 5 -> luck++;
			}
			maxPoints--;
			stat = Randomized.randomizeNumber(1, 5);
		}
	}

	public void equipWeapon(Weapon weapon) {

		this.weapon = weapon;
	}

	public void equipArmor(Armor armor) {

		this.armor = armor;
	}

	public void revive() {

		hp = maxHp;
		mp = maxMp;
	}

	public void attack(@NotNull Enemy enemy) throws PlayerDeathException {

		if (!isDead()) {

			Interactive.printDialog(String.format("%s ataca con %d puntos de daño!", getName(), getDamage()));
			enemy.takeDamage(getDamage());
			if (enemy.isDead()) getRewards(enemy);
		} else {
			throw new PlayerDeathException();
		}
	}

	private void getRewards(@NotNull Enemy enemy) {

		gainExperience(enemy.getExperience());
		gainGold(enemy.getGold());
		enemy.dropItem(this);
	}

	@Override
	public void displayData() {

		String message = String.format("""
						Nombre: %s
						Nivel: %d
						Experiencia: %s
						Salud: %s
						Mana: %s
						Fuerza: %s
						Defensa: %s
						Inteligencia: %d
						Destreza: %d
						Suerte: %d
						Oro: %d
						Arma: %s
						Armadura: %s""",
				getName(), level, getActualExperience(), getActualHp(), getActualMp(), getTotalAttack(),
				getTotalDefense(), intelligence, dexterity, luck, gold, getWeaponName(), getArmorName());
		Interactive.printDialog(message);
	}

	private String getActualHp() {

		return String.format("%d/%d", getHp(), getMaxHp());
	}

	private String getActualMp() {

		return String.format("%d/%d", getMp(), getMaxMp());
	}

	private String getActualExperience() {

		return String.format("%d/%d", experience, level * 20);
	}

	private String getTotalAttack() {

		return weapon != null ? String.format("%d (+ %d)", strength, weapon.getAtk()) : String.valueOf(strength);
	}

	private String getTotalDefense() {

		return armor != null ? String.format("%d (+ %d)", defense, armor.getDef()) : String.valueOf(defense);
	}

	public void takeDamage(int damage) {

		damage -= defense;
		if (armor != null) {

			damage -= armor.getDef();
			if (damage < 0) damage = 0;
		}
		super.takeDamage(damage);
		if (isDead()) printDeath();
	}

	public void gainExperience(int experience) {

		this.experience += experience;
		printExperience(experience);
		checkLevelUp();
	}

	private void checkLevelUp() {

		if (this.experience >= level * 20) {

			level++;
			maxHp += 5;
			maxMp += 3;
			hp = maxHp;
			mp = maxMp;
			randomizeStats(5);
			printLevelUp();
		}
	}

	public void gainGold(int gold) {

		this.gold += gold;
		printGold(gold);
	}

	public void printLevelUp() {

		Interactive.printDialog(String.format("¡Felicidades! Has subido al nivel %d!", level));
		displayData();
	}

	public void printDeath() {

		Interactive.printDialog("¡Has muerto!");
	}

	public void printRun() {

		Interactive.printDialog("¡Has huido!");
	}

	public void printGold(int gold) {

		Interactive.printDialog(String.format("Has ganado %d monedas de oro!", gold));
	}

	public void printExperience(int experience) {

		Interactive.printDialog(String.format("Has ganado %d puntos de experiencia!", experience));
	}

	public void printHeal(int heal) {

		Interactive.printDialog(String.format("Has recuperado %d puntos de salud!", heal));
	}

	public void printEquipWeapon(@NotNull Weapon weapon) {

		Interactive.printDialog(String.format("Has equipado %s!", weapon.getName()));
	}

	public void printEquipArmor(@NotNull Armor armor) {

		Interactive.printDialog(String.format("Has equipado %s!", armor.getName()));
	}

	public String getWeaponName() {

		return weapon != null ? weapon.getName() : "None";
	}

	public String getArmorName() {

		return armor != null ? armor.getName() : "None";
	}

	public int getDamage() {

		return weapon != null ? strength + weapon.getAtk() : strength;
	}
}
```

> [!important]
> Recuerda que en estos casos deberás de crear las funciones get y set de cada atributo para que la clase funcione
> adecuadamente.
