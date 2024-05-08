---
icon: floppy-disk
title: Actualizando clases
description: Actualización de clases y métodos en el proyecto.
---

# Actualizando clases

En esta sección veremos cómo actualizar las clases y métodos de nuestro proyecto, ya sea para corregir errores, mejorar
la eficiencia o añadir nuevas funcionalidades.

## Actualización de clases

Para actualizar una clase, primero debemos identificar el archivo que contiene la clase que queremos modificar. Una vez
localizado, abrimos el archivo y buscamos la definición de la clase. A continuación, realizamos los cambios necesarios y
guardamos el archivo.

### AttackButton.java

```java
package gui.buttons;

import enemies.Enemy;
import gui.events.AttackButtonListener;
import player.Player;

public class AttackButton extends ActionButton {

	// Constructor que recibe un enemigo como parámetro
	public AttackButton(Enemy enemy, Player player) {

		super("Atacar");
		// Asignar la acción de atacar al enemigo
		addActionListener(new AttackButtonListener(enemy, player));
	}
}
```

### AttackButtonListener.java

```java
package gui.events;

import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
import gui.exceptions.PlayerDeadException;
import gui.windows.GameWindow;
import gui.panels.*;
import player.Player;
import util.enemies.EnemyFactory;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * Clase que implementa la interfaz ActionListener para manejar los eventos de los botones de ataque.
 */
public class AttackButtonListener implements ActionListener {

	// Enemigo al que se le va a atacar
	private Enemy enemy;
	private final Player player;

	// Constructor que recibe un enemigo como parámetro
	public AttackButtonListener(Enemy enemy, Player player) {

		this.enemy = enemy;
		this.player = player;
	}

	// Método que se ejecuta al presionar el botón de ataque
	@Override
	public void actionPerformed(ActionEvent e) {

		// Obtenemos las instancias de los paneles necesarios
		DialogPanel dialogPanel = DialogPanel.getInstance();
		// Intentamos atacar al enemigo
		try {
			// Si la velocidad del jugador es mayor a la velocidad ajustada del enemigo
			if (player.getSpeed() > enemy.getAdjustedSpeed()) {
				// Si el jugador está muerto, lanzamos una excepción
				if (player.isDead()) throw new PlayerDeadException();
				// Si no, atacamos al enemigo
				player.attack(enemy);
				// Si el enemigo no está muerto
				if (!enemy.isDead()) {
					// El enemigo nos ataca
					enemy.attack();
					// Si escapa por una habilidad, para el sistema está muerto
					if (enemy.isDead()) throw new EnemyDeadException();
				} else throw new EnemyDeadException();
			} else {
				// Si el enemigo no está muerto, nos ataca
				enemy.attack();
				// Si escapa por una habilidad, para el sistema está muerto
				if (enemy.isDead()) throw new EnemyDeadException();
				// Atacamos al enemigo
				player.attack(enemy);
			}
			// Actualizamos los paneles
			updatePanels(player);
		} catch (EnemyDeadException ex) {
			// Si el enemigo está muerto o escapo por una habilidad
			// Creamos un nuevo enemigo
			enemy = EnemyFactory.generateRegularEnemy(player);
			// Asignamos el nuevo enemigo al panel de juego
			GameWindow.getInstance().setEnemy(enemy);
			// Actualizamos los paneles
			updatePanels(player);
		} catch (PlayerDeadException ex) {
			// Si el jugador está muerto, mostramos un mensaje de consolación
			dialogPanel.addText("¡Quizás deberías entrenar más duro!\n");
			// Revivimos al jugador
			player.revive();
			// Mostramos un mensaje de que el jugador fue revivido
			dialogPanel.addText("¡Has sido revivido!\n");
			// Creamos un nuevo enemigo
			enemy = EnemyFactory.generateRegularEnemy(player);
			// Asignamos el nuevo enemigo al panel de juego
			GameWindow.getInstance().setEnemy(enemy);
			// Actualizamos los paneles
			updatePanels(player);
		}
	}

	/**
	 * Método que actualiza los paneles de la interfaz gráfica.
	 *
	 * @param player Jugador actual
	 */
	private void updatePanels(Player player) {

		// Actualizamos los paneles
		GameWindow.getInstance().repaint();
		StatusPanel.getInstance(0, player).update();
		MainPanel.getInstance(enemy, player).update(enemy);
		PlayerPanel.getInstance(player).update();
		EnemyPanel.getInstance(enemy).setEnemy(enemy);
		EnemyPanel.getInstance(enemy).update();
		InventoryPanel.getInstance(2, player).update();
	}
}
```

### BasicHeal.java

```java
package player.skills;

import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
import gui.windows.GameWindow;
import gui.panels.DialogPanel;
import org.jetbrains.annotations.NotNull;
import player.Player;
import player.Stats;

import java.io.Serializable;

public class BasicHeal extends Skill implements Serializable {

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
	public void skillAction() {

		//Primero debo determinar quien es más rápido
		Player player = Player.getInstance();
		Enemy enemy = GameWindow.getInstance().getEnemy();
		//Si el jugador es más rápido, entonces se cura y el enemigo ataca
		if (player.getSpeed() >= enemy.getStats().get(Stats.SPEED)) {

			heal(player);
			try {
				enemy.attack();
			} catch (EnemyDeadException e) {
				throw new RuntimeException(e);
			}
			updatePanels(player);
		} else {
			//Si el enemigo es más rápido, entonces el enemigo ataca y el jugador se cura
			try {
				enemy.attack();
			} catch (EnemyDeadException e) {
				throw new RuntimeException(e);
			}
			heal(player);
			updatePanels(player);
		}
	}

	private void heal(@NotNull Player player) {

		player.heal(8);
		player.useMp(manaCost);
		String message = String.format("¡%s usa curación básica y recupera 8 puntos de vida!", player.getName());
		DialogPanel.getInstance().addText(message);
	}
}
```

### BattlePanel.java

