---
icon: gamepad
title: Modificando las Armas, Armaduras y el Inventario
description: Modifiquemos algunas cosas para guardar adecuadamente nuestro inventario.
---

## Serializar las cosas

Para poder trabajar con los objetos en nuestro inventario, es importante hacer que todas las clases implementen una
interfaz como se muestra a continuación:

::: code-tabs#java
@tab Item.java

```java
package items;

import util.Interactive;

import java.io.Serializable;

public abstract class Item implements Serializable {

	protected final String name;
	protected final String description;
	protected final int price;

	public Item(String name, String description, int price) {

		this.name = name;
		this.description = description;
		this.price = price;
	}

	public void displayData() {

		Interactive.printDialog(String.format("Nombre: %s\nDescripción: %s\nPrecio: %d", name, description, price));
	}
}
```

@tab Weapon.java

```java
package items.weapons;

import items.Item;

import java.io.Serializable;

public abstract class Weapon extends Item implements Serializable {

	protected int atk;

	public Weapon(String name, String description, int price, int atk) {

		super(name, description, price);
		this.atk = atk;
	}
}
```

@tab Armor.java

```java
package items.armors;

import items.Item;

import java.io.Serializable;

public abstract class Armor extends Item implements Serializable {

	protected int def;

	public Armor(String name, String description, int price, int def) {

		super(name, description, price);
		this.def = def;
	}
}
```

:::

Como podrás notar, cada Item agrega la interfaz Serializable, y no basta solo con colocarlo en la clase Item.

> [!important]
> Recuerda que en este caso deberás de crear las funciones get y set de cada atributo para que la clase funcione
> adecuadamente.

Para que quede aún más claro lo anterior, te presento dos objetos, uno de cada tipo como ejemplo:

::: code-tabs#java
@tab WoodBlade.java

```java
package items.weapons.blades;

import items.weapons.Weapon;

import java.io.Serializable;

public class WoodBlade extends Weapon implements Serializable {

	public WoodBlade() {

		super("Espada de madera", "Una simple espada de madera", 5, 2);
	}
}
```

@tab WoodHelmet.java

```java
package items.armors.helmets;

import items.armors.Armor;

import java.io.Serializable;

public class WoodHelmet extends Armor implements Serializable {

	public WoodHelmet() {

		super("Casco de Madera",
				"Un casco de madera que no protege mucho, pero es mejor que nada.", 5, 2);
	}
}
```

:::

Como puedes notar, cada una de las clases de enemigos tienen una probabilidad para cada uno de sus ataques que usaremos
para determinar que ataque realizará dicho enemigo. Lo importante en estos casos es recordar que la suma de
probabilidades deberá ser 1.0 o lo que es lo mismo 100%.

## FixedArrayList & Inventory

Para que los cambios previos tengan un sentido y coherencia, es necesario modificar las clases FixedArrayList e
Inventory de la siguiente manera:

::: code-tabs#java
@tab FixedArrayList.java

```java
package util;

import items.armors.Armor;
import items.weapons.Weapon;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class FixedArrayList<T> extends ArrayList<T> implements Serializable {
	
	private int capacity;

	public FixedArrayList(int capacity) {

		super(capacity);
		this.capacity = capacity;
	}

	@Override
	public boolean add(T e) {

		return size() < capacity && super.add(e);
	}

	public void expandCapacity(int amount) {

		capacity += amount;
		ensureCapacity(capacity);
	}

	public List<Armor> filterArmors() {

		List<Armor> armors = new ArrayList<>();
		for (T item : this) {
			if (item instanceof Armor) {
				armors.add((Armor) item);
			}
		}
		return armors;
	}
	
	public List<Weapon> filterWeapons() {

		List<Weapon> weapons = new ArrayList<>();
		for (T item : this) {
			if (item instanceof Weapon) {
				weapons.add((Weapon) item);
			}
		}
		return weapons;
	}
}
```

@tab Inventory.java

