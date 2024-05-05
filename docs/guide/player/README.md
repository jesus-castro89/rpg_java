---
icon: user
title: Definamos al Personaje
description: Definamos a nuestro jugador y algunas de sus características.
---

## BasicCharacter

Comencemos por el principio y no hay mejor principio en un juego que nuestro personaje, por lo tanto, nuestra primera
tarea es de hecho definir una clase llamada "**BasicCharacter**" que representará a todos los personajes del juego, y
que deberá contar con lo siguiente.

### Atríbutos

Nuestro personaje deberá de contar con los siguientes atríbutos generales:

- **name**
    - El nombre del personaje
- **hp**
    - La vida actual del personaje
- **maxHp**
    - La vida máxima del personaje
- **mp**
    - La magia actual del personaje
- **maxMp**
    - La magia máxima del personaje

### Funciones

- **Constructor**
    - Este constructor deberá de recibir el nombre del personaje, la vida y la magia del personaje.
    - Inicializará los valores de hp y mp con los valores recibidos.
    - Inicializará los valores de maxHp y maxMp con los valores de hp y mp respectivamente.
- **isDead**
    - Esta función permitirá saber si el personaje ha muerto o no.
    - Devolverá un valor booleano que será verdadero si la vida del personaje es menor o igual a 0.
    - Devolverá un valor falso si la vida del personaje es mayor a 0.
- **takeDamage**
    - Esta función permitirá al personaje recibir daño.
    - Recibirá un valor entero que representará el daño recibido.
    - Restará el valor recibido a la vida del personaje.
    - Si la vida del personaje es menor o igual a 0, se mostrará un mensaje diciendo que el personaje ha muerto.
- **heal**
    - Esta función permitirá al personaje recuperar vida.
    - Recibirá un valor entero que representará la cantidad de vida recuperada.
    - Sumará el valor recibido a la vida del personaje.
    - Si la vida del personaje es mayor a la vida máxima, la vida del personaje será igual a la vida máxima.
- **recoverMp**
    - Esta función permitirá al personaje recuperar magia.
    - Recibirá un valor entero que representará la cantidad de magia recuperada.
    - Sumará el valor recibido a la magia del personaje.
    - Si la magia del personaje es mayor a la magia máxima, la magia del personaje será igual a la magia máxima.
- **useMp**
    - Esta función permitirá al personaje usar magia.
    - Recibirá un valor entero que representará la cantidad de magia usada.
    - Restará el valor recibido a la magia del personaje.
    - Si la magia del personaje es menor a 0, la magia del personaje será igual a 0.
- **getters**
    - Se deberán de crear los getters necesarios para acceder a los valores de los atríbutos del personaje.

Veamos un ejemplo de como sería esta clase:

```java
package characters;

import java.io.Serializable;

/**
 * Clase abstracta que representa a un personaje básico.
 */
public abstract class BasicCharacter implements Serializable {

	/**
	 * Nombre del personaje.
	 */
	protected String name;
	/**
	 * Puntos de vida del personaje.
	 */
	protected int hp;
	/**
	 * Puntos de maná del personaje.
	 */
	protected int mp;
	/**
	 * Puntos de vida máximos del personaje.
	 */
	protected int maxHp;
	/**
	 * Puntos de maná máximos del personaje.
	 */
	protected int maxMp;

	/**
	 * Constructor de la clase.
	 * @param name Nombre del personaje.
	 * @param hp Puntos de vida del personaje.
	 * @param mp Puntos de maná del personaje.
	 */
	public BasicCharacter(String name, int hp, int mp) {

		this.name = name;
		this.hp = hp;
		this.mp = mp;
		this.maxHp = hp;
		this.maxMp = mp;
	}

	/**
	 * Método que realiza un ataque.
	 * @return Mensaje del ataque.
	 */
	public String takeDamage(int damage) {

		hp -= damage;
		String message = String.format("¡%s recibe %d puntos de daño!\n", name, damage);
		if (isDead()) message += String.format("¡%s ha sido derrotado!\n", name);
		return message;
	}

	/**
	 * Método que cura al personaje.
	 * @param amount Cantidad de puntos de vida a curar.
	 */
	public void heal(int amount) {

		hp += amount;
		if (hp > maxHp) hp = maxHp;
	}

	/**
	 * Método que recupera maná.
	 * @param amount Cantidad de maná a recuperar.
	 */
	public void recoverMp(int amount) {

		mp += amount;
		if (mp > maxMp) mp = maxMp;
	}

	/**
	 * Método que gasta maná.
	 * @param amount Cantidad de maná a gastar.
	 */
	public void useMp(int amount) {

		mp -= amount;
	}

	/**
	 * Método que comprueba si el personaje está muerto.
	 * @return true si el personaje está muerto, false en caso contrario.
	 */
	public boolean isDead() {

		return hp <= 0;
	}

	// Getters
	public String getName() {

		return name;
	}

	public int getHp() {

		return hp;
	}

	public int getMp() {

		return mp;
	}

	public int getMaxHp() {

		return maxHp;
	}

	public int getMaxMp() {

		return maxMp;
	}
}
```

