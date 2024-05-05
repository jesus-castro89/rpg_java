---
icon: shield
title: Items, Armaduras y Armas
description: Porque una personaje no es nada sin su armadura y su arma de batalla.
---

Como bien es sabido, un juego de RPG básico no es nada sin las armas y armaduras para nuestro personaje, y este no será
la excepción, por lo tanto, deberemos de crear dos clases básicas en sus respectivos
paquetes: `Item`, `Armor`, `Weapon`, estas clases contarán con los siguientes atributos.

## Item

- name
    - El nombre de nuestro item.
- description
    - La descripción de nuestro item.
- price
    - El precio de compraventa de nuestro item.
- rarity
    - La rareza de nuestro item, puede ser común, raro, épico, legendario, etc.
    - Este atributo puede ser un objeto que contenga la rareza del item.
- stats
    - Los stats que otorga nuestro item, por ejemplo, un arma puede otorgar +10 de ataque, una armadura +10 de defensa.
    - Este atributo puede ser un objeto que contenga los stats que otorga el item.
- type
    - El tipo de item que es, puede ser arma, armadura, consumible, etc.
    - Este atributo puede ser un objeto que contenga el tipo de item.

Si gustas puedes agregar otros atríbutos que puedan sumarse al personaje por ejemplo, esto quedará a tu criterio. De
igual forma deberá crear de cada clase, dos clases hijas o derivadas y agregar al menos un atríbuto o función diferente
a las clases base.

En el caso de la clase "Item" deberá de ser abstracta, ya que no tiene sentido crear un item genérico, sino que
deberemos de crear un arma o armadura, etc.

```java
    package items;
    
    import player.Stats;
    
    import java.io.Serializable;
    import java.util.HashMap;
    
    public abstract class Item implements Serializable {
    
        protected final String name;
        protected final String description;
        protected final int price;
        protected final Rarity rarity;
        protected final HashMap<Stats, Integer> stats;
        protected ItemType type;
    
        public Item(String name, String description, int price) {
    
            this.name = name;
            this.description = description;
            this.price = price;
            this.rarity = Rarity.getRandomRarity();
            stats = new HashMap<>();
            type = ItemType.MISC;
        }
    
        public String getRarity() {
    
            return switch (rarity) {
                case COMMON -> "Común";
                case UNCOMMON -> "Poco común";
                case RARE -> "Raro";
                case EPIC -> "Épico";
                case LEGENDARY -> "Legendario";
                default -> throw new IllegalArgumentException("Invalid rarity: " + rarity);
            };
        }
        
        public String getName() {
    
            return name;
        }
    
        public String getDescription() {
    
            return description;
        }
    
        public int getPrice() {
    
            return price;
        }
    
        public HashMap<Stats, Integer> getStats() {
    
            return stats;
        }
    
        public ItemType getType() {
    
            return type;
        }
    }
```

### ItemType

La clase `ItemType` es un enum que contiene los tipos de items que puede haber en el juego, por ejemplo, armas,
armaduras, consumibles, etc.

```java
    package items;
    
    public enum ItemType {
    
        WEAPON, ARMOR, CONSUMABLE, QUEST, MISC;
    }
```

### Rarity

La clase `Rarity` es un enum que contiene los tipos de rareza que puede haber en el juego, por ejemplo, común, raro,
épico, legendario, etc.

```java
    package items;
    
    import java.io.Serializable;
    
    public enum Rarity implements Serializable {
        
            COMMON, UNCOMMON, RARE, EPIC, LEGENDARY;
        
            public static Rarity getRandomRarity() {
        
                return values()[(int) (Math.random() * values().length)];
            }
    }
```

## Armor

La clase `Armor` extiende de la clase `Item`, por lo tanto, deberá de implementar los métodos abstractos de la clase
`Item`, además de los siguientes atributos.

- stats
    - Los stats que otorga nuestra armadura, por ejemplo, +10 de defensa.
- armorType
    - El tipo de armadura que es, puede ser para la cabeza, pecho, etc.

