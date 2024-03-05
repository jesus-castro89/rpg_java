---
icon: briefcase
title: Es hora de modificar nuestros Items
description: Actualicemos nuestros Items con lo aprendido sobre elementos abstracto para nuestro inventario.
---

## Item

Para poder trabajar con el inventario, es primordial modificar los Items, es por ello que crearemos la clase Item, esta
clase servirá como base para todo Item del juego, desde armas, armaduras, etc.

```java
package items;

import javax.swing.*;

public abstract class Item {

	protected final String name;
	protected final String description;
	protected final int price;

	public Item(String name, String description, int price) {

		this.name = name;
		this.description = description;
		this.price = price;
	}

	public void displayData() {

		JOptionPane.showMessageDialog(null,
				String.format("%s", description));
	}
}
```

Como podrás notar, solo cuenta con un nombre y una descripción, aunque tu puedes agregar lo que gustes a esta nueva
clase base.

## Weapons & Armors

Ahora como ya hemos creado esta nueva clase abstracta, es necesario que nuestras clases Weapon y Armor se modifiquen
igual un poco de la siguiente manera:

::: code-tabs#java
@tab Weapon.java

```java
package items.weapons;

import items.Item;

public abstract class Weapon extends Item {

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

public abstract class Armor extends Item {

	protected int def;

	public Armor(String name, String description, int price, int def) {

		super(name, description, price);
		this.def = def;
	}

	public abstract void effect();
}

```

:::

> [!important]
> Recuerda que deberás de crear los gets y sets de ser necesario para un funcionamiento correcto.
