---
icon: gamepad
title: Enemigos de ejemplo
description: Crear enemigos de ejemplo
---

# Enemigos de ejemplo

Anteriormente, habíamos creado un conjunto de enemigos básicos que debemos actualizar de la siguiente manera:

## Implementación de la clase `TinyBat`

```java
    package enemies.bats;
    
    import enemies.Enemy;
    import game.exceptions.EnemyDeadException;
    import gui_old.panels.CharactersPanel;
    import gui_old.panels.DialogPanel;
    import items.misc.BatEar;
    import items.misc.BatWing;
    import player.Player;
    import player.Stats;
    import util.annotations.RegularEnemy;
    import util.interfaces.Randomized;
    
    import javax.swing.*;
    
    @RegularEnemy
    public class TinyBat extends Enemy {
    
        public TinyBat(Player player) {
    
            super(player, "Mur. Diminuto", 5, 5, 5, 3);
            image = imageManager.getImage("tinyBat",
                    new ImageIcon("img\\enemies\\bats\\tinyBat.png").getImage());
            stats.put(Stats.ATTACK, 7);
            stats.put(Stats.DEFENSE, 2);
            stats.put(Stats.LUCK, 3);
            stats.put(Stats.SPEED, 5);
            stats.put(Stats.DEXTERITY, 4);
        }
    
    
        @Override
        public void attack(Player player, CharactersPanel panel) throws EnemyDeadException {
    
            String message = "";
            if (!isDead()) {
    
                double simpleAttackProbability = 0.5;
                double screechProbability = 0.5;
                double totalProbability = simpleAttackProbability + screechProbability;
                double ratio = Randomized.randomizeDouble(totalProbability);
                // simpleAttackProbability = 50%, screechProbability = 50%
                // simpleAttackProbability + screechProbability = 100%
                // ratio = 0.0 - 0.5 -> simpleAttack, ratio = 0.51 - 1.0 -> screech
                if (ratio <= simpleAttackProbability) message = simpleAttack(player);
                else message = screech(player);
            } else {
                throw new EnemyDeadException();
            }
            ((DialogPanel) panel.getDialogPanel()).getText().append(message);
        }
    
        @Override
        public void dropItem(Player player, CharactersPanel panel) {
    
            int ratio = Randomized.randomizeNumber(1, 100);
            player.getInventory().addItem(ratio > 50 ? new BatWing() : new BatEar(), (DialogPanel) panel.getDialogPanel());
        }
    
        public String simpleAttack(Player player) {
    
            int damage = getDamage(player);
            String message = String.format("¡%s ataca con %d punto(s) de daño!\n", getName(), damage);
            message += player.takeDamage(damage);
            return message;
        }
    
        public String screech(Player player) {
    
            int damage = getAdjustedAttack() + 3;
            String message = String.format("¡%s emite un chillido ensordecedor que causa %d punto(s) de daño!\n", getName(),
                    damage);
            message += player.takeDamage(damage);
            return message;
        }
    }
```

## El tipo enumerado `Stats`

```java
    package player;
    
    public enum Stats {
    
        ATTACK("ATK"),
        DEFENSE("DEF"),
        DEXTERITY("HAB"),
        INTELLIGENCE("INT"),
        RESISTANCE("RES"),
        LUCK("SUE"),
        SPEED("VEL");
    
        private final String name;
    
        Stats(String name) {
    
            this.name = name;
        }
    
        public String getName() {
    
            return name;
        }
    
        public static Stats getStat(String name) {
    
            for (Stats stat : Stats.values()) {
                if (stat.getName().equals(name)) {
                    return stat;
                }
            }
            throw new IllegalArgumentException("Invalid stat: " + name);
        }
    }
```

## Implementación de clase `RookieGoblin`