## Player

De esta primera clase deberemos de crear una clase hija llamada "Player con lo siguiente":

### Atributos

- **instance**
    - Un atributo de tipo Player que será el único objeto de la clase.
- **strength**
    - La fuerza del personaje
- **defense**
    - La defensa del personaje
- **intelligence**
    - La inteligencia del personaje
- **dexterity**
    - La destreza del personaje
- **luck**
    - La suerte del personaje
- **resistance**
    - La resistencia del personaje
- **speed**
    - La velocidad del personaje
- **level**
    - El nivel actual del personaje
- **experience**
    - La experiencia del personaje
- **gold**
    - El oro del personaje
- **inventory**
    - El inventario del personaje
- **weapon**
    - El arma del personaje
- **headArmor**
    - La armadura de la cabeza del personaje
- **chestArmor**
    - La armadura del pecho del personaje
- **legArmor**
    - La armadura de las piernas del personaje
- **footArmor**
    - La armadura de los pies del personaje
- **handArmor**
    - La armadura de las manos del personaje
- **skillMap**
    - Un mapa que contendrá las habilidades del personaje

### Funciones

- **Constructor**
    - Este constructor deberá de recibir el nombre del personaje.
    - Inicializará los valores de hp y mp con valores por defecto.
    - Inicializará los valores de maxHp y maxMp con los valores de hp y mp respectivamente.
    - Inicializará los valores de strength, defense, intelligence, dexterity, luck, resistance, speed, level,
      experience,
      gold, inventory, weapon, headArmor, chestArmor, legArmor, footArmor, handArmor y skillMap con valores por defecto.
    - Asignará aleatoriamente los valores de strength, defense, intelligence, dexterity, luck, resistance y speed.
    - Asignará el valor de level a 1.
    - Asignará el valor de experience a 0.
    - Asignará el valor de gold a 0.
    - Asignará el valor de inventory a un nuevo ArrayList.
    - Asignará el valor de weapon, headArmor, chestArmor, legArmor, footArmor y handArmor a null.
    - Asignará el valor de skillMap a un nuevo HashMap.
    - Agregará la habilidad "Ataque Furia" al mapa de habilidades.
    - Agregará la habilidad "Curación Básica" al mapa de habilidades.
- **getInstance**
    - Esta función permitirá obtener la instancia del personaje.
    - Si la instancia no ha sido creada, se creará una nueva instancia.
    - Si la instancia ya ha sido creada, se devolverá la instancia existente.
- **getInstance(name)**
    - Esta función permitirán obtener la instancia de un nuevo personaje pasando el nombre del mismo.
    - Si la instancia no ha sido creada, se creará una nueva instancia con los valores dados.
    - Si la instancia ya ha sido creada, se devolverá la instancia existente.
- **setInstance**
    - Esta función permitirá establecer la instancia del personaje.
