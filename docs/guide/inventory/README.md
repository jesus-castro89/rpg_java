---
icon: briefcase
title: Creando el Inventario y Modificando los Items
description: Creemos las clases para nuestro inventario
---

## Clase hija de ArrayList

Antes que nada, deberemos de crear una clase derivada de ArrayList que podremos nombrar a nuestro gusto. En mi caso la
nombré FixedArrayList y se ve de la siguiente forma:

```java
package util;

import java.util.ArrayList;

public class FixedArrayList<T> extends ArrayList<T> {

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
}
```

## Inventory

La clase Inventory es la que fungirá como nuestro inventario y hará uso de la clase que hemos creado con anterioridad.

```java
package player;

import items.Item;
import util.FixedArrayList;

public class Inventory {

	private final FixedArrayList<Item> items;

	public Inventory() {

		items = new FixedArrayList<>(15);
	}

	public void addItem(Item item) {

		System.out.println(items.add(item) ? item.getName() + " has been added to your inventory." : "Inventory is full.");
	}

	public void removeItem(Item item) {

		items.remove(item);
	}

	public FixedArrayList<Item> getItems() {

		return items;
	}

	public void printItems() {

		if (items.isEmpty()) {

			System.out.println("Inventory is empty.");
		} else {
			System.out.println("Inventory:");
			for (Item item : items) {
				System.out.println(item.getName() + " - " + item.getDescription());
			}
		}
	}
}
```

> [!important]
> Para efectos de Prueba de este paso, deberemos de crear al menos tres objetos y almacenarlos en un inventario, sacar o
> eliminar un objeto e imprimir en cada ocasión el contenido del inventario.