```java
package player;

import items.Item;
import items.armors.Armor;
import items.weapons.Weapon;
import util.FixedArrayList;
import util.Interactive;

import javax.swing.*;
import java.io.Serializable;
import java.util.List;

public class Inventory implements Serializable {

	private final FixedArrayList<Item> items;

	public Inventory() {

		items = new FixedArrayList<>(15);
	}

	public void equipArmorMenu(Player player) {

		List<Armor> armors = items.filterArmors();
		String message = getArmorMessage(armors);
		try {

			int option = Integer.parseInt(JOptionPane.showInputDialog(message));
			if (option > 0 && option <= armors.size()) equipArmorAction(player, armors, option);
		} catch (Exception e) {
			Interactive.printDialog("Opción inválida.");
			equipArmorMenu(player);
		}
	}

	private String getArmorMessage(List<Armor> armors) {

		StringBuilder message = new StringBuilder("Equipar Armadura:\n");
		String itemMessage;
		Armor actualArmor;
		for (int i = 0; i < armors.size(); i++) {

			actualArmor = armors.get(i);
			itemMessage = String.format("%d. %s - %s\n", i + 1, actualArmor.getName(), actualArmor.getDescription());
			message.append(itemMessage);
		}
		message.append("0. Salir\n");
		return message.toString();
	}

	private void equipArmorAction(Player player, List<Armor> armors, int option) {

		Armor selectedArmor = armors.get(option - 1);
		if (player.getArmor() != null)
			items.add(player.getArmor());
		player.equipArmor(selectedArmor);
		player.printEquipArmor(selectedArmor);
		items.remove(selectedArmor);
	}

	public void equipWeaponMenu(Player player) {

		List<Weapon> weapons = items.filterWeapons();
		String message = getWeaponMessage(weapons);
		try {
			int option = Integer.parseInt(JOptionPane.showInputDialog(message));
			if (option > 0 && option <= weapons.size()) {

				equipWeaponAction(player, weapons, option);
			}
		} catch (Exception e) {
			Interactive.printDialog("Opción inválida.");
			equipWeaponMenu(player);
		}
	}

	private void equipWeaponAction(Player player, List<Weapon> weapons, int option) {

		Weapon selectedWeapon = weapons.get(option - 1);
		if (player.getWeapon() != null)
			items.add(player.getWeapon());
		player.equipWeapon(selectedWeapon);
		player.printEquipWeapon(selectedWeapon);
		items.remove(selectedWeapon);
	}

	private String getWeaponMessage(List<Weapon> weapons) {

		StringBuilder message = new StringBuilder("Equipar Arma:\n");
		String itemMessage;
		Weapon actualWeapon;
		for (int i = 0; i < weapons.size(); i++) {

			actualWeapon = weapons.get(i);
			itemMessage = String.format("%d. %s - %s\n", i + 1, actualWeapon.getName(), actualWeapon.getDescription());
			message.append(itemMessage);
		}
		message.append("0. Salir\n");
		return message.toString();
	}

	public void addItem(Item item) {

		String addMessage = String.format("%s se ha agregado al Inventario!", item.getName());
		Interactive.printDialog(items.add(item) ? addMessage : "Inventario Lleno.");
	}

	public void removeItem(Item item) {

		items.remove(item);
	}

	public FixedArrayList<Item> getItems() {

		return items;
	}

	public void printItems() {

		if (items.isEmpty()) {

			Interactive.printDialog("Inventario Vació.");
		} else {
			StringBuilder message = new StringBuilder("Inventario:\n");
			String itemMessage;
			for (Item item : items) {
				itemMessage = String.format("%s - %s\n", item.getName(), item.getDescription());
				message.append(itemMessage);
			}
			Interactive.printDialog(message.toString());
		}
	}
}
```

:::

Como podrás notar, también estas clases implementan Serializable, además de delegar la acción de los menús de
equipamiento a la clase Inventory y el filtrado de objetos de tipo Armor y Weapon a la clase FixedArrayList.