```java
package gui.panels;

import enemies.Enemy;
import gui.windows.GameWindow;
import gui.buttons.AttackButton;
import gui.buttons.ExitButton;
import gui.buttons.FleeButton;
import gui.buttons.SaveButton;
import gui.events.AttackButtonListener;
import player.Player;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class BattlePanel extends BackGroundPanel {

	private static BattlePanel instance;
	private Enemy enemy;
	private Player player;
	private final ActionsPanel actionsPanel;
	private final int tabIndex;
	private JPanel mainPanel;
	private JPanel skillsPanel;
	private JButton attackButton;
	private JButton fleeButton;
	private JButton saveButton;
	private JButton exitButton;
	private final int slot;

	public static BattlePanel getInstance(int tabIndex, Enemy enemy, Player player, int slot) {

		if (instance == null) {

			instance = new BattlePanel(tabIndex, enemy, player, slot);
		}
		return instance;
	}

	/**
	 * Constructor de la clase
	 *
	 * @param tabIndex índice de la pestaña
	 */
	private BattlePanel(int tabIndex, Enemy enemy, Player player, int slot) {

		super(ImageManager.getInstance().getImage("battlePanel"), new Dimension(1019, 342));
		this.slot = slot;
		this.enemy = enemy;
		this.player=player;
		this.tabIndex = tabIndex;
		this.actionsPanel = ActionsPanel.getInstance();
		Dimension size = new Dimension(1019, 342);
		setPreferredSize(size);
		setMinimumSize(size);
		setMaximumSize(size);
		setSize(size);
		add(mainPanel);
		setOpaque(false);
		setBackground(null);
		setMixingCutoutShape(new Rectangle(0, 0, 0, 0));
		setName("Batalla");
	}

	private boolean isActive() {

		return actionsPanel.getSelectedIndex() == tabIndex;
	}

	private void createUIComponents() {

		attackButton = new AttackButton(enemy, player);
		fleeButton = new FleeButton(enemy);
		saveButton = new SaveButton(getSlot(), player);
		exitButton = new ExitButton();
		skillsPanel = new SkillPanel(player);
	}

	public Enemy getEnemy() {

		return enemy;
	}

	public void setEnemy(Enemy enemy) {

		this.enemy = enemy;
		attackButton.removeActionListener(attackButton.getActionListeners()[0]);
		attackButton.addActionListener(new AttackButtonListener(enemy, player));
	}

	public int getSlot() {

		return slot;
	}
}
```

### BuyButtonListener.java

```java
package gui.events;

import gui.panels.DialogPanel;
import gui.panels.InventoryPanel;
import gui.panels.PlayerPanel;
import gui.panels.StatusPanel;
import items.Item;
import player.Player;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class BuyButtonListener implements ActionListener {

	private final Item item;

	public BuyButtonListener(Item item) {

		this.item = item;
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		Player player = Player.getInstance();
		if (player.getGold() >= item.getPrice()) {
			player.getInventory().addItem(item);
			player.setGold(player.getGold() - item.getPrice());
			DialogPanel.getInstance().addText(
					String.format("Compraste %s por %d.\n", item.getName(), item.getPrice()));
		} else {
			DialogPanel.getInstance().addText("No tienes suficiente oro para comprar este objeto.\n");
		}
		updatePanels();
	}

	/**
	 * Método que actualiza los paneles de la interfaz gráfica.
	 */
	private void updatePanels() {

		Player player = Player.getInstance();
		// Actualizamos los paneles
		StatusPanel.getInstance(0, player).update();
		PlayerPanel.getInstance(player).update();
		InventoryPanel.getInstance(2, player).update();
	}
}
```

### EnemyFactory.java

```java
package util.enemies;

import enemies.Enemy;
import enemies.bats.TinyBat;
import gui.panels.DialogPanel;
import org.reflections.Reflections;
import org.reflections.scanners.SubTypesScanner;
import org.reflections.scanners.TypeAnnotationsScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import player.Player;
import util.annotations.BossEnemy;
import util.annotations.RegularEnemy;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

public class EnemyFactory {

	private static final Random random = new Random();

	/**
	 * Genera un enemigo regular aleatorio
	 *
	 * @return un enemigo regular
	 */
	public static Enemy generateRegularEnemy(Player player) {

		// Reflections es una librería que permite obtener información sobre las clases de un paquete
		Reflections reflections = new Reflections(new ConfigurationBuilder()
				.setUrls(ClasspathHelper.forJavaClassPath())
				.setScanners(new SubTypesScanner(), new TypeAnnotationsScanner()));
		// Obtiene todas las clases que tienen la anotación RegularEnemy
		Set<Class<?>> classes = reflections.getTypesAnnotatedWith(RegularEnemy.class);
		// Convierte el conjunto de clases a una lista
		List<Class<?>> classList = new ArrayList<>(classes);
		// Obtiene una clase aleatoria de la lista
		Class<?> claseEnemyRegular = classList.get(random.nextInt(classList.size()));
		// Intenta crear una instancia de la clase obtenida
		try {

			Enemy enemy = (Enemy) claseEnemyRegular.getDeclaredConstructor(Player.class).newInstance(player);
			DialogPanel.getInstance().addText("¡Un " + enemy.getName() + " aparece frente a ti!\n");
			return enemy;
		} catch (Exception e) {

			return new TinyBat(player);
		}
	}

	public static Enemy generateBossEnemy(Player player) {

		Reflections reflections = new Reflections(new ConfigurationBuilder()
				.setUrls(ClasspathHelper.forJavaClassPath())
				.setScanners(new SubTypesScanner(), new TypeAnnotationsScanner()));

		Set<Class<?>> classes = reflections.getTypesAnnotatedWith(BossEnemy.class);
		List<Class<?>> classList = new ArrayList<>(classes);

		Class<?> claseJefe = classList.get(random.nextInt(classList.size()));

		try {
			return (Enemy) claseJefe.getDeclaredConstructor(Player.class).newInstance(player);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
```

### EquipButtonListener.java