```java
    package enemies.goblins;
    
    import enemies.Enemy;
    import game.exceptions.EnemyDeadException;
    import game.exceptions.ZeroException;
    import gui_old.panels.CharactersPanel;
    import gui_old.panels.DialogPanel;
    import items.misc.GoblinEar;
    import items.weapons.blades.WoodBlade;
    import org.jetbrains.annotations.NotNull;
    import player.Player;
    import player.Stats;
    import util.annotations.RegularEnemy;
    import util.interfaces.Randomized;
    
    import javax.swing.*;
    
    /**
     * La clase RookieGoblin es una subclase de la clase Enemy. Es un enemigo básico que el jugador puede encontrar en el juego.
     * Tiene un método de ataque único que le permite realizar una de tres acciones: plainAttack, runAway, or stealGold.
     * El método plainAttack permite al RookieGoblin atacar al jugador e infligir una cantidad determinada de daño.
     * El método runAway permite al RookieGoblin huir de la batalla.
     * El método stealGold permite al RookieGoblin robar una cantidad determinada de oro del jugador.
     */
    @RegularEnemy
    public class RookieGoblin extends Enemy {
    
        /**
         * Constructor de la clase RookieGoblin.
         */
        public RookieGoblin(Player player) {
    
            super(player, "D. Novato", 5, 5, 5, 2);
            image = imageManager.getImage("rookieGoblin",
                    new ImageIcon("img\\enemies\\goblins\\rookieGoblin.png").getImage());
            stats.put(Stats.ATTACK, 7);
            stats.put(Stats.DEFENSE, 3);
            stats.put(Stats.LUCK, 3);
            stats.put(Stats.SPEED, 4);
            stats.put(Stats.DEXTERITY, 3);
        }
    
        /**
         * Función que permite al RookieGoblin atacar al jugador.
         *
         * @param player Jugador al que se le ataca.
         *
         * @throws EnemyDeadException Excepción que se lanza si el enemigo está muerto.
         */
        @Override
        public void attack(Player player, CharactersPanel panel) throws EnemyDeadException {
    
            String message = "";
            if (!isDead()) {
    
                double plainAttackProbability = 0.5;
                double runAwayProbability = 0.2;
                double stealGoldProbability = 0.3;
                double totalProbability = plainAttackProbability + runAwayProbability + stealGoldProbability;
                double ratio = Randomized.randomizeDouble(totalProbability);
                // plainAttackProbability = 50%, runAwayProbability = 20%, stealGoldProbability = 30%
                // plainAttackProbability + runAwayProbability + stealGoldProbability = 100%
                // ratio = 0.0 - 0.5 -> plainAttack, ratio = 0.51 - 0.8 -> stealGold, ratio = 0.81 - 1.0 -> runAway
                if (ratio <= plainAttackProbability) message = plainAttack(player);
                else if (ratio <= plainAttackProbability + stealGoldProbability) message = stealGold(player);
                else message = runAway();
            } else {
                throw new EnemyDeadException();
            }
            ((DialogPanel) panel.getDialogPanel()).getText().append(message);
        }
    
        /**
         * Función que permite al RookieGoblin soltar un objeto al morir.
         *
         * @param player Jugador al que se le suelta el objeto.
         */
        @Override
        public void dropItem(Player player, CharactersPanel panel) {
    
            int ratio = Randomized.randomizeNumber(1, 100);
            player.getInventory().addItem(ratio > 50 ? new WoodBlade() : new GoblinEar(), (DialogPanel) panel.getDialogPanel());
        }
    
        /**
         * Función que permite al RookieGoblin atacar al jugador.
         *
         * @param player Jugador al que se le ataca.
         */
        private String plainAttack(@NotNull Player player) {
    
            int damage = getDamage(player);
            String message = String.format("¡%s ataca con %d punto(s) de daño!\n", getName(), damage);
            message += player.takeDamage(damage);
            return message;
        }
    
        /**
         * Función que permite al RookieGoblin huir de la batalla.
         */
        public String runAway() {
    
            this.hp = 0;
            return "¡El Duende novato huye de la batalla!\n";
        }
    
        /**
         * Función que permite al RookieGoblin robar oro del jugador.
         *
         * @param player Jugador al que se le roba el oro.
         */
        public String stealGold(@NotNull Player player) {
    
            String message = "";
            try {
                int minus = player.getGold() - 5;
                if (minus < 0)
                    throw new ZeroException();
                player.setGold(minus);
                message += "¡El Duende novato roba 5 de oro!\n";
            } catch (ZeroException e) {
                player.setGold(0);
                message += "¡El Duende novato roba todo el oro del jugador!\n";
            }
            return message;
        }
    }
```

## Implementación de la clase `AloneWolf`