- **randomizeStats**
    - Esta función permitirá asignar aleatoriamente los valores de strength, defense, intelligence, dexterity, luck,
      resistance
      y speed.
- **equipWeapon**
    - Esta función permitirá equipar un arma al personaje.
    - Recibirá un objeto de tipo Weapon que será el arma a equipar.
    - Asignará el valor de weapon al arma recibida.
- **equipArmor**
    - Esta función permitirá equipar una armadura al personaje.
    - Recibirá un objeto de tipo Armor que será la armadura a equipar.
    - Dependiendo del tipo de armadura, asignará el valor de headArmor, chestArmor, legArmor, footArmor o handArmor a la
      armadura recibida.
- **attack**
    - Esta función permitirá al personaje atacar a un enemigo.
    - Recibirá un objeto de tipo BasicCharacter que será el enemigo a atacar.
    - Realizará un ataque al enemigo.
- **getRewards**
    - Esta función permitirá al personaje recibir una recompensa.
    - Recibirá un objeto de tipo Item que será la recompensa a recibir.
    - Añadirá la experiencia y el oro de la recompensa a los valores de experience y gold respectivamente.
- **levelUp**
    - Esta función permitirá al personaje subir de nivel.
    - Aumentará el valor de level en 1.
    - Aumentará los valores de strength, defense, intelligence, dexterity, luck, resistance y speed en 1.
    - Aumentará los valores de maxHp y maxMp en 10.
    - Añadirá la habilidad "Ataque Furia" al mapa de habilidades.
    - Añadirá la habilidad "Curación Básica" al mapa de habilidades.
- **getActualMp**
    - Esta función permitirá obtener la magia actual del personaje.
    - Devolverá un String con el valor de mp en formato "%d/%d".
- **getActualHp**
    - Esta función permitirá obtener la vida actual del personaje.
    - Devolverá un String con el valor de hp en formato "%d/%d".
- **getWeaponStat**
    - Esta función permitirá obtener las estadísticas del arma del personaje.
    - Devolverá un entero que será la suma de las estadísticas del arma.
- **getArmorStat**
    - Esta función permitirá obtener las estadísticas de la armadura del personaje.
    - Devolverá un entero que será la suma de las estadísticas de la armadura.
- **tryToFlee**
    - Esta función permitirá al personaje intentar huir de un combate.
    - Mostrará un mensaje diciendo que el personaje ha huido.
- **getTotalAttack**
    - Esta función permitirá obtener el ataque total del personaje.
    - Devolverá un entero que será la suma de la fuerza del personaje y las estadísticas del arma y la armadura.
- **getTotalDefense**
    - Esta función permitirá obtener la defensa total del personaje.
    - Devolverá un entero que será la suma de la defensa del personaje y las estadísticas del arma y la armadura.
- **getTotalIntelligence**
    - Esta función permitirá obtener la inteligencia total del personaje.
    - Devolverá un entero que será la suma de la inteligencia del personaje y las estadísticas del arma y la armadura.
- **getTotalDexterity**
    - Esta función permitirá obtener la destreza total del personaje.
    - Devolverá un entero que será la suma de la destreza del personaje y las estadísticas del arma y la armadura.
- **getTotalLuck**
    - Esta función permitirá obtener la suerte total del personaje.
    - Devolverá un entero que será la suma de la suerte del personaje y las estadísticas del arma y la armadura.
- **getTotalResistance**
    - Esta función permitirá obtener la resistencia total del personaje.
    - Devolverá un entero que será la suma de la resistencia del personaje y las estadísticas del arma y la armadura.
- **getTotalSpeed**
    - Esta función permitirá obtener la velocidad total del personaje.
    - Devolverá un entero que será la suma de la velocidad del personaje y las estadísticas del arma y la armadura.
- **getDisplayAttack**
    - Esta función permitirá obtener el ataque del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalAttack en formato "FUE: %d" ó "FUE: %d (+ %d)".
- **getDisplayDefense**
    - Esta función permitirá obtener la defensa del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalDefense en formato "DEF: %d" ó "DEF: %d (+ %d)".
