---
icon: user
title: Los Enemigos
description: Entendamos a los enemigos y veamos poco a poco interactuemos con el.
---

# Los Enemigos

Como ya hemos visto, nuestro personaje ya tiene algunos puntos y elementos básicos, pero ahora veamos el otro lado de la
moneda del juego. Los enemigos, por tal razón, veamos la clase base, pero antes, definamos una pequeña interfaz
funcional dentro de un nuevo paquete llamado **util**.

## Randomized

Esta interfaz funcional nos permitirá generar números aleatorios, así como valores booleanos aleatorios. Para ello,
crearemos una interfaz funcional llamada **Randomized** que contará con los siguientes métodos:

- randomizeNumber
    - Genera un número aleatorio entre los valores especificados.
- randomizeBoolean
    - Genera un valor booleano aleatorio.
- randomizeDouble(min, max)
    - Genera un número decimal aleatorio entre los valores especificados.
- randomizeDouble(total)
    - Genera un número decimal aleatorio entre 0 y el valor especificado.

```java
    package util.interfaces;
    
    import java.util.Random;
    
    /**
     * Randomized es una interfaz que proporciona métodos para generar números aleatorios, así como valores booleanos como
     * si de una moneda se tratara.
     *
     * @author jesus
     * @version 1.0
     */
    public interface Randomized {
    
        /**
         * Genera un número aleatorio entre los valores especificados.
         *
         * @param min el valor mínimo del número generado
         * @param max el valor máximo del número generado
         *
         * @return un número aleatorio entre los valores especificados
         */
        static int randomizeNumber(int min, int max) {
    
            return new Random().nextInt(max - min + 1) + min;
        }
    
        /**
         * Genera un valor booleano aleatorio.
         *
         * @return un valor booleano aleatorio
         */
        static boolean randomizeBoolean() {
    
            return new Random().nextBoolean();
        }
    
        /**
         * Genera un número decimal aleatorio entre los valores especificados.
         *
         * @param min el valor mínimo del número generado
         * @param max el valor máximo del número generado
         *
         * @return un número decimal aleatorio entre los valores especificados
         */
        static double randomizeDouble(double min, double max) {
    
            return new Random().nextDouble() * (max - min) + min;
        }
    
        /**
         * Genera un número decimal aleatorio entre 0 y el valor especificado.
         *
         * @param total el valor máximo del número generado
         *
         * @return un número decimal aleatorio entre 0 y el valor especificado
         */
        static double randomizeDouble(double total) {
    
            return new Random().nextDouble() * total;
        }
    }
```
## RegularEnemy

Dentro del paquete `util.annotations`, crearemos una nueva anotación llamada `RegularEnemy` que nos permitirá indicar 
que un enemigo es regular. Esta anotación no tendrá ningún atributo y se verá de la siguiente manera:

```java
    package util.annotations;
    
    import java.lang.annotation.*;
    
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface RegularEnemy {
    }
```

## Enemy

Ahora, crearemos la clase base de los enemigos llamada `Enemy`. Esta clase será abstracta y contará con los siguientes
atributos y métodos:

- Atributos
    - `adjustmentFactor` - Un entero que representa el factor de ajuste.
    - `name` - Un String que representa el nombre del enemigo.
    - `stats` - Un HashMap que contiene las estadísticas del enemigo.
    - `gold` - Un entero que representa la cantidad de oro que el enemigo otorga.
    - `experience` - Un entero que representa la cantidad de experiencia que el enemigo otorga.
    - `level` - Un entero que representa el nivel del enemigo.
    - `maxLevel` - Un entero que representa el nivel máximo del enemigo.
    - `image` - Una imagen que representa al enemigo.
    - `imageManager` - Un ImageManager que nos permitirá gestionar las imágenes.
    - `player` - Un Player que representa al jugador.
    - `BASE_LEVEL` - Un entero que representa el nivel base.
- Métodos
  - `Enemy(Player player, String name, int maxLevel, int health, int gold, int experience)` - El constructor de la clase.
  - `getExperience(int experience)` - Un método que nos permitirá obtener la experiencia del enemigo.
  - `getGold(int gold)` - Un método que nos permitirá obtener el oro del enemigo.
  - `getHealth(int health)` - Un método que nos permitirá obtener la salud del enemigo.
  - `getDefense(Player player)` - Un método que nos permitirá obtener la defensa del enemigo.
  - `getAdjustedSpeed()` - Un método que nos permitirá obtener la velocidad ajustada del enemigo.
  - `getAdjustedAttack()` - Un método que nos permitirá obtener el ataque ajustado del enemigo.
  - `getAdjustedDefense()` - Un método que nos permitirá obtener la defensa ajustada del enemigo.
  - `getDamage(Player player)` - Un método que nos permitirá obtener el daño del enemigo.
  - `getLevel(Player player, int maxLevel)` - Un método que nos permitirá obtener el nivel del enemigo.
  - `getLuck()` - Un método que nos permitirá obtener la suerte del enemigo.
  - `getImage()` - Un método que nos permitirá obtener la imagen del enemigo.
  - `getImageManager()` - Un método que nos permitirá obtener el ImageManager.
  - `getLevel()` - Un método que nos permitirá obtener el nivel del enemigo.
  - `getMaxLevel()` - Un método que nos permitirá obtener el nivel máximo del enemigo.
  - `getName()` - Un método que nos permitirá obtener el nombre del enemigo.
  - `getGold()` - Un método que nos permitirá obtener el oro del enemigo.
  - `getExperience()` - Un método que nos permitirá obtener la experiencia del enemigo.
  - `calculateDamage(Player player)` - Un método que nos permitirá calcular el daño del enemigo.
  - `calculateDamage(Player player, int damage)` - Un método que nos permitirá calcular el daño del enemigo.
  - `takeDamage(Player player)` - Un método que nos permitirá recibir daño.
  - `takeDamage(Player player, int damage)` - Un método que nos permitirá recibir daño.
  - `attack()` - Un método que nos permitirá atacar.
  - `getAttack()` - Un método que nos permitirá obtener el ataque del enemigo.
  - `dropItem(Player player)` - Un método que nos permitirá soltar un objeto.
  - `getStats()` - Un método que nos permitirá obtener las estadísticas del enemigo.