```java
package gui.events;

import gui.panels.InventoryPanel;
import gui.panels.PlayerPanel;
import gui.panels.StatusPanel;
import items.Item;
import items.armors.Armor;
import items.weapons.Weapon;
import player.Player;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class EquipButtonListener implements ActionListener {

	private final Item item;

	public EquipButtonListener(Item item) {

		this.item = item;
	}

	@Override
	public void actionPerformed(ActionEvent evt) {

		Player player = Player.getInstance();
		// Equipamos el item
		switch (item.getType()) {
			case WEAPON -> equipWeapon((Weapon) item);
			case ARMOR -> equipArmor((Armor) item);
		}
		// Actualizamos los paneles
		updatePanels();
	}

	private void equipWeapon(Weapon weapon) {

		Player player = Player.getInstance();
		Weapon equippedWeapon = player.getWeapon();
		// La eliminamos del inventario
		player.getInventory().removeItem(weapon);
		// Si el jugador ya tiene un arma equipada
		if (equippedWeapon != null) {
			// La añadimos al inventario
			player.getInventory().addItem(equippedWeapon);
		}
		// Equipamos el arma
		player.equipWeapon(weapon);
	}

	private void equipArmor(Armor armor) {

		Player player = Player.getInstance();
		Armor equippedArmor =
				switch (armor.getArmorType()) {
					case HEAD -> player.getHeadArmor();
					case CHEST -> player.getChestArmor();
					case LEGS -> player.getLegArmor();
					case HANDS -> player.getHandArmor();
					case FEET -> player.getFootArmor();
					default -> null;
				};
		// La eliminamos del inventario
		player.getInventory().removeItem(armor);
		// Si el jugador ya tiene una armadura equipada
		if (equippedArmor != null) {
			// La añadimos al inventario
			player.getInventory().addItem(equippedArmor);
		}
		// Equipamos la armadura
		player.equipArmor(armor);
	}

	/**
	 * Método que actualiza los paneles de la interfaz gráfica.
	 */
	private void updatePanels() {

		Player player = Player.getInstance();
		// Actualizamos los paneles
		StatusPanel.getInstance(0, player).update();
		PlayerPanel.getInstance(player).update();
		InventoryPanel.getInstance(2, player).update();
	}
}
```

### FleeButtonListener.java

```java
package gui.events;

import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
import gui.windows.GameWindow;
import gui.panels.EnemyPanel;
import gui.panels.MainPanel;
import gui.panels.PlayerPanel;
import gui.panels.StatusPanel;
import player.Player;
import util.enemies.EnemyFactory;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * Clase que implementa el comportamiento del botón de huir.
 */
public class FleeButtonListener implements ActionListener {

	// Enemigo al que se le aplicará el comportamiento de huir.
	private Enemy enemy;

	/**
	 * Constructor de la clase.
	 *
	 * @param enemy Enemigo al que se le aplicará el comportamiento de huir.
	 */
	public FleeButtonListener(Enemy enemy) {

		this.enemy = enemy;
	}

	/**
	 * Método que se ejecuta al hacer clic en el botón de huir.
	 *
	 * @param e Evento de acción.
	 */
	@Override
	public void actionPerformed(ActionEvent e) {
		// Se obtiene la instancia del jugador.
		Player player = Player.getInstance();
		// Se intenta huir del enemigo.
		try {
			// Si la velocidad del jugador es mayor que la velocidad ajustada del enemigo,
			// el jugador tratará de huir.
			if (player.getSpeed() > enemy.getAdjustedSpeed()) {
				// Se intenta huir.
				player.tryToFlee();
				// En caso de no poder huir, es el enemigo quien atacará.
				enemy.attack();
				// Si el enemigo muere o escapa se lanza una excepción.
				if (enemy.isDead()) throw new EnemyDeadException();
			} else {
				// En caso contrario el enemigo atacará y el jugador tratará de huir.
				enemy.attack();
				// Si el enemigo muere o escapa se lanza una excepción.
				if (enemy.isDead()) throw new EnemyDeadException();
				// Se intenta huir.
				player.tryToFlee();
			}
			// Se actualizan los paneles.
			updatePanels(player);
		} catch (EnemyDeadException ex) {
			// Si el enemigo muere o huye haremos esto.
			// Se genera un nuevo enemigo.
			enemy = EnemyFactory.generateRegularEnemy(player);
			// Se actualiza la instancia del enemigo en la ventana de juego.
			GameWindow.getInstance().setEnemy(enemy);
			// Se actualizan los paneles.
			updatePanels(player);
		}
	}

	private void updatePanels(Player player) {

		GameWindow.getInstance().repaint();
		StatusPanel.getInstance(0, player).update();
		MainPanel.getInstance(enemy, player).update(enemy);
		PlayerPanel.getInstance(player).update();
		EnemyPanel.getInstance(enemy).setEnemy(enemy);
		EnemyPanel.getInstance(enemy).update();
	}
}
```

### FuryAttack.java