- **getDisplayIntelligence**
    - Esta función permitirá obtener la inteligencia del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalIntelligence en formato "INT: %d" ó "INT: %d (+ %d)".
- **getDisplayDexterity**
    - Esta función permitirá obtener la destreza del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalDexterity en formato "DES: %d" ó "DES: %d (+ %d)".
- **getDisplayLuck**
    - Esta función permitirá obtener la suerte del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalLuck en formato "SUE: %d" ó "SUE: %d (+ %d)".
- **getDisplayResistance**
    - Esta función permitirá obtener la resistencia del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalResistance en formato "RES: %d" ó "RES: %d (+ %d)".
- **getDisplaySpeed**
    - Esta función permitirá obtener la velocidad del personaje en formato de mensaje.
    - Devolverá un String con el valor de getTotalSpeed en formato "VEL: %d" ó "VEL: %d (+ %d)".
- **takeDamage**
    - Esta función permitirá al personaje recibir daño.
    - Recibirá un valor entero que representará el daño recibido.
    - Restará el valor recibido a la vida del personaje.
    - Si la vida del personaje es menor o igual a 0, se mostrará un mensaje diciendo que el personaje ha muerto.
- **levelUp**
    - Esta función permitirá al personaje subir de nivel.
    - Aumentará el valor de level en 1.
    - Aumentará los valores de maxHp y maxMp en 10.
    - Asignará aleatoriamente 10 puntos a los valores de strength, defense, intelligence, dexterity, luck, resistance y
      speed.
- **gainExperience**
    - Esta función permitirá al personaje ganar experiencia.
    - Recibirá un valor entero que representará la experiencia ganada.
    - Aumentará el valor de experience en el valor recibido.
- **gainGold**
    - Esta función permitirá al personaje ganar oro.
    - Recibirá un valor entero que representará el oro ganado.
    - Aumentará el valor de gold en el valor recibido.
- **printDeath**
    - Esta función permitirá mostrar un mensaje de muerte.
- **printGold**
    - Esta función permitirá mostrar un mensaje de oro ganado.
- **printExperience**
    - Esta función permitirá mostrar un mensaje de experiencia ganada.
- **getters**
    - Se deberán de crear los getters necesarios para acceder a los valores de los atríbutos del personaje.
- **getImage**
    - Esta función permitirá obtener la imagen del personaje.
    - Devolverá un objeto de tipo Image que será la imagen del personaje.
    - Si la imagen no ha sido cargada, se cargará la imagen del personaje.
    - Si la imagen ya ha sido cargada, se devolverá la imagen existente.
    - La imagen del personaje será un archivo llamado "player.png" que se encontrará en la carpeta "img/player".
    - **NOTA:** La carpeta "img/player" deberá de ser creada en la carpeta del proyecto.

Veamos un ejemplo de como sería esta clase:

