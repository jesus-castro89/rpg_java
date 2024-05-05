---
icon: briefcase
title: El inventario de nuestro personaje
description: Añadamos un inventario a nuestro personaje para que pueda llevar consigo sus Items.
---

# Inventario

Para poder trabajar con el inventario, es primordial modificar los Items, es por ello que crearemos la clase Item, esta
clase servirá como base para todo Item del juego, desde armas, armaduras, etc.

```java
    package player;
    
    import gui.panels.DialogPanel;
    import items.Item;
    import util.FixedArrayList;
    
    import java.io.Serializable;
    
    /**
     * Inventory es una clase que representa el inventario del jugador.
     *
     * @version 1.0
     */
    public class Inventory implements Serializable {
    
        /**
         * La lista de elementos en el inventario.
         */
        private final FixedArrayList<Item> items;
    
        /**
         * Construye un nuevo inventario con una capacidad fija de 15.
         */
        public Inventory() {
    
            items = new FixedArrayList<>(15);
        }
    
        /**
         * Agrega un elemento al inventario.
         *
         * @param item el elemento a agregar
         */
        public void addItem(Item item) {
    
            String addMessage = String.format("%s se ha agregado al Inventario!\n", item.getName());
            DialogPanel.getInstance().addText(items.add(item) ? addMessage : "Inventario Lleno.\n");
        }
    
        /**
         * Remueve un elemento del inventario.
         *
         * @param item el elemento a remover
         */
        public void removeItem(Item item) {
    
            items.remove(item);
        }
    
        /**
         * Obtiene la lista de elementos en el inventario.
         *
         * @return la lista de elementos en el inventario
         */
        public FixedArrayList<Item> getItems() {
    
            return items;
        }
    }
```

Como podrás notar, solo cuenta con un nombre y una descripción, aunque tu puedes agregar lo que gustes a esta nueva
clase base.

## FixedArrayList

La clase `FixedArrayList` es una clase que extiende de `ArrayList` y que tiene una capacidad fija, es decir, no puede
crecer más allá de la capacidad que se le haya asignado.

```java
    package util;
    
    import items.Item;
    import items.ItemType;
    import items.armors.Armor;
    import items.weapons.Weapon;
    
    import java.io.Serializable;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.stream.Collectors;
    
    /**
     * Una FixedArrayList es una lista que tiene una capacidad fija y puede cambiar de tamaño de acuerdo a su función
     * expandCapacity.
     *
     * @param <T> the type of elements in the list
     *
     * @author jesus
     * @version 1.0
     */
    public class FixedArrayList<T> extends ArrayList<T> implements Serializable {
        private int capacity;
    
        /**
         * Construye una nueva FixedArrayList con la capacidad especificada.
         *
         * @param capacity la capacidad de la lista
         */
        public FixedArrayList(int capacity) {
    
            super(capacity);
            this.capacity = capacity;
        }
    
        /**
         * Agrega el elemento especificado a la lista si la lista no está llena.
         *
         * @param e el elemento a agregar
         *
         * @return verdadero si se agregó el elemento, falso si la lista está llena.
         */
        @Override
        public boolean add(T e) {
    
            return size() < capacity && super.add(e);
        }
    
        /**
         * Expande la capacidad de la lista en la cantidad especificada.
         *
         * @param amount la cantidad en la que se expandirá la capacidad.
         */
        public void expandCapacity(int amount) {
    
            capacity += amount;
            ensureCapacity(capacity);
        }
    
        /**
         * Filtra los elementos de la lista que son armaduras.
         *
         * @return una lista de armaduras
         */
        public List<Armor> filterArmors() {
    
            return this.stream().filter(item -> ((Item) item).getType() == ItemType.ARMOR)
                    .map(item -> (Armor) item).collect(Collectors.toList());
        }
    
        public List<Item> filterMiscItems() {
    
            return this.stream().filter(item -> ((Item) item).getType() == ItemType.MISC)
                    .map(item -> (Item) item).collect(Collectors.toList());
        }
    
        /**
         * Filtra los elementos de la lista que son armas.
         *
         * @return una lista de armas
         */
        public List<Weapon> filterWeapons() {
    
            return this.stream().filter(item -> ((Item) item).getType() == ItemType.WEAPON)
                    .map(item -> (Weapon) item).collect(Collectors.toList());
        }
    }
```

Como podrás notar, la clase `FixedArrayList` tiene métodos para filtrar los elementos de la lista que son armaduras o
armas, además de un método para filtrar los elementos que son de tipo misceláneo.