```java
package player.skills;

import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
import gui.exceptions.PlayerDeadException;
import gui.windows.GameWindow;
import gui.panels.DialogPanel;
import player.Player;
import player.Stats;
import util.enemies.EnemyFactory;

import java.io.Serializable;

public class FuryAttack extends Skill implements Serializable {

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

		super(NAME, "Ataque al enemigo con +5 puntos de daño", 5, 3);
	}

	private void attack(Player player, Enemy enemy) throws EnemyDeadException {

		int damage = player.getDamage() + 5;
		player.useMp(manaCost);
		DialogPanel.getInstance().addText(
				String.format("¡%s ataca a %s con %d puntos de daño!\n", player.getName(), enemy.getName(), damage));
		DialogPanel.getInstance().addText(enemy.takeDamage(damage - enemy.getAdjustedDefense()));
		if (enemy.isDead()) {
			player.getRewards(enemy);
		}
		updatePanels(player);
	}

	private void setNewEnemy(Player player) {

		// Si el enemigo está muerto o escapo por una habilidad
		// Creamos un nuevo enemigo
		Enemy enemy = GameWindow.getInstance().getEnemy();
		Enemy newEnemy = EnemyFactory.generateRegularEnemy(player);
		// Asignamos el nuevo enemigo al panel de juego
		GameWindow.getInstance().setEnemy(newEnemy);
		// Actualizamos los paneles
		updatePanels(player);
	}

	@Override
	public void skillAction() {

		Player player = Player.getInstance();
		Enemy enemy = GameWindow.getInstance().getEnemy();
		// Validamos si el jugador tiene el maná suficiente
		if (player.getMp() < manaCost) {

			DialogPanel.getInstance().addText("¡No tienes suficiente maná para realizar esta habilidad!\n");
		} else {
			//Si el jugador es más rápido, entonces se cura y el enemigo ataca
			if (player.getSpeed() >= enemy.getStats().get(Stats.SPEED)) {

				try {
					// Primero el jugador ataca
					attack(player, enemy);
					// Luego el enemigo ataca si sigue con vida
					enemy.attack();
				} catch (EnemyDeadException e) {
					// Si el enemigo muere, entonces se crea un nuevo enemigo
					setNewEnemy(player);
					updatePanels(player);
				}
				// Actualizamos los paneles
				updatePanels(player);
			} else {
				//Si el enemigo es más rápido, entonces el enemigo ataca y el jugador se cura
				try {
					enemy.attack();
				} catch (EnemyDeadException e) {
					// Si el enemigo muere, entonces se crea un nuevo enemigo
					setNewEnemy(player);
				}
				try {
					if (!player.isDead()) attack(player, enemy);
					else throw new PlayerDeadException();
				} catch (PlayerDeadException e) {
					// Si el jugador muere, mostramos un mensaje de consolación
					DialogPanel.getInstance().addText("¡Quizás deberías entrenar más duro!\n");
					// Revivimos al jugador
					player.revive();
					// Mostramos un mensaje de que el jugador fue revivido
					DialogPanel.getInstance().addText("¡Has sido revivido!\n");
					// Creamos un nuevo enemigo
					setNewEnemy(player);
					updatePanels(player);
				} catch (EnemyDeadException e) {
					// Si el enemigo muere, entonces se crea un nuevo enemigo
					setNewEnemy(player);
					updatePanels(player);
				}
			}
		}
	}
}
```

### InventoryPanel.java

```java
package gui.panels;

import gui.events.HandCursorListener;
import gui.tabs.InventoryTab;
import items.ItemType;
import player.Player;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class InventoryPanel extends JPanel {

	private static InventoryPanel instance;
	private final Image img;
	private final Player player;
	private final ActionsPanel actionsPanel;
	private final int tabIndex;
	private JPanel backgroundPanel;
	private JTabbedPane itemDisplayPanel;
	private JPanel weaponsPanel;
	private JPanel armorsPanel;
	private JPanel miscsPanel;

	public static InventoryPanel getInstance(int tabIndex, Player player) {

		if (instance == null) {

			instance = new InventoryPanel(tabIndex, player);
		}
		return instance;
	}

	@Override
	public void update(Graphics g) {

		super.update(g);
		revalidate();
		repaint();
	}

	private InventoryPanel(int tabIndex, Player player) {

		this.player = player;
		itemDisplayPanel.setUI(new InventoryTab());
		img = ImageManager.getInstance().getImage("inventoryPanel");
		this.tabIndex = tabIndex;
		this.actionsPanel = ActionsPanel.getInstance();
		Dimension size = new Dimension(1019, 342);
		setPreferredSize(size);
		setMinimumSize(size);
		setMaximumSize(size);
		setSize(size);
		add(backgroundPanel);
		setOpaque(false);
		setBackground(null);
		setMixingCutoutShape(new Rectangle(0, 0, 0, 0));
		setName("Inventario");
		itemDisplayPanel.addMouseMotionListener(new HandCursorListener(itemDisplayPanel));
	}

	/**
	 * Método que inicializa el panel
	 */
	@Override
	public void paintComponent(Graphics g) {

		super.paintComponent(g);
		Graphics2D g2d = (Graphics2D) g;
		g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g2d.drawImage(img, 0, 0, 1019, 342, null);
	}

	private void createUIComponents() {

		weaponsPanel = new ItemPanel(ItemType.WEAPON, player);
		armorsPanel = new ItemPanel(ItemType.ARMOR, player);
		miscsPanel = new ItemPanel(ItemType.MISC, player);
	}

	public void update() {

		((ItemPanel) weaponsPanel).initComponents();
		((ItemPanel) armorsPanel).initComponents();
		((ItemPanel) miscsPanel).initComponents();
	}
}
```

### ItemPanel.java

```java
package gui.panels;

import items.Item;
import items.ItemType;
import player.Inventory;
import player.Player;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class ItemPanel extends BackGroundPanel {

	protected JPanel mainPanel;
	protected JScrollPane scrollPanel;
	protected JPanel displayPanel;
	private final ItemType type;
	private Player player;

	public ItemPanel(ItemType type, Player player) {

		super(ImageManager.getInstance().getImage("skillPanel"), new Dimension(984, 286));
		this.player = player;
		this.type = type;
		add(mainPanel);
		initComponents();
	}

	public void initComponents() {

		GridBagLayout layout = new GridBagLayout();
		layout.columnWidths = new int[]{450, 450};
		displayPanel.removeAll();
		displayPanel.setLayout(layout);
		displayPanel.setOpaque(false);
		displayPanel.setBorder(BorderFactory.createEmptyBorder());
		scrollPanel.setBorder(BorderFactory.createEmptyBorder());
		scrollPanel.setOpaque(false);
		scrollPanel.getViewport().setOpaque(false);
		scrollPanel.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
		scrollPanel.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
		Inventory inventory = player.getInventory();
		switch (type) {
			case WEAPON:
				inventory.getItems().filterWeapons().forEach(this::addItem);
				break;
			case ARMOR:
				inventory.getItems().filterArmors().forEach(this::addItem);
				break;
			case MISC:
				inventory.getItems().filterMiscItems().forEach(this::addItem);
				break;
		}
		// Colocamos el scroll en la parte superior
		scrollPanel.getViewport().setViewPosition(new Point(0, 0));
	}

	protected void addItem(Item item) {

		GridBagConstraints c = new GridBagConstraints();
		c.gridx = displayPanel.getComponentCount() % 2;
		c.gridy = displayPanel.getComponentCount() / 2;
		c.fill = GridBagConstraints.CENTER;
		c.anchor = GridBagConstraints.CENTER;
		c.weightx = 1;
		c.weighty = 1;
		c.insets = new Insets(0, 0, 5, 0);
		displayPanel.add(new ItemDetail(item), c);
		displayPanel.revalidate();
		displayPanel.repaint();
	}
}
```

