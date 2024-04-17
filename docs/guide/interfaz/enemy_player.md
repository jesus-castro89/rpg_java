---
icon: gamepad
title: El enemigo y el jugador
description: Una actualización necesaria.
---

# El enemigo y el jugador

Hasta ahora emos tratado al enemigo y al jugador como clases que interactuaban de una manera un tanto primitiva. En este
capítulo vamos a mejorar la interacción entre ambos.

## El enemigo

El enemigo es un personaje que interactúa con el jugador mediante ataque aleatorios de un pool de movimientos propios;
sin embargo, los ataques y la interacción sucedían en ventanas emergentes, por lo que ahora con la nueva interfaz, esto
ya es un tanto primitivo, es por ello que nuestro enemigo ahora se debe de ver de la siguiente manera:

```java
    package enemies;
    
    import characters.BasicCharacter;
    import game.exceptions.EnemyDeadException;
    import gui.panels.CharactersPanel;
    import gui.panels.DialogPanel;
    import player.Player;
    import player.Stats;
    import util.interfaces.Randomized;
    import util.managers.ImageManager;
    import util.interfaces.Interactive;
    
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
    
        public int getAdjustedAttack() {
    
            int adjustedAttack = stats.get(Stats.ATTACK) + (player.getLevel() - BASE_LEVEL) * adjustmentFactor;
            if (adjustedAttack < player.getDefense()) {
    
                adjustedAttack = player.getDefense() + adjustmentFactor;
            }
            return adjustedAttack;
        }
    
        public int getAdjustedDefense() {
    
            int adjustedDefense = stats.get(Stats.DEFENSE) + (player.getLevel() - BASE_LEVEL) * adjustmentFactor;
            if (adjustedDefense > player.getDamage()) {
    
                adjustedDefense = player.getDamage() - adjustmentFactor;
            }
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
            String message = String.format("¡%s ataca con %d punto(s) de daño!\n", name, damage);
            message += String.format("¡%s sufre %d punto(s) de daño!\n", name, finalDamage);
            if (isDead())
                message += String.format("¡%s ha sido derrotado!\n", name);
            return message;
        }
    
        public abstract void attack(Player player, CharactersPanel panel) throws EnemyDeadException;
    
        public abstract void dropItem(Player player, CharactersPanel panel);
    
        public HashMap<Stats, Integer> getStats() {
    
            return stats;
        }
    }
```

En este caso, el enemigo ahora tiene una interacción más directa con el jugador, ya que ahora el enemigo puede atacar al
jugador directamente, sin necesidad de ventanas emergentes, además de que ahora el enemigo puede dejar caer objetos al
jugador, lo que hace que la interacción sea más directa y menos primitiva.

Es importante mencionar que algunas clases como el CharactersPanel son componentes que veremos en este capítulo, por lo
que no se explicarán en este apartado, pero sí en los siguientes.

## El jugador

El jugador también ha sido actualizado, ya que ahora el jugador puede atacar al enemigo directamente, sin necesidad de
ventanas emergentes, además de que ahora el jugador puede recibir daño directamente del enemigo, lo que hace que la
interacción sea más directa y menos primitiva.