```java
    package items.armors;
    
    import items.Item;
    import items.ItemType;
    import player.Stats;
    
    import java.io.Serializable;
    import java.util.HashMap;
    
    public abstract class Armor extends Item implements Serializable {
    
        protected HashMap<Stats, Integer> stats = new HashMap<>();
        protected ArmorType armorType;
    
        public Armor(String name, String description, int price) {
    
            super(name, description, price);
            initStats();
            type = ItemType.ARMOR;
        }
    
        protected abstract void initStats();
    
        public HashMap<Stats, Integer> getStats() {
    
            return stats;
        }
    
        public void setStats(HashMap<Stats, Integer> stats) {
    
            this.stats = stats;
        }
    
        public ArmorType getArmorType() {
    
            return armorType;
        }
    }
```

### ArmorType

La clase `ArmorType` es un enum que contiene los tipos de armaduras que puede haber en el juego, por ejemplo, para la
cabeza, pecho, piernas, etc.

```java
    package items.armors;
    
    import java.io.Serializable;
    
    public enum ArmorType implements Serializable {
    
        HEAD, CHEST, LEGS, FEET, HANDS, SHIELD;
    
        public static String getArmorType(ArmorType type) {
    
            return switch (type) {
                case HEAD -> "CABEZA";
                case CHEST -> "PECHO";
                case LEGS -> "PIERNAS";
                case FEET -> "PIES";
                case HANDS -> "MANOS";
                case SHIELD -> "ESCUDO";
            };
        }
    }
```

### Ejemplos

::: code-tabs#java
@tab IronHelmet.java

```java
    package items.armors.head;
    
    import items.armors.Armor;
    import items.armors.ArmorType;
    import player.Player;
    import player.Stats;
    
    import java.io.Serializable;
    
    public class WoodHelmet extends Armor implements Serializable {
    
        public WoodHelmet() {
    
            super("Casco de Madera",
                    "Un casco de madera que no protege mucho, pero es mejor que nada.", 5);
            this.armorType = ArmorType.HEAD;
        }
    
        @Override
        protected void initStats() {
    
            switch (rarity) {
                case COMMON:
                    stats.put(Stats.DEFENSE, 1);
                    break;
                case RARE:
                    stats.put(Stats.DEFENSE, 2);
                    stats.put(Stats.RESISTANCE, 1);
                    break;
                case EPIC:
                    stats.put(Stats.DEFENSE, 3);
                    stats.put(Stats.RESISTANCE, 2);
                    stats.put(Stats.INTELLIGENCE, 1);
                    break;
                case LEGENDARY:
                    stats.put(Stats.DEFENSE, 5);
                    stats.put(Stats.RESISTANCE, 3);
                    stats.put(Stats.INTELLIGENCE, 3);
                    stats.put(Stats.DEXTERITY, 1);
                    break;
    
            }
        }
    }
```

@tab WoodHelmet.java

```java
    package items.armors.head;
    
    import items.armors.Armor;
    import items.armors.ArmorType;
    import player.Player;
    import player.Stats;
    
    import java.io.Serializable;
    
    public class IronHelmet extends Armor implements Serializable {
    
        public IronHelmet() {
    
            super("Casco de Hierro",
                    "Un casco de hierro que protege mucho, pero es pesado.", 10);
            this.armorType = ArmorType.HEAD;
        }
    
        @Override
        protected void initStats() {
    
            switch (rarity) {
                case COMMON:
                    stats.put(Stats.DEFENSE, 2);
                    break;
                case RARE:
                    stats.put(Stats.DEFENSE, 3);
                    stats.put(Stats.RESISTANCE, 1);
                    break;
                case EPIC:
                    stats.put(Stats.DEFENSE, 5);
                    stats.put(Stats.RESISTANCE, 2);
                    stats.put(Stats.INTELLIGENCE, 1);
                    break;
                case LEGENDARY:
                    stats.put(Stats.DEFENSE, 7);
                    stats.put(Stats.RESISTANCE, 3);
                    stats.put(Stats.INTELLIGENCE, 3);
                    stats.put(Stats.DEXTERITY, 1);
                    break;
    
            }
        }
    }
```

:::

En este caso deberán de crear al menos 5 items de cada tipo de armadura y 5 de armas, cada uno con sus respectivos stats
y rareza, para que puedan ser utilizados en el juego.