### MainPanel.java

```java
package gui.panels;

import enemies.Enemy;
import player.Player;
import gui.labels.SpriteLabel;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class MainPanel extends BackGroundPanel {

	private static MainPanel instance;
	private Enemy enemy;
	private final Player player;
	private JPanel mainPanel;
	private JPanel spritesPanel;
	private JPanel dialogPanel;
	private JLabel enemySprite;
	private JLabel playerSprite;

	public static MainPanel getInstance(Enemy enemy, Player player) {

		if (instance == null) {
			instance = new MainPanel(enemy, player, ImageManager.getInstance().getImage("charactersPanel"),
					new Dimension(512, 360));
		}
		return instance;
	}

	private MainPanel(Enemy enemy, Player player, Image image, Dimension dimension) {

		super(image, dimension);
		this.enemy = enemy;
		this.player=player;
		add(mainPanel);
	}

	public void update(Enemy enemy) {

		((SpriteLabel) enemySprite).updateImage(enemy.getImage());
		repaint();
	}

	private void createUIComponents() {

		dialogPanel = DialogPanel.getInstance();
		playerSprite = new SpriteLabel(player.getImage());
		enemySprite = new SpriteLabel(enemy.getImage());
	}

	public void setEnemy(Enemy enemy) {

		this.enemy = enemy;
	}

	public JPanel getSpritesPanel() {

		return spritesPanel;
	}

	public JPanel getDialogPanel() {

		return dialogPanel;
	}

	public JLabel getPlayerSprite() {

		return playerSprite;
	}
}
```

### NewGameWindow.java

```java
package gui.windows;

import gui.buttons.ExitButton;
import gui.buttons.StartButton;
import gui.labels.PortraitLabel;
import util.managers.FontManager;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class NewGameWindow extends JFrame {

	private static NewGameWindow instance;
	private final int slot;
	private JPanel backgroundPanel;
	private JButton exitButton;
	private JButton startButton;
	private JTextArea welcomeText;
	private JTextField playerName;
	private JLabel playerLabel;
	private JLabel portraitLabel;

	public static NewGameWindow getInstance(int slot) {

		if (instance == null) {
			instance = new NewGameWindow(slot);
		}
		return instance;
	}

	private NewGameWindow(int slot) {

		this.slot = slot;
		setTitle("New Game");
		add(backgroundPanel);
		pack();
		setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		setLocationRelativeTo(null);
		setResizable(false);
		setVisible(true);
		welcomeText.append("¡Bienvenido al mundo de JavaRPG!\n");
		welcomeText.append("¿Estás listo para comenzar tu aventura?\n");
		welcomeText.append("¡Elige tu nombre de jugador y comencemos!");
		welcomeText.setOpaque(false);
		welcomeText.setEditable(false);
		welcomeText.setFont(FontManager.getInstance().getFont("Standard"));
		welcomeText.setForeground(Color.WHITE);
		playerName.setFont(FontManager.getInstance().getFont("Standard"));
		playerName.setForeground(Color.WHITE);
		playerLabel.setFont(FontManager.getInstance().getFont("Standard"));
		playerLabel.setForeground(Color.WHITE);
		((StartButton) startButton).setSlot(slot);
	}

	private void createUIComponents() {

		backgroundPanel = new JPanel() {

			@Override
			public void paintComponent(Graphics g) {

				super.paintComponent(g);
				Graphics2D g2d = (Graphics2D) g;
				g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
				g2d.drawImage(ImageManager.getInstance().getImage("skillPanel"), 0, 0, null);
			}
		};
		portraitLabel = new PortraitLabel();
		startButton = new StartButton(this, slot);
		exitButton = new ExitButton();
	}

	public String getPlayerName() {

		return playerName.getText();
	}
}
```

### Player.java

```java
package player;

import characters.BasicCharacter;
import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
import gui.exceptions.PlayerDeadException;
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

/**
 * Un jugador es un personaje que puede luchar contra enemigos, ganar experiencia y oro, y equipar armas y armaduras.
 *
 * @version 1.0
 * @autor jesus
 */
public class Player extends BasicCharacter implements Serializable {

	/**
	 * La instancia de la clase jugador
	 */
	private static Player instance;
	/**
	 * La fuerza del jugador.
	 */
	private int strength;
	/**
	 * La defensa del jugador.
	 */
	private int defense;
	/**
	 * La inteligencia del jugador.
	 */
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

	/**
	 * Devuelve la instancia de la clase jugador.
	 *
	 * @return la instancia de la clase jugador
	 */
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

	/**
	 * Construye un nuevo jugador con un nombre.
	 *
	 * @param name el nombre del jugador
	 */
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

	/**
	 * Reparte aleatoriamente los puntos de fuerza, defensa, inteligencia, destreza y suerte.
	 *
	 * @param maxPoints los puntos a repartir
	 */
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

	/**
	 * El jugador equipa un arma.
	 *
	 * @param weapon el arma a equipar
	 */
	public void equipWeapon(Weapon weapon) {

		this.weapon = weapon;
	}

	/**
	 * El jugador equipa una armadura.
	 *
	 * @param armor la armadura a equipar
	 */
	public void equipArmor(Armor armor) {

		switch (armor.getArmorType()) {
			case HEAD -> headArmor = armor;
			case CHEST -> chestArmor = armor;
			case LEGS -> legArmor = armor;
			case FEET -> footArmor = armor;
			case HANDS -> handArmor = armor;
		}
	}

	/**
	 * El jugador revive con toda su salud y mana.
	 */
	public void revive() {

		hp = maxHp;
		mp = maxMp;
	}

	/**
	 * El jugador ataca a un enemigo.
	 *
	 * @param enemy el enemigo a atacar
	 *
	 * @throws PlayerDeadException si el jugador está muerto
	 */
	public void attack(@NotNull Enemy enemy) throws PlayerDeadException, EnemyDeadException {

		if (!isDead()) {

			DialogPanel.getInstance().addText(String.format("%s", enemy.takeDamage(this)));
			if (enemy.isDead()) getRewards(enemy);
		} else {
			throw new PlayerDeadException();
		}
	}

	/**
	 * El Jugador obtiene las recompensas por derrotar a un enemigo.
	 *
	 * @param enemy el enemigo derrotado
	 */
	public void getRewards(@NotNull Enemy enemy) throws EnemyDeadException {

		String message = gainExperience(enemy.getExperience());
		message += gainGold(enemy.getGold());
		DialogPanel.getInstance().addText(message);
		enemy.dropItem(this);
		StatusPanel.getInstance(0, this).update();
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

	/**
	 * Revisa si el jugador sube de nivel.
	 */
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
			StatusPanel.getInstance(0, this).update();
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

	//Getters and Setters

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

	public int getDexterity() {

		return dexterity;
	}

	public int getLuck() {

		return luck;
	}

	public Weapon getWeapon() {

		return weapon;
	}

	public int getDamage() {

		return getTotalAttack();
	}

	public String getName() {

		return super.getName();
	}

	public Inventory getInventory() {

		return inventory;
	}

	public int getSpeed() {

		return speed;
	}

	public Armor getHeadArmor() {

		return headArmor;
	}

	public Armor getChestArmor() {

		return chestArmor;
	}

	public Armor getLegArmor() {

		return legArmor;
	}

	public Armor getFootArmor() {

		return footArmor;
	}

	public Armor getHandArmor() {

		return handArmor;
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

### PlayerPanel.java

```java
package gui.panels;