```java
    package player;
    
    import characters.BasicCharacter;
    import enemies.Enemy;
    import game.exceptions.PlayerDeathException;
    import gui.game.GameWindow;
    import gui.panels.ActionsPanel;
    import gui.panels.CharactersPanel;
    import gui.panels.DialogPanel;
    import gui.panels.StatusPanel;
    import items.armors.Armor;
    import items.weapons.Weapon;
    import org.jetbrains.annotations.NotNull;
    import player.jobs.Job;
    import player.skills.BasicHeal;
    import player.skills.FuryAttack;
    import player.skills.Skill;
    import util.interfaces.Interactive;
    import util.interfaces.Randomized;
    import util.managers.ImageManager;
    
    import javax.swing.*;
    import java.awt.*;
    import java.io.Serializable;
    import java.util.HashMap;
    import java.util.Map;
    
    public class Player extends BasicCharacter implements Serializable {
    
        private static Player instance;
        private int strength;
        private int defense;
        private int intelligence;
        private int dexterity;
        private int luck;
        private int resistance;
        private int speed;
        private int experience;
        private int level;
        private int gold;
        private Weapon weapon;
        private Armor headArmor;
        private Armor chestArmor;
        private Armor legArmor;
        private Armor footArmor;
        private Armor handArmor;
        private final Inventory inventory;
        private Map<String, Skill> skillMap;
    
        public static Player getInstance() {
    
            if (instance == null) {
    
                instance = new Player("Juanito");
                // instance = new Player(JOptionPane.showInputDialog("Ingresa el Nombre del Jugador"));
            }
            return instance;
        }
    
        private Player(String name) {
    
            super(name, 30, 10);
            experience = 0;
            level = 1;
            gold = 0;
            weapon = null;
            headArmor = null;
            chestArmor = null;
            legArmor = null;
            footArmor = null;
            handArmor = null;
            strength = 5;
            defense = 5;
            randomizeStats(20);
            inventory = new Inventory();
            skillMap = new HashMap<>();
            skillMap.put(BasicHeal.NAME, BasicHeal.getInstance());
            skillMap.put(FuryAttack.NAME, FuryAttack.getInstance());
        }
    
        @Override
        public String toString() {
    
            return String.format("%s - Nivel %d", getName(), level);
        }
    
        public void randomizeStats(int maxPoints) {
    
            int stat = Randomized.randomizeNumber(1, 7);
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
                    case 6 -> resistance++;
                    case 7 -> speed++;
                }
                maxPoints--;
                stat = Randomized.randomizeNumber(1, 7);
            }
        }
    
        public void equipWeapon(Weapon weapon) {
    
            this.weapon = weapon;
        }
    
        public void equipArmor(Armor armor) {
    
            switch (armor.getType()) {
                case HEAD -> headArmor = armor;
                case CHEST -> chestArmor = armor;
                case LEGS -> legArmor = armor;
                case FEET -> footArmor = armor;
                case HANDS -> handArmor = armor;
            }
        }
    
        public void revive() {
    
            hp = maxHp;
            mp = maxMp;
        }
    
        public void attack(@NotNull Enemy enemy, CharactersPanel panel) throws PlayerDeathException {
    
            if (!isDead()) {
    
                DialogPanel.getInstance().getText().append(String.format("%s", enemy.takeDamage(this)));
                if (enemy.isDead()) getRewards(enemy, panel);
            } else {
                throw new PlayerDeathException();
            }
        }
    
        private void getRewards(@NotNull Enemy enemy, CharactersPanel panel) {
    
            String message = gainExperience(enemy.getExperience());
            message += gainGold(enemy.getGold());
            ((DialogPanel) panel.getDialogPanel()).getText().append(message);
            enemy.dropItem(this, panel);
            StatusPanel.getInstance(ActionsPanel.getInstance(), 0, panel.getPlayer()).update();
        }
    
        public String getActualHp() {
    
            return String.format("%d/%d", getHp(), getMaxHp());
        }
    
        public String getActualMp() {
    
            return String.format("%d/%d", getMp(), getMaxMp());
        }
    
        private int getWeaponStat(Weapon weapon, Stats stat) {
    
            return weapon != null && weapon.getStats().containsKey(stat) ? weapon.getStats().get(stat) : 0;
        }
    
        private int getArmorStat(Armor armor, Stats stat) {
    
            return armor != null && armor.getStats().containsKey(stat) ? armor.getStats().get(stat) : 0;
        }
    
        public String getTotalAttack() {
    
            int plusAttack = 0;
            String message = String.format("FUE: %d", getStrength());
            plusAttack += getWeaponStat(weapon, Stats.ATTACK);
            plusAttack += getArmorStat(headArmor, Stats.ATTACK);
            plusAttack += getArmorStat(chestArmor, Stats.ATTACK);
            plusAttack += getArmorStat(legArmor, Stats.ATTACK);
            plusAttack += getArmorStat(footArmor, Stats.ATTACK);
            plusAttack += getArmorStat(handArmor, Stats.ATTACK);
            if (plusAttack > 0) {
                message += String.format(" (+%d)", plusAttack);
            }
            return message;
        }
    
        private int getAtk() {
    
            int plusAttack = 0;
            plusAttack += getWeaponStat(weapon, Stats.ATTACK);
            plusAttack += getArmorStat(headArmor, Stats.ATTACK);
            plusAttack += getArmorStat(chestArmor, Stats.ATTACK);
            plusAttack += getArmorStat(legArmor, Stats.ATTACK);
            plusAttack += getArmorStat(footArmor, Stats.ATTACK);
            plusAttack += getArmorStat(handArmor, Stats.ATTACK);
            return plusAttack > 0 ? strength + plusAttack : strength;
        }
    
        public String getTotalDefense() {
    
            int plusDefense = 0;
            String message = String.format("DEF: %d", getDefense());
            plusDefense += getArmorStat(headArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(chestArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(legArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(footArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(handArmor, Stats.DEFENSE);
            if (plusDefense > 0) {
    
                message += String.format(" (+%d)", plusDefense);
            }
            return message;
        }
    
        private int getDef() {
    
            int plusDefense = 0;
            plusDefense += getArmorStat(headArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(chestArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(legArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(footArmor, Stats.DEFENSE);
            plusDefense += getArmorStat(handArmor, Stats.DEFENSE);
            return plusDefense > 0 ? defense + plusDefense : defense;
        }
    
        public String getTotalIntelligence() {
    
            int plusIntelligence = 0;
            String message = String.format("INT: %d", getInt());
            plusIntelligence += getArmorStat(headArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(chestArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(legArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(footArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(handArmor, Stats.INTELLIGENCE);
            if (plusIntelligence > 0) {
    
                message += String.format(" (+%d)", plusIntelligence);
            }
            return message;
        }
    
        private int getInt() {
    
            int plusIntelligence = 0;
            plusIntelligence += getArmorStat(headArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(chestArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(legArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(footArmor, Stats.INTELLIGENCE);
            plusIntelligence += getArmorStat(handArmor, Stats.INTELLIGENCE);
            return plusIntelligence > 0 ? intelligence + plusIntelligence : intelligence;
        }
    
        public String getTotalDexterity() {
    
            int plusDexterity = 0;
            String message = String.format("DES: %d", getDex());
            plusDexterity += getArmorStat(headArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(chestArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(legArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(footArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(handArmor, Stats.DEXTERITY);
            if (plusDexterity > 0) {
    
                message += String.format(" (+%d)", plusDexterity);
            }
            return message;
    
        }
    
        private int getDex() {
    
            int plusDexterity = 0;
            plusDexterity += getArmorStat(headArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(chestArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(legArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(footArmor, Stats.DEXTERITY);
            plusDexterity += getArmorStat(handArmor, Stats.DEXTERITY);
            return plusDexterity > 0 ? dexterity + plusDexterity : dexterity;
        }
    
        public String getTotalLuck() {
    
            int plusLuck = 0;
            String message = String.format("SUER: %d", getLck());
            plusLuck += getArmorStat(headArmor, Stats.LUCK);
            plusLuck += getArmorStat(chestArmor, Stats.LUCK);
            plusLuck += getArmorStat(legArmor, Stats.LUCK);
            plusLuck += getArmorStat(footArmor, Stats.LUCK);
            plusLuck += getArmorStat(handArmor, Stats.LUCK);
            if (plusLuck > 0) {
    
                message += String.format(" (+%d)", plusLuck);
            }
            return message;
        }
    
        private int getLck() {
    
            int plusLuck = 0;
            plusLuck += getArmorStat(headArmor, Stats.LUCK);
            plusLuck += getArmorStat(chestArmor, Stats.LUCK);
            plusLuck += getArmorStat(legArmor, Stats.LUCK);
            plusLuck += getArmorStat(footArmor, Stats.LUCK);
            plusLuck += getArmorStat(handArmor, Stats.LUCK);
            return plusLuck > 0 ? luck + plusLuck : luck;
        }
    
        public String getTotalResistance() {
    
            int plusResistance = 0;
            String message = String.format("RES: %d", getRes());
            plusResistance += getArmorStat(headArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(chestArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(legArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(footArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(handArmor, Stats.RESISTANCE);
            if (plusResistance > 0) {
    
                message += String.format(" (+%d)", plusResistance);
            }
            return message;
        }
    
        private int getRes() {
    
            int plusResistance = 0;
            plusResistance += getArmorStat(headArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(chestArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(legArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(footArmor, Stats.RESISTANCE);
            plusResistance += getArmorStat(handArmor, Stats.RESISTANCE);
            return plusResistance > 0 ? resistance + plusResistance : resistance;
        }
    
        public String getTotalSpeed() {
    
            int plusSpeed = 0;
            String message = String.format("VEL: %d", getSpd());
            plusSpeed += getArmorStat(headArmor, Stats.SPEED);
            plusSpeed += getArmorStat(chestArmor, Stats.SPEED);
            plusSpeed += getArmorStat(legArmor, Stats.SPEED);
            plusSpeed += getArmorStat(footArmor, Stats.SPEED);
            plusSpeed += getArmorStat(handArmor, Stats.SPEED);
            if (plusSpeed > 0) {
    
                message += String.format(" (+%d)", plusSpeed);
            }
            return message;
        }
    
        private int getSpd() {
    
            int plusSpeed = 0;
            plusSpeed += getArmorStat(headArmor, Stats.SPEED);
            plusSpeed += getArmorStat(chestArmor, Stats.SPEED);
            plusSpeed += getArmorStat(legArmor, Stats.SPEED);
            plusSpeed += getArmorStat(footArmor, Stats.SPEED);
            plusSpeed += getArmorStat(handArmor, Stats.SPEED);
            return plusSpeed > 0 ? speed + plusSpeed : speed;
        }
    
        public String takeDamage(int damage) {
    
            damage -= getDef();
            String message;
            if (damage < 0) damage = 0;
            message = super.takeDamage(damage);
            if (isDead())
                message += String.format("%s\n", printDeath());
            return message;
        }
    
        public String gainExperience(int experience) {
    
            this.experience += experience;
            String message = printExperience(experience);
            message += checkLevelUp();
            return message;
        }
    
        /**
         * Revisa si el jugador sube de nivel.
         */
        private String checkLevelUp() {
    
            if (this.experience >= level * 20) {
    
                level++;
                maxHp += 5;
                maxMp += 3;
                hp = maxHp;
                mp = maxMp;
                strength += Randomized.randomizeNumber(1, 3);
                defense += Randomized.randomizeNumber(1, 3);
                randomizeStats(5);
                GameWindow.getInstance().getStatusPanel().update(this);
                return String.format("¡%s ha subido al nivel %d!\n", getName(), level);
            } else {
                return "";
            }
        }
    
        public String gainGold(int gold) {
    
            this.gold += gold;
            return printGold(gold);
        }
    
        public String printDeath() {
    
            return "¡Has muerto!";
        }
    
        public void printRun() {
    
            Interactive.printDialog("¡Has huido!");
        }
    
        public String printGold(int gold) {
    
            return String.format("Has ganado %d monedas de oro!\n", gold);
        }
    
        public String printExperience(int experience) {
    
            return String.format("Has ganado %d puntos de experiencia!\n", experience);
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
    
        public Image getImage() {
    
            return ImageManager.getInstance().getImage("player",
                    new ImageIcon("img\\player\\player.png").getImage());
        }
    
        public Map<String, Skill> getSkillMap() {
    
            return skillMap;
        }
    }
```