```java
    package enemies;
    
    import characters.BasicCharacter;
    
    import gui.exceptions.EnemyDeadException;
    import gui.panels.DialogPanel;
    import player.Player;
    import player.Stats;
    import util.interfaces.Randomized;
    import util.managers.ImageManager;
    
    import java.awt.*;
    import java.util.HashMap;
    
    public abstract class Enemy extends BasicCharacter {
    
        protected final int adjustmentFactor = 3;
        protected final String name;
        protected final HashMap<Stats, Integer> stats = new HashMap<>();
        protected final int gold;
        protected final int experience;
        protected final int level;
        protected final int maxLevel;
        protected Image image;
        protected final ImageManager imageManager = ImageManager.getInstance();
        protected final Player player;
        private static final int BASE_LEVEL = 1;
    
        public Enemy(Player player, String name, int maxLevel, int health, int gold, int experience) {
    
            super(name, health, 0);
            this.player = player;
            this.maxLevel = maxLevel;
            this.level = getLevel(player, maxLevel);
            this.name = name;
            this.maxHp = getHealth(health);
            this.hp = maxHp;
            this.gold = getGold(gold);
            this.experience = getExperience(experience);
        }
    
        private int getExperience(int experience) {
    
            return Randomized.randomizeNumber(experience, experience + 2) * level;
        }
    
        private int getGold(int gold) {
    
            return Randomized.randomizeNumber(gold, gold + 2) * level;
        }
    
        private int getHealth(int health) {
    
            return (Randomized.randomizeNumber(health, health + 2)) * level;
        }
    
        protected int getDefense(Player player) {
    
            int defense = getAdjustedDefense();
            if (stats.get(Stats.LUCK) > player.getDexterity()) {
                //TODO: Implementar críticos
            }
            return defense;
        }
    
        public int getAdjustedSpeed() {
    
            return stats.get(Stats.SPEED) + (player.getLevel() - BASE_LEVEL) * adjustmentFactor;
        }
    
        public int getAdjustedAttack() {
    
            int adjustedAttack = stats.get(Stats.ATTACK) + (player.getLevel() - BASE_LEVEL) * adjustmentFactor;
            if (adjustedAttack <= player.getDefense()) adjustedAttack = player.getDefense() + adjustmentFactor;
            return adjustedAttack;
        }
    
        public int getAdjustedDefense() {
    
            int adjustedDefense = stats.get(Stats.DEFENSE) + (player.getLevel() - BASE_LEVEL) * adjustmentFactor;
            if (adjustedDefense >= player.getDamage()) adjustedDefense = player.getDamage() - adjustmentFactor;
            return adjustedDefense;
        }
    
        protected int getDamage(Player player) {
    
            int damage = getAdjustedAttack();
            if (stats.get(Stats.DEXTERITY) > player.getLuck()) {
    
                //TODO: Implementar críticos
            }
            return damage;
        }
    
        private int getLevel(Player player, int maxLevel) {
    
            return player.getLevel();
        }
    
        public int getLuck() {
    
            return stats.get(Stats.LUCK);
        }
    
        public Image getImage() {
    
            return image;
        }
    
        public ImageManager getImageManager() {
    
            return imageManager;
        }
    
        public int getLevel() {
    
            return level;
        }
    
        public int getMaxLevel() {
    
            return maxLevel;
        }
    
        public String getName() {
    
            return name;
        }
    
        public int getGold() {
    
            return gold;
        }
    
        public int getExperience() {
    
            return experience;
        }
    
        public int calculateDamage(Player player) {
    
            return Math.max(0, (player.getDamage() - getDefense(player)));
        }
    
        public int calculateDamage(Player player, int damage) {
    
            return Math.max(0, (damage - getDefense(player)));
        }
    
        public String takeDamage(Player player) {
    
            int damage = calculateDamage(player);
            String message = String.format("¡%s ataca con %d punto(s) de daño!\n", player.getName(), player.getDamage());
            message += String.format("¡%s sufre %d punto(s) de daño!\n", name, damage);
            hp -= damage;
            if (isDead())
                message += String.format("¡%s ha sido derrotado!\n", name);
            return message;
        }
    
        public String takeDamage(Player player, int damage) {
    
            int finalDamage = calculateDamage(player, damage);
            hp -= finalDamage;
            String message = String.format("¡%s sufre %d punto(s) de daño!\n", name, finalDamage);
            message += String.format("¡%s ataca con %d punto(s) de daño!\n", name, damage);
            if (isDead())
                message += String.format("¡%s ha sido derrotado!\n", name);
            return message;
        }
    
        public void attack() throws EnemyDeadException {
    
            DialogPanel.getInstance().addText(getAttack());
        }
    
        public abstract String getAttack() throws EnemyDeadException;
    
        public abstract void dropItem(Player player);
    
        public HashMap<Stats, Integer> getStats() {
    
            return stats;
        }
    }
```