import gui.labels.HpLabel;
import gui.labels.MpLabel;
import gui.labels.PortraitLabel;
import gui.labels.RedTextLabel;
import player.Player;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

/**
 * Clase que representa el panel del jugador
 */
public class PlayerPanel extends BackGroundPanel {

	private static PlayerPanel instance;
	private final Player player;
	private JPanel mainPanel;
	private JLabel portraitLabel;
	private JLabel nameLabel;
	private JLabel levelLabel;
	private JLabel hpLabel;
	private JLabel mpLabel;

	/**
	 * Método que devuelve la instancia del panel del jugador
	 *
	 * @return instancia del panel del jugador
	 */
	public static PlayerPanel getInstance(Player player) {

		if (instance == null) {

			instance = new PlayerPanel(player, ImageManager.getInstance().getImage("playerPanel"),
					new Dimension(256, 360));
		}
		return instance;
	}

	/**
	 * Constructor de la clase
	 *
	 * @param player jugador
	 */
	private PlayerPanel(Player player, Image image, Dimension dimension) {

		super(image, dimension);
		this.player = player;
		add(mainPanel);
		update();
	}

	/**
	 * Método que actualiza el panel
	 */
	public void update() {

		//Actualizamos los valores del jugador
		nameLabel.setText(player.getName());
		// Actualizamos el nivel del jugador
		levelLabel.setText(String.format("Nivel: %d", player.getLevel()));
		// Actualizamos las barras
		((HpLabel) hpLabel).updateCharacter(player);
		((MpLabel) mpLabel).updateCharacter(player);
		// Actualizamos el panel
		repaint();
	}

	/**
	 * Método que inicializa los componentes del panel
	 */
	private void createUIComponents() {

		//Agregamos la etiqueta del retrato
		portraitLabel = new PortraitLabel();
		//Agregamos la etiqueta del nombre
		nameLabel = new RedTextLabel(player.getName());
		//Agregamos la etiqueta del nivel
		levelLabel = new RedTextLabel("Nivel: " + player.getLevel());
		//Agregamos la etiqueta de los puntos de vida
		hpLabel = new HpLabel(player);
		//Agregamos la etiqueta de los puntos de maná
		mpLabel = new MpLabel(player);
	}

	//Getters

	/**
	 * Método que devuelve el jugador
	 *
	 * @return jugador
	 */
	public Player getPlayer() {

		return player;
	}

	/**
	 * Método que devuelve el panel de fondo
	 *
	 * @return panel de fondo
	 */
	public JPanel getBackgroundPanel() {

		return mainPanel;
	}

	/**
	 * Método que devuelve la etiqueta del retrato
	 *
	 * @return etiqueta del retrato
	 */
	public JLabel getPortraitLabel() {

		return portraitLabel;
	}

	/**
	 * Método que devuelve la etiqueta del nombre
	 *
	 * @return etiqueta del nombre
	 */
	public JLabel getNameLabel() {

		return nameLabel;
	}

	/**
	 * Método que devuelve la etiqueta del nivel
	 *
	 * @return etiqueta del nivel
	 */
	public JLabel getLevelLabel() {

		return levelLabel;
	}
}
```

### SaveButtonListener.java

```java
package gui.events;

import gui.panels.DialogPanel;
import gui.panels.InventoryPanel;
import gui.panels.PlayerPanel;
import gui.panels.StatusPanel;
import items.Item;
import player.Player;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SellButtonListener implements ActionListener {

	private final Item item;

	public SellButtonListener(Item item) {

		this.item = item;
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		Player player = Player.getInstance();
		player.getInventory().removeItem(item);
		player.setGold(player.getGold() + item.getPrice());
		DialogPanel.getInstance().addText(
				String.format("Vendiste %s por %d.\n", item.getName(), item.getPrice()));
		updatePanels();
	}

	/**
	 * Método que actualiza los paneles de la interfaz gráfica.
	 */
	private void updatePanels() {

		Player player = Player.getInstance();
		// Actualizamos los paneles
		StatusPanel.getInstance(0, player).update();
		PlayerPanel.getInstance(player).update();
		InventoryPanel.getInstance(2, player).update();
	}
}
```

### SaveButton.java

```java
package gui.buttons;

import gui.panels.DialogPanel;
import player.Player;
import util.managers.FileManager;

public class SaveButton extends ActionButton {

	public SaveButton(int slot, Player player) {

		super("Guardar");
		// Asignar la acción de guardar el avance del jugador en el archivo correspondiente
		addActionListener(e -> {
			// Save the game
			FileManager.saveGame(slot, player);
			// Agregamos un texto al panel de diálogo para indicar que la partida se guardó correctamente
			DialogPanel.getInstance().addText("""
					------------------------------------------------
					¡Partida guardada correctamente!
					------------------------------------------------
					""");
		});
	}
}
```

### SellButtonListener.java

```java
package gui.events;