En este caso, el jugador ahora tiene una interacción más directa con el enemigo, ya que ahora el jugador puede atacar al
enemigo directamente, sin necesidad de ventanas emergentes, además de que ahora el jugador puede recibir daño
directamente del enemigo, lo que hace que la interacción sea más directa y menos primitiva.

## Los tipos de armadura del jugador

Para completar la clase previa, debemos crear un tipo enumerado para nuestras armaduras:

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

Este tipo enumerado nos permitirá identificar el tipo de armadura que estamos utilizando en el jugador, lo que nos
permitirá equipar y desequipar armaduras de manera más sencilla.

## Los skills del jugador

Además de las armaduras, el jugador ahora tiene habilidades que puede utilizar en combate, estas habilidades son
instancias de la clase Skill, que es una clase abstracta que define el comportamiento de las habilidades, además de que
cada habilidad tiene un nombre y una descripción, lo que nos permite identificarlas y utilizarlas de manera más
sencilla.

```java
    package player.skills;
    
    import enemies.Enemy;
    import gui_old.panels.CharactersPanel;
    import player.Player;
    
    public abstract class Skill {
    
        protected String name;
        protected String description;
        protected int level;
        protected int manaCost;
        protected CharactersPanel charactersPanel;
    
        public Skill(String name, String description, int level, int manaCost) {
    
            this.name = name;
            this.description = description;
            this.level = level;
            this.manaCost = manaCost;
        }
    
        public String activate(Player player) {
    
            if (player.getMp() < manaCost) {
                return "¡No hay suficiente maná!";
            }
            player.useMp(manaCost);
            return effect(player);
        }
    
        public String activate(Player player, Enemy enemy) {
    
            if (player.getMp() < manaCost) {
                return "¡No hay suficiente maná!";
            }
            player.useMp(manaCost);
            return effect(player, enemy);
        }
    
        public abstract String effect(Player player);
    
        public abstract String effect(Player player, Enemy enemy);
    
        public String getName() {
    
            return name;
        }
    
        public void setName(String name) {
    
            this.name = name;
        }
    
        public String getDescription() {
    
            return description;
        }
    
        public void setDescription(String description) {
    
            this.description = description;
        }
    
        public int getLevel() {
    
            return level;
        }
    
        public void setLevel(int level) {
    
            this.level = level;
        }
    
        public int getManaCost() {
    
            return manaCost;
        }
    
        public void setManaCost(int manaCost) {
    
            this.manaCost = manaCost;
        }
    
        public CharactersPanel getCharactersPanel() {
    
            return charactersPanel;
        }
    
        public void setCharactersPanel(CharactersPanel charactersPanel) {
    
            this.charactersPanel = charactersPanel;
        }
    }
```