```java
    package enemies.wolfs;
    
    import enemies.Enemy;
    import game.exceptions.EnemyDeadException;
    import gui_old.panels.CharactersPanel;
    import gui_old.panels.DialogPanel;
    import items.armors.head.WoodHelmet;
    import items.misc.WolfFur;
    import player.Player;
    import player.Stats;
    import util.annotations.RegularEnemy;
    import util.interfaces.Randomized;
    
    import javax.swing.*;
    
    /**
     * La clase AloneWolf es una subclase de la clase Enemy. Es un enemigo básico que el jugador puede encontrar en el juego.
     * Tiene un método de ataque único que le permite realizar una de tres acciones: simpleAttack, howl, or bite.
     * El método simpleAttack permite que AloneWolf ataque al jugador con una cantidad determinada de daño.
     * El método howl permite que AloneWolf aúlle.
     * El método bite permite que AloneWolf muerda al jugador provocando una cantidad determinada de daño.
     */
    @RegularEnemy
    public class AloneWolf extends Enemy {
    
        /**
         * Constructor de la clase Lobo solitario.
         */
        public AloneWolf(Player player) {
    
            super(player, "Lobo Solitario", 10, 10, 5, 4);
            image = imageManager.getImage("aloneWolf",
                    new ImageIcon("img\\enemies\\wolfs\\aloneWolf.png").getImage());
            stats.put(Stats.ATTACK, 8);
            stats.put(Stats.DEFENSE, 3);
            stats.put(Stats.LUCK, 3);
            stats.put(Stats.SPEED, 5);
            stats.put(Stats.DEXTERITY, 4);
        }
    
        /**
         * Función que permite al lobo solitario atacar al jugador.
         *
         * @param player Jugador al que se le ataca.
         */
        @Override
        public void attack(Player player, CharactersPanel panel) throws EnemyDeadException {
    
            String message;
            if (!isDead()) {
    
                double simpleAttackProbability = 0.5;
                double howlProbability = 0.3;
                double biteProbability = 0.2;
                double totalProbability = simpleAttackProbability + howlProbability + biteProbability;
                double ratio = Randomized.randomizeDouble(totalProbability);
                // simpleAttackProbability = 50%, howlProbability = 30%, biteProbability = 20%
                // simpleAttackProbability + howlProbability + biteProbability = 100%
                // ratio = 0.0 - 0.5 -> simpleAttack, ratio = 0.51 - 0.7 -> bite, ratio = 0.71 - 1.0 -> howl
                if (ratio <= simpleAttackProbability) message = simpleAttack(player);
                else if (ratio <= simpleAttackProbability + biteProbability) message = bite(player);
                else message = howl(player);
            } else {
                throw new EnemyDeadException();
            }
            DialogPanel.getInstance().getText().append(message);
        }
    
        /**
         * Función que permite al lobo solitario soltar un objeto al morir.
         *
         * @param player Jugador al que se le suelta el objeto.
         */
        @Override
        public void dropItem(Player player, CharactersPanel panel) {
    
            if (getLevel() > 5) {
    
                int ratio = Randomized.randomizeNumber(1, 100);
                player.getInventory().addItem(ratio > 65 ? new WoodHelmet() : new WolfFur(), (DialogPanel) panel.getDialogPanel());
            } else {
                player.getInventory().addItem(new WolfFur(), (DialogPanel) panel.getDialogPanel());
            }
        }
    
        /**
         * Función que permite al lobo solitario atacar.
         *
         * @param player Jugador al que se le ataca.
         */
        public String simpleAttack(Player player) {
    
            int damage = getDamage(player);
            String message = String.format("¡%s ataca con %d punto(s) de daño!\n", getName(), damage);
            message += player.takeDamage(damage);
            return message;
        }
    
        /**
         * Función que permite al lobo solitario aullar.
         *
         * @param player Jugador al que se le aúlla.
         */
        public String howl(Player player) {
    
            //TODO: Implementar efecto de aullido.
            return String.format("¡%s aúlla!\n", getName());
        }
    
        /**
         * Función que permite al lobo lanzar una mordida poderosa.
         *
         * @param player Jugador al que se le muerde.
         */
        public String bite(Player player) {
    
            int totalDamage = getAdjustedAttack() + 1;
            String message = String.format("¡%s muerde con %d punto(s) de daño!\n", getName(), totalDamage);
            return message + player.takeDamage(totalDamage);
        }
    }
```