import gui.panels.DialogPanel;
import gui.panels.InventoryPanel;
import gui.panels.PlayerPanel;
import gui.panels.StatusPanel;
import items.Item;
import player.Player;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SellButtonListener implements ActionListener {

	private final Item item;

	public SellButtonListener(Item item) {

		this.item = item;
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		Player player = Player.getInstance();
		player.getInventory().removeItem(item);
		player.setGold(player.getGold() + item.getPrice());
		DialogPanel.getInstance().addText(
				String.format("Vendiste %s por %d.\n", item.getName(), item.getPrice()));
		updatePanels();
	}

	/**
	 * Método que actualiza los paneles de la interfaz gráfica.
	 */
	private void updatePanels() {

		Player player = Player.getInstance();
		// Actualizamos los paneles
		StatusPanel.getInstance(0, player).update();
		PlayerPanel.getInstance(player).update();
		InventoryPanel.getInstance(2, player).update();
	}
}
```

### Skill.java

```java
package player.skills;

import enemies.Enemy;
import gui.windows.GameWindow;
import gui.buttons.SkillButton;
import gui.panels.*;
import player.Player;

import java.io.Serializable;

public abstract class Skill implements Serializable {

	protected String name;
	protected String description;
	protected int level;
	protected int manaCost;
	protected SkillButton button;

	public Skill(String name, String description, int level, int manaCost) {

		this.name = name;
		this.description = description;
		this.level = level;
		this.manaCost = manaCost;
		this.button = new SkillButton(this);
	}

	protected void updatePanels(Player player) {

		Enemy enemy = GameWindow.getInstance().getEnemy();
		// Actualizamos los paneles
		GameWindow.getInstance().repaint();
		StatusPanel.getInstance(0, player).update();
		MainPanel.getInstance(enemy, player).update(enemy);
		PlayerPanel.getInstance(player).update();
		EnemyPanel.getInstance(enemy).setEnemy(enemy);
		EnemyPanel.getInstance(enemy).update();
		InventoryPanel.getInstance(2, player).update();
	}

	protected abstract void skillAction();

	public void activate() {

		if (Player.getInstance().getMp() < manaCost) {

			DialogPanel.getInstance().addText("No tienes suficiente mana para usar esta habilidad\n");
		} else {
			skillAction();
		}
	}

	public String getName() {

		return name;
	}

	public void setName(String name) {

		this.name = name;
	}

	public String getDescription() {

		return description;
	}

	public int getLevel() {

		return level;
	}

	public int getManaCost() {

		return manaCost;
	}

	public SkillDetail getSkillDetailPanel() {

		return new SkillDetail(this);
	}

	public SkillButton getButton() {

		return button;
	}
}
```

### SkillPanel.java

```java
package gui.panels;

import player.Player;
import player.skills.Skill;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class SkillPanel extends BackGroundPanel {


	private JPanel mainPanel;
	private JPanel skillList;
	private JScrollPane scrollPanel;

	public SkillPanel(Player player) {

		super(ImageManager.getInstance().getImage("skillPanel"), new Dimension(560, 254));
		scrollPanel.getViewport().setOpaque(false);
		add(mainPanel);
		setOpaque(false);
		initSkills(player);
	}

	private void initSkills(Player player) {

		GridBagLayout layout = new GridBagLayout();
		layout.columnWidths = new int[]{540};
		layout.rowHeights = new int[]{106};
		skillList.setLayout(layout);
		skillList.setBorder(null);
		skillList.setOpaque(false);
		scrollPanel.setBorder(null);
		player.getSkillMap().forEach((k, v) -> addSkill(v));
	}

	private void addSkill(Skill skill) {

		GridBagConstraints c = new GridBagConstraints();
		c.gridx = 0;
		c.gridy = skillList.getComponentCount();
		c.fill = GridBagConstraints.BOTH;
		c.anchor = GridBagConstraints.CENTER;
		c.weightx = 1;
		c.weighty = 1;
		skillList.add(skill.getSkillDetailPanel(), c);
		skillList.revalidate();
		skillList.repaint();
	}
}
```

### StartButton.java

```java
package gui.buttons;

import gui.windows.GameWindow;
import gui.windows.NewGameWindow;
import player.Player;

public class StartButton extends ActionButton {

	private int slot;

	public StartButton(NewGameWindow window, int slot) {

		super("Iniciar");
		this.slot = slot;
		// Asignamos la acción de iniciar el juego
		addActionListener(e -> {

			// Obtenemos el jugador y la ventana de inicio de juego
			Player player = Player.getInstance(window.getPlayerName());
			// Cerramos la ventana de inicio de juego y abrimos la ventana de juego
			window.dispose();
			// Iniciamos el juego
			GameWindow.getInstance(player, getSlot()).startGame();
		});
	}

	public void setSlot(int slot) {

		this.slot = slot;
	}

	public int getSlot() {

		return slot;
	}
}
```

### TinyBat.java

```java
package enemies.bats;