En este caso, las habilidades del jugador son instancias de la clase Skill, que es una clase abstracta que define el
comportamiento de las habilidades, además de que cada habilidad tiene un nombre y una descripción, lo que nos permite
identificarlas y utilizarlas de manera más sencilla.

## La skill de curación básica

La primera habilidad que vamos a implementar es la habilidad de curación básica, que nos permite recuperar una cantidad
de
puntos de salud, esta habilidad es una instancia de la clase Skill y tiene un nombre y una descripción, además de que
tiene un nivel y un costo de maná, lo que nos permite identificarla y utilizarla de manera más sencilla.

```java
    package player.skills;
    
    import enemies.Enemy;
    import game.exceptions.EnemyDeadException;
    import gui_old.panels.DialogPanel;
    import player.Player;
    
    public class BasicHeal extends Skill {
    
        private static final BasicHeal instance = new BasicHeal();
        public static final String NAME = "Curación Básica";
    
        public static BasicHeal getInstance() {
    
            if (instance == null) {
    
                return new BasicHeal();
            } else {
                return instance;
            }
        }
    
        private BasicHeal() {
    
            super(NAME, "Cura al jugador 8 puntos de vida", 3, 5);
        }
    
        @Override
        public String effect(Player player) {
    
            player.heal(8);
            player.useMp(manaCost);
            return String.format("¡%s ha sido curado por 8 puntos de vida!", player.getName());
        }
    
        @Override
        public String effect(Player player, Enemy enemy) {
    
            String message = effect(player);
            ((DialogPanel) getCharactersPanel().getDialogPanel()).getText().append(message);
            try {
                enemy.attack(player, getCharactersPanel());
            } catch (EnemyDeadException e) {
                throw new RuntimeException(e);
            }
            return message;
        }
    }
```