```java
package player;

import characters.BasicCharacter;
import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
import gui.exceptions.PlayerDeathException;
import gui.panels.DialogPanel;
import gui.panels.StatusPanel;
import items.armors.Armor;
import items.weapons.Weapon;
import org.jetbrains.annotations.NotNull;
import player.skills.BasicHeal;
import player.skills.FuryAttack;
import player.skills.Skill;
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
	private final Map<String, Skill> skillMap;

	public static Player getInstance(String name) {

		if (instance == null) {

			instance = new Player(name);
		}
		return instance;
	}

	public static synchronized Player getInstance() {

		return instance;
	}

	public static void setInstance(Player player) {

		instance = player;
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
		randomizeStats(25);
		inventory = new Inventory();
		skillMap = new HashMap<>();
		skillMap.put(BasicHeal.NAME, BasicHeal.getInstance());
		skillMap.put(FuryAttack.NAME, FuryAttack.getInstance());
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

		switch (armor.getArmorType()) {
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

	public void attack(@NotNull Enemy enemy) throws PlayerDeathException, EnemyDeadException {

		if (!isDead()) {

			DialogPanel.getInstance().addText(String.format("%s", enemy.takeDamage(this)));
			if (enemy.isDead()) getRewards(enemy);
		} else {
			throw new PlayerDeathException();
		}
	}

	public void getRewards(@NotNull Enemy enemy) throws EnemyDeadException {

		String message = gainExperience(enemy.getExperience());
		message += gainGold(enemy.getGold());
		DialogPanel.getInstance().addText(message);
		enemy.dropItem(this);
		StatusPanel.getInstance(0).update();
		throw new EnemyDeadException();
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

	public void tryToFlee() throws EnemyDeadException {

		if (Randomized.randomizeNumber(1, 100) <= 50) {

			DialogPanel.getInstance().addText("¡Has huido!\n");
			throw new EnemyDeadException();
		} else {
			DialogPanel.getInstance().addText("¡No has podido huir!\n");
		}
	}

	public String getDisplayAttack() {

		int plusAttack = getTotalAttack();
		return plusAttack == strength ? String.format("FUE: %d", strength) :
				String.format("FUE: %d (+%d)", getStrength(), plusAttack);
	}

	private int getTotalAttack() {

		int plusAttack = 0;
		plusAttack += getWeaponStat(weapon, Stats.ATTACK);
		plusAttack += getArmorStat(headArmor, Stats.ATTACK);
		plusAttack += getArmorStat(chestArmor, Stats.ATTACK);
		plusAttack += getArmorStat(legArmor, Stats.ATTACK);
		plusAttack += getArmorStat(footArmor, Stats.ATTACK);
		plusAttack += getArmorStat(handArmor, Stats.ATTACK);
		return plusAttack > 0 ? strength + plusAttack : strength;
	}

	public String getDisplayDefense() {

		int plusDefense = getTotalDefense();
		return plusDefense == defense ? String.format("DEF: %d", defense) :
				String.format("DEF: %d (+%d)", getDefense(), plusDefense);
	}

	private int getTotalDefense() {

		int plusDefense = 0;
		plusDefense += getArmorStat(headArmor, Stats.DEFENSE);
		plusDefense += getArmorStat(chestArmor, Stats.DEFENSE);
		plusDefense += getArmorStat(legArmor, Stats.DEFENSE);
		plusDefense += getArmorStat(footArmor, Stats.DEFENSE);
		plusDefense += getArmorStat(handArmor, Stats.DEFENSE);
		return plusDefense > 0 ? defense + plusDefense : defense;
	}

	public String getDisplayIntelligence() {

		int plusIntelligence = getTotalIntelligence();
		return plusIntelligence == intelligence ? String.format("INT: %d", intelligence) :
				String.format("INT: %d (+%d)", intelligence, plusIntelligence);
	}

	private int getTotalIntelligence() {

		int plusIntelligence = 0;
		plusIntelligence += getArmorStat(headArmor, Stats.INTELLIGENCE);
		plusIntelligence += getArmorStat(chestArmor, Stats.INTELLIGENCE);
		plusIntelligence += getArmorStat(legArmor, Stats.INTELLIGENCE);
		plusIntelligence += getArmorStat(footArmor, Stats.INTELLIGENCE);
		plusIntelligence += getArmorStat(handArmor, Stats.INTELLIGENCE);
		return plusIntelligence > 0 ? intelligence + plusIntelligence : intelligence;
	}

	public String getDisplayDexterity() {

		int plusDexterity = getTotalDexterity();
		return plusDexterity == dexterity ? String.format("DES: %d", dexterity) :
				String.format("DES: %d (+%d)", dexterity, plusDexterity);

	}

	private int getTotalDexterity() {

		int plusDexterity = 0;
		plusDexterity += getArmorStat(headArmor, Stats.DEXTERITY);
		plusDexterity += getArmorStat(chestArmor, Stats.DEXTERITY);
		plusDexterity += getArmorStat(legArmor, Stats.DEXTERITY);
		plusDexterity += getArmorStat(footArmor, Stats.DEXTERITY);
		plusDexterity += getArmorStat(handArmor, Stats.DEXTERITY);
		return plusDexterity > 0 ? dexterity + plusDexterity : dexterity;
	}

	public String getDisplayLuck() {

		int plusLuck = getTotalLuck();
		return plusLuck == luck ? String.format("SUE: %d", luck) :
				String.format("SUE: %d (+%d)", luck, plusLuck);
	}

	private int getTotalLuck() {

		int plusLuck = 0;
		plusLuck += getArmorStat(headArmor, Stats.LUCK);
		plusLuck += getArmorStat(chestArmor, Stats.LUCK);
		plusLuck += getArmorStat(legArmor, Stats.LUCK);
		plusLuck += getArmorStat(footArmor, Stats.LUCK);
		plusLuck += getArmorStat(handArmor, Stats.LUCK);
		return plusLuck > 0 ? luck + plusLuck : luck;
	}

	public String getDisplayResistance() {

		int plusResistance = getTotalResistance();
		return plusResistance == resistance ? String.format("RES: %d", resistance) :
				String.format("RES: %d (+%d)", resistance, plusResistance);
	}

	private int getTotalResistance() {

		int plusResistance = 0;
		plusResistance += getArmorStat(headArmor, Stats.RESISTANCE);
		plusResistance += getArmorStat(chestArmor, Stats.RESISTANCE);
		plusResistance += getArmorStat(legArmor, Stats.RESISTANCE);
		plusResistance += getArmorStat(footArmor, Stats.RESISTANCE);
		plusResistance += getArmorStat(handArmor, Stats.RESISTANCE);
		return plusResistance > 0 ? resistance + plusResistance : resistance;
	}

	public String getDisplaySpeed() {

		int plusSpeed = getTotalSpeed();
		return plusSpeed == speed ? String.format("VEL: %d", speed) :
				String.format("VEL: %d (+%d)", speed, plusSpeed);
	}

	private int getTotalSpeed() {

		int plusSpeed = 0;
		plusSpeed += getArmorStat(headArmor, Stats.SPEED);
		plusSpeed += getArmorStat(chestArmor, Stats.SPEED);
		plusSpeed += getArmorStat(legArmor, Stats.SPEED);
		plusSpeed += getArmorStat(footArmor, Stats.SPEED);
		plusSpeed += getArmorStat(handArmor, Stats.SPEED);
		return plusSpeed > 0 ? speed + plusSpeed : speed;
	}

	public String takeDamage(int damage) {

		damage -= getTotalDefense();
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
		message += levelUp();
		return message;
	}

	private String levelUp() {

		if (this.experience >= level * 20) {

			level++;
			maxHp += 10;
			maxMp += 10;
			hp = maxHp;
			mp = maxMp;
			strength += Randomized.randomizeNumber(0, 3);
			defense += Randomized.randomizeNumber(0, 3);
			speed += Randomized.randomizeNumber(0, 3);
			randomizeStats(10);
			StatusPanel.getInstance(0).update();
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

	public String printGold(int gold) {

		return String.format("Has ganado %d monedas de oro!\n", gold);
	}

	public String printExperience(int experience) {

		return String.format("Has ganado %d puntos de experiencia!\n", experience);
	}

	public Image getImage() {

		return ImageManager.getInstance().getImage("player",
				new ImageIcon("img\\player\\player.png").getImage());
	}
}
```

> [!important]
> Recuerda que para nuestro RPG, usaremos enteros positivos y sin punto decimal.

> [!warning]
> Es importante crear adecuadamente los nuevos stats colocando tanto su documentación como sus funciones de acceso
> adecuadas.

> [!warning]
> Es importante mencionar que en este y el resto de ejemplos, cuando hablemos de imágenes, se usará el nombre de la
> imagen en Windows, por ejemplo "carpeta\\subCarpeta\\archivo.png", sin embargo, si trabajas en MacOS, el nombre del
> archivo deberá de cambiar a "carpeta/subCarpeta/archivo.png", esto debido a la forma en la que trabaja MacOS.