import enemies.Enemy;
import gui.exceptions.EnemyDeadException;
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
	public String getAttack() throws EnemyDeadException {

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
		return message;
	}

	@Override
	public void dropItem(Player player) {

		int ratio = Randomized.randomizeNumber(1, 100);
		player.getInventory().addItem(ratio > 50 ? new BatWing() : new BatEar());
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

### StatusPanel.java

```java
package gui.panels;

import player.Player;
import gui.labels.StatLabel;
import util.managers.ImageManager;

import javax.swing.*;
import java.awt.*;

public class StatusPanel extends JPanel {

	private static StatusPanel instance;
	private final Image img;
	private final Player player;
	private final ActionsPanel actionsPanel;
	private final int tabIndex;
	private JPanel backgroundPanel;
	private JLabel levelLabel;
	private JLabel attackLabel;
	private JLabel defenseLabel;
	private JLabel goldLabel;
	private JLabel intLabel;
	private JLabel resLabel;
	private JLabel luckLabel;
	private JLabel desLabel;
	private JLabel speedLabel;
	private JLabel weaponLabel;
	private JLabel headArmorLabel;
	private JLabel chestArmorLabel;
	private JLabel feetArmorLabel;
	private JLabel legArmorLabel;
	private JLabel handArmorLabel;

	public static StatusPanel getInstance(int tabIndex, Player player) {

		if (instance == null) {

			instance = new StatusPanel(tabIndex, player);
		}
		return instance;
	}

	/**
	 * Constructor de la clase
	 *
	 * @param tabIndex índice de la pestaña
	 * @param player   jugador
	 */
	private StatusPanel(int tabIndex, Player player) {

		this.player = player;
		img = ImageManager.getInstance().getImage("statusPanel");
		this.tabIndex = tabIndex;
		this.actionsPanel = ActionsPanel.getInstance();
		Dimension size = new Dimension(1019, 342);
		setPreferredSize(size);
		setMinimumSize(size);
		setMaximumSize(size);
		setSize(size);
		add(backgroundPanel);
		setOpaque(false);
		setBackground(null);
		setMixingCutoutShape(new Rectangle(0, 0, 0, 0));
		setName("Estado");
		update();
	}

	public void update() {

		levelLabel.setText("EXP: " + player.getExperience());
		attackLabel.setText(player.getDisplayAttack());
		defenseLabel.setText(player.getDisplayDefense());
		goldLabel.setText("ORO: " + player.getGold());
		intLabel.setText(player.getDisplayIntelligence());
		resLabel.setText(player.getDisplayResistance());
		luckLabel.setText(player.getDisplayLuck());
		desLabel.setText(player.getDisplayDexterity());
		speedLabel.setText(player.getDisplaySpeed());
		weaponLabel.setText(player.getWeapon() != null ? player.getWeapon().getName() : "No equipado");
		headArmorLabel.setText(player.getHeadArmor() != null ? player.getHeadArmor().getName() : "No equipado");
		chestArmorLabel.setText(player.getChestArmor() != null ? player.getChestArmor().getName() : "No equipado");
		feetArmorLabel.setText(player.getFootArmor() != null ? player.getFootArmor().getName() : "No equipado");
		legArmorLabel.setText(player.getLegArmor() != null ? player.getLegArmor().getName() : "No equipado");
		handArmorLabel.setText(player.getHandArmor() != null ? player.getHandArmor().getName() : "No equipado");
		repaint();
	}

	/**
	 * Método que inicializa el panel
	 */
	@Override
	public void paintComponent(Graphics g) {

		super.paintComponent(g);
		Graphics2D g2d = (Graphics2D) g;
		g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g2d.drawImage(img, 0, 0, 1019, 342, null);
	}

	private void createUIComponents() {

		levelLabel = new StatLabel("EXP: " + player.getExperience(),
				new ImageIcon("img/ui/holders/expHolder.png").getImage());
		attackLabel = new StatLabel(player.getDisplayAttack(),
				new ImageIcon("img/ui/holders/attackHolder.png").getImage());
		defenseLabel = new StatLabel(player.getDisplayDefense(),
				new ImageIcon("img/ui/holders/defenseHolder.png").getImage());
		goldLabel = new StatLabel("ORO: " + player.getGold(),
				new ImageIcon("img/ui/holders/goldHolder.png").getImage());
		intLabel = new StatLabel(player.getDisplayIntelligence(),
				new ImageIcon("img/ui/holders/intHolder.png").getImage());
		resLabel = new StatLabel(player.getDisplayResistance(),
				new ImageIcon("img/ui/holders/resHolder.png").getImage());
		luckLabel = new StatLabel(player.getDisplayLuck(),
				new ImageIcon("img/ui/holders/lukHolder.png").getImage());
		desLabel = new StatLabel(player.getDisplayDexterity(),
				new ImageIcon("img/ui/holders/dexterityHolder.png").getImage());
		speedLabel = new StatLabel(player.getDisplaySpeed(),
				new ImageIcon("img/ui/holders/velHolder.png").getImage());
		weaponLabel = new StatLabel(player.getWeapon() != null ? player.getWeapon().getName() : "No equipado",
				new ImageIcon("img/ui/holders/weaponHolder.png").getImage());
		headArmorLabel = new StatLabel(player.getHeadArmor() != null ? player.getHeadArmor().getName() : "No equipado",
				new ImageIcon("img/ui/holders/headArmorHolder.png").getImage());
		chestArmorLabel = new StatLabel(player.getChestArmor() != null ? player.getChestArmor().getName() : "No equipado",
				new ImageIcon("img/ui/holders/chestArmorHolder.png").getImage());
		feetArmorLabel = new StatLabel(player.getFootArmor() != null ? player.getFootArmor().getName() : "No equipado",
				new ImageIcon("img/ui/holders/feetArmorHolder.png").getImage());
		legArmorLabel = new StatLabel(player.getLegArmor() != null ? player.getLegArmor().getName() : "No equipado",
				new ImageIcon("img/ui/holders/legArmorHolder.png").getImage());
		handArmorLabel = new StatLabel(player.getHandArmor() != null ? player.getHandArmor().getName() : "No equipado",
				new ImageIcon("img/ui/holders/handArmorHolder.png").getImage());
	}
}
```

### ThrowButtonListener.java

```java
package gui.events;

import gui.panels.DialogPanel;
import gui.panels.InventoryPanel;
import gui.panels.PlayerPanel;
import gui.panels.StatusPanel;
import items.Item;
import player.Player;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ThrowButtonListener implements ActionListener {

	private final Item item;

	public ThrowButtonListener(Item item) {

		this.item = item;
	}

	@Override
	public void actionPerformed(ActionEvent evt) {

		Player player = Player.getInstance();
		player.getInventory().removeItem(item);
		DialogPanel.getInstance().addText(
				String.format("Tiraste %s.\n", item.getName()));
		updatePanels();
	}

	/**
	 * Método que actualiza los paneles de la interfaz gráfica.
	 */
	private void updatePanels() {

		Player player = Player.getInstance();
		// Actualizamos los paneles
		StatusPanel.getInstance(0, player).update();
		PlayerPanel.getInstance(player).update();
		InventoryPanel.getInstance(2, player).update();
	}
}
```