En este caso, la habilidad de curación básica es una instancia de la clase Skill y tiene un nombre y una descripción,
además de que tiene un nivel y un costo de maná, lo que nos permite identificarla y utilizarla de manera más sencilla.

## La skill de ataque furioso

La segunda habilidad que vamos a implementar es la habilidad de ataque furioso, que nos permite infligir una cantidad de
daño adicional al enemigo, esta habilidad es una instancia de la clase Skill y tiene un nombre y una descripción, además
de que tiene un nivel y un costo de maná, lo que nos permite identificarla y utilizarla de manera más sencilla.

```java
    package player.skills;
    
    import enemies.Enemy;
    import game.exceptions.EnemyDeadException;
    import gui_old.panels.DialogPanel;
    import gui_old.panels.EnemyPanel;
    import gui_old.panels.PlayerPanel;
    import player.Player;
    import util.enemies.EnemyFactory;
    
    public class FuryAttack extends Skill {
    
        private final static FuryAttack instance = new FuryAttack();
        public final static String NAME = "Ataque Furia";
    
        public static FuryAttack getInstance() {
    
            if (instance == null) {
    
                return new FuryAttack();
            } else {
                return instance;
            }
        }
    
        public FuryAttack() {
    
            super(NAME, "Ataque al enemigo con 5 puntos de daño", 5, 3);
        }
    
        @Override
        public String effect(Player player) {
    
            return null;
        }
    
        @Override
        public String effect(Player player, Enemy enemy) {
    
            player.useMp(manaCost);
            String message = "";
            message += String.format("¡%s ataca a %s con %d puntos de daño!\n", player.getName(), enemy.getName(), 5);
            message += enemy.takeDamage(player, 5);
            ((DialogPanel) getCharactersPanel().getDialogPanel()).getText().append(message);
            if (enemy.isDead()) {
    
                message += String.format("%s ha ganado %d de oro y %d de experiencia!\n", player.getName(), enemy.getGold(), enemy.getExperience());
                message += player.gainGold(enemy.getGold());
                message += player.gainExperience(enemy.getExperience());
                ((DialogPanel) getCharactersPanel().getDialogPanel()).getText().append(message);
                enemy.dropItem(player, getCharactersPanel());
                Enemy newEnemy = EnemyFactory.generateRegularEnemy(player);
                getCharactersPanel().getWindow().setEnemy(enemy);
                charactersPanel.updateEnemy(newEnemy);
                EnemyPanel enemyPanel = (EnemyPanel) getCharactersPanel().getWindow().getEnemyPanel();
                PlayerPanel playerPanel = (PlayerPanel) getCharactersPanel().getWindow().getPlayerPanel();
                enemyPanel.updateEnemy(newEnemy);
                playerPanel.updatePlayer(player);
            } else {
                try {
                    enemy.attack(player, getCharactersPanel());
                } catch (EnemyDeadException e) {
                    throw new RuntimeException(e);
                }
                EnemyPanel enemyPanel = (EnemyPanel) getCharactersPanel().getWindow().getEnemyPanel();
                PlayerPanel playerPanel = (PlayerPanel) getCharactersPanel().getWindow().getPlayerPanel();
                enemyPanel.updateEnemy(enemy);
                playerPanel.updatePlayer(player);
            }
            return message;
        }
    }
```

En este caso, la habilidad de ataque furioso es una instancia de la clase Skill y tiene un nombre y una descripción,
además de que tiene un nivel y un costo de maná, lo que nos permite identificarla y utilizarla de manera más sencilla.

## Conclusión

Con estas actualizaciones, ahora el enemigo y el jugador tienen una interacción más directa, lo que hace que la
interacción sea más fluida y menos primitiva, además de que ahora el jugador tiene habilidades que puede utilizar en
combate, lo que hace que el combate sea más interesante y menos monótono.
