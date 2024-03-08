---
icon: user
title: Actualizando el Jugador
description: En esta ocasión debemos de actualizar nuestra clase Player para generar los stats de forma aleatoria mientras agregamos las mecánicas de atacar y recibir daño.
---

## Player

Ahora que ya contamos con nuestro inventario, recuerda agregarlo a la clase Player, en este caso dejo para ustedes el
formato completo de la clase para tomar como referencia. Recuerden que pueden y deben cambiar los nombres de algunas
funciones, puesto que se deberán de agregar atributos diferentes en cada uno de los equipos de trabajo.

```java
package player;

import characters.BasicCharacter;
import enemies.Enemy;
import items.armors.Armor;
import items.weapons.Weapon;
import org.jetbrains.annotations.NotNull;
import player.debuffs.Debuff;
import util.Randomized;

public class Player extends BasicCharacter {

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
					if (strength < (level * 5)) strength++;
					else maxPoints++;
				}
				case 2 -> {
					if (defense < (level * 5)) defense++;
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

	@Override
	public void displayData() {

		System.out.println("Name: " + getName());
		System.out.println("Level: " + level);
		System.out.println("Experience: " + experience + "/" + level * 10);
		System.out.println("Health: " + getMaxHp());
		System.out.println("Mana: " + getMaxMp());
		System.out.println("Strength: " + strength);
		System.out.println("Defense: " + defense);
		System.out.println("Intelligence: " + intelligence);
		System.out.println("Dexterity: " + dexterity);
		System.out.println("Luck: " + luck);
		System.out.println("Gold: " + gold);
	}

	public void gainExperience(int experience) {

		this.experience += experience;
		System.out.println("You have gained " + experience + " experience!");
		if (this.experience >= level * 20) {

			level++;
			strength++;
			defense++;
			intelligence++;
			dexterity++;
			luck++;
			maxHp += 5;
			maxMp += 3;
			hp = maxHp;
			mp = maxMp;
			randomizeStats(3);
			printLevelUp();
		}
	}

	public void gainGold(int gold) {

		this.gold += gold;
	}

	public void printLevelUp() {

		System.out.println("Congratulations! You have leveled up to level " + level + "!");
		displayData();
	}

	public void printDeath() {

		System.out.println("You have died!");
	}

	public void printRun() {

		System.out.println("You have successfully ran away!");
	}

	public void printGold(int gold) {

		System.out.println("You have gained " + gold + " gold!");
	}

	public void printExperience(int experience) {

		System.out.println("You have gained " + experience + " experience!");
	}

	public void printHeal(int heal) {

		System.out.println("You have healed for " + heal + " health!");
	}

	public void printEquipWeapon(@NotNull Weapon weapon) {

		System.out.println("You have equipped " + weapon.getName() + "!");
	}

	public void printEquipArmor(@NotNull Armor armor) {

		System.out.println("You have equipped " + armor.getName() + "!");
	}

	public void printUnequipWeapon(@NotNull Weapon weapon) {

		System.out.println("You have unequipped " + weapon.getName() + "!");
	}

	public void printUnequipArmor(@NotNull Armor armor) {

		System.out.println("You have unequipped " + armor.getName() + "!");
	}

	//Getters and Setters

	public ArrayList<Debuff> getDebuffs() {

		return debuffs;
	}

	public void setDebuffs(ArrayList<Debuff> debuffs) {

		this.debuffs = debuffs;
	}

	public int getLevel() {

		return level;
	}

	public int getGold() {

		return gold;
	}

	public void setGold(int gold) {

		this.gold = gold;
	}

	public int getExperience() {

		return experience;
	}

	public int getStrength() {

		return strength;
	}

	public int getDefense() {

		return defense;
	}

	public void setDefense(int defense) {

		this.defense = defense;
	}

	public int getIntelligence() {

		return intelligence;
	}

	public int getDexterity() {

		return dexterity;
	}

	public int getLuck() {

		return luck;
	}

	public Weapon getWeapon() {

		return weapon;
	}

	public Armor getArmor() {

		return armor;
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

	public String getName() {

		return super.getName();
	}

	public Inventory getInventory() {

		return inventory;
	}
}
```
