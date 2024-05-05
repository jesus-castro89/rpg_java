---
icon: gamepad
title: Los botones
description: Los botones de la interfaz de usuario.
---

# Los botones

En la interfaz de usuario encontraremos varios botones que nos permitirán interactuar con el juego. A continuación, se
describen los botones que podemos encontrar en la interfaz.

## ActionButton

Este botón es el botón principal de la interfaz. Se utiliza para realizar acciones en el juego, como atacar, moverse,
usar objetos, etc. En general, se utiliza para realizar acciones que no requieren de una selección previa.

```java
    package gui.buttons;
    
    import gui.events.ButtonCursorAdapter;
    import util.managers.FontManager;
    import util.managers.ImageManager;
    
    import javax.swing.*;
    import java.awt.*;
    
    public abstract class ActionButton extends JButton {
    
        private String displayText;
        private Font font;
        private Icon image;
        private int topPadding;
    
        public ActionButton(String text) {
    
            // Inicializamos los atributos
            this.displayText = text;
            // Configuramos el botón
            // Establecemos las imágenes
            setIcon(new ImageIcon(ImageManager.getInstance().getImage("button")));
            // Establecemos la imagen de rollover o cuando el jugador tiene el mouse sobre el botón
            setRolloverIcon(new ImageIcon(ImageManager.getInstance().getImage("buttonHover")));
            image = getIcon();
            // Establecemos el texto con un padding superior de 2px
            topPadding = 2;
            // Establecemos la fuente en Standard
            font = FontManager.getInstance().getFont("Standard");
            // Establecemos el tamaño del botón
            Dimension size = new Dimension(117, 29);
            setSize(size);
            setPreferredSize(size);
            setMinimumSize(size);
            setMaximumSize(size);
            // Establecemos que el botón no tenga fondo ni borde, y además sea transparente lo que no sea la imagen
            setContentAreaFilled(false);
            setBorderPainted(false);
            setFocusPainted(true);
            setOpaque(false);
            // Establecemos el cursor del mouse
            setCursor(new Cursor(Cursor.HAND_CURSOR));
            // Agregamos la acción del botón cuando el jugador pasa el mouse sobre él
            addMouseListener(new ButtonCursorAdapter(this));
        }
    
        @Override
        protected void paintComponent(Graphics g) {
    
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g;
            //Activamos la interpolación
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
            g2d.setFont(font);
            g2d.setColor(Color.BLACK);
            //Pintamos la imagen
            image.paintIcon(this, g2d, 0, 0);
            //Calculamos la posición del texto
            int textPositionY = image.getIconHeight() / 2 + (g2d.getFontMetrics().getHeight() / 4) + topPadding;
            int textPositionX = (image.getIconWidth() - g2d.getFontMetrics().stringWidth(displayText)) / 2;
            //Pintamos el texto
            g2d.drawString(displayText, textPositionX, textPositionY);
        }
    
        @Override
        public Font getFont() {
    
            return font;
        }
    
        public Icon getImage() {
    
            return image;
        }
    
        @Override
        public void setFont(Font font) {
    
            this.font = font;
        }
    
        public void setImage(Icon image) {
    
            this.image = image;
        }
    
        public void setTopPadding(int topPadding) {
    
            this.topPadding = topPadding;
        }
    }
```

En esta clase, se define un botón que se utiliza para realizar acciones en el juego. Se establece un texto y una imagen
para el botón, y se define el comportamiento del botón al pintarse, además de la fuente y el padding superior. Se
utiliza un `MouseListener` para cambiar el cursor del mouse cuando el jugador pasa el mouse sobre el botón.

## ExitButton

Este botón se utiliza para salir del juego. Al hacer clic en él, se cierra la ventana del juego y se termina la
aplicación.

```java
    package gui.buttons;
    
    public class ExitButton extends ActionButton {
    
        public ExitButton() {
    
            super("Salir");
            addActionListener(e -> System.exit(0));
        }
    }
```

En esta clase, se define un botón que se utiliza para salir del juego. Al hacer clic en él, se cierra la ventana del
juego y se termina la aplicación.

## StartButton

Este botón se utiliza para iniciar el juego. Al hacer clic en él, se inicia el juego y se muestra la ventana principal.

```java
    package gui.buttons;
    
    import gui.GameWindow;
    import gui.NewGameWindow;
    import player.Player;
    
    public class StartButton extends ActionButton {
    
    
        public StartButton(NewGameWindow window) {
    
            super("Iniciar");
            // Asignamos la acción de iniciar el juego
            addActionListener(e -> {
    
                // Obtenemos el jugador y la ventana de inicio de juego
                Player player = Player.getInstance(window.getPlayerName());
                // Cerramos la ventana de inicio de juego y abrimos la ventana de juego
                window.dispose();
                // Iniciamos el juego
                GameWindow.getInstance(player).startGame();
            });
        }
    }
```

En esta clase, se define un botón que se utiliza para iniciar el juego. Al hacer clic en él, se inicia el juego y se
muestra la ventana principal.

## AttackButton

Este botón se utiliza para atacar a un enemigo. Al hacer clic en él se inicia el ciclo de ataque entre el enemigo y el
jugador.

```java
    package gui.buttons;
    
    import enemies.Enemy;
    import gui.events.AttackButtonListener;
    
    public class AttackButton extends ActionButton {
    
        // Constructor que recibe un enemigo como parámetro
        public AttackButton(Enemy enemy) {
    
            super("Atacar");
            // Asignar la acción de atacar al enemigo
            addActionListener(new AttackButtonListener(enemy));
        }
    }
```

### AttackButtonListener

Este `ActionListener` se utiliza para atacar a un enemigo. Al hacer clic en el botón, se inicia el ciclo de ataque entre
el enemigo y el jugador.

```java
    package gui.events;
    
    import enemies.Enemy;
    import gui.exceptions.EnemyDeadException;
    import gui.exceptions.PlayerDeadException;
    import gui.GameWindow;
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
    
        // Constructor que recibe un enemigo como parámetro
        public AttackButtonListener(Enemy enemy) {
    
            this.enemy = enemy;
        }
    
        // Método que se ejecuta al presionar el botón de ataque
        @Override
        public void actionPerformed(ActionEvent e) {
    
            // Obtenemos las instancias de los paneles necesarios
            DialogPanel dialogPanel = DialogPanel.getInstance();
            // Obtenemos la instancia del jugador
            Player player = Player.getInstance();
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
                enemy = EnemyFactory.generateRegularEnemy();
                // Asignamos el nuevo enemigo al panel de juego
                GameWindow.getInstance(player).setEnemy(enemy);
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
                enemy = EnemyFactory.generateRegularEnemy();
                // Asignamos el nuevo enemigo al panel de juego
                GameWindow.getInstance(player).setEnemy(enemy);
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
            GameWindow.getInstance(player).repaint();
            StatusPanel.getInstance(0).update();
            MainPanel.getInstance(enemy).update(enemy);
            PlayerPanel.getInstance(player).update();
            EnemyPanel.getInstance(enemy).setEnemy(enemy);
            EnemyPanel.getInstance(enemy).update();
            InventoryPanel.getInstance(2).update();
        }
    }
```

## FleeButton

Este botón se utiliza para huir de un enemigo. Al hacer clic en él, se intenta huir del enemigo y se genera un nuevo
enemigo.

```java
    package gui.buttons;
    
    import enemies.Enemy;
    import gui.events.FleeButtonListener;
    
    public class FleeButton extends ActionButton {
    
        // Constructor que recibe un enemigo como parámetro
        public FleeButton(Enemy enemy) {
    
            super("Huir");
            // Asignar la acción de huir del enemigo
            addActionListener(new FleeButtonListener(enemy));
        }
    }
```

### FleeButtonListener

Este `ActionListener` se utiliza para huir de un enemigo. Al hacer clic en el botón, se intenta huir del enemigo, en 
caso de que la huida sea exitosa, se crea un nuevo enemigo y se actualizan los paneles.

```java
    package gui.events;
    
    import enemies.Enemy;
    import gui.exceptions.EnemyDeadException;
    import gui.GameWindow;
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
                enemy = EnemyFactory.generateRegularEnemy();
                // Se actualiza la instancia del enemigo en la ventana de juego.
                GameWindow.getInstance(player).setEnemy(enemy);
                // Se actualizan los paneles.
                updatePanels(player);
            }
        }
    
        private void updatePanels(Player player) {
    
            GameWindow.getInstance(player).repaint();
            StatusPanel.getInstance(0).update();
            MainPanel.getInstance(enemy).update(enemy);
            PlayerPanel.getInstance(player).update();
            EnemyPanel.getInstance(enemy).setEnemy(enemy);
            EnemyPanel.getInstance(enemy).update();
        }
    }
```

## SaveButton

Este botón se utiliza para guardar la partida. Al hacer clic en él, se guarda el estado actual del juego en un archivo.

```java
    package gui.buttons;
    
    import gui.panels.DialogPanel;
    import player.Player;
    import util.managers.FileManager;
    
    public class SaveButton extends ActionButton {
    
        public SaveButton(Player player) {
    
            super("Guardar");
            // Asignar la acción de guardar el avance del jugador en el archivo correspondiente
            addActionListener(e -> {
                // Save the game
                FileManager.saveGame(player);
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

## SkillButton

Este botón se utiliza para usar una habilidad especial. Al hacer clic en él, se activa la habilidad especial del jugador.

```java
    package gui.buttons;
    
    import gui.events.SkillButtonListener;
    import player.skills.Skill;
    
    public class SkillButton extends ActionButton {
    
    
        public SkillButton(Skill skill) {
    
            super("Usar");
            addActionListener(new SkillButtonListener(skill));
        }
    }
```

### SkillButtonListener

Este `ActionListener` se utiliza para activar una habilidad especial. Al hacer clic en el botón, se activa la habilidad
seleccionada del jugador.

```java
    package gui.events;
    
    import player.skills.Skill;
    
    import java.awt.event.ActionEvent;
    import java.awt.event.ActionListener;
    
    public class SkillButtonListener implements ActionListener {
    
        private final Skill skill;
    
        public SkillButtonListener(Skill skill) {
    
            this.skill = skill;
        }
    
        @Override
        public void actionPerformed(ActionEvent e) {
    
            skill.activate();
        }
    }
```

## EquipButton

Este botón se utiliza para equipar un objeto. Al hacer clic en él, se equipa el objeto seleccionado por el jugador.

```java
    package gui.buttons;
    
    import gui.events.EquipButtonListener;
    import items.Item;
    
    public class EquipButton extends ActionButton {
    
        public EquipButton(Item item) {
    
            super("Equipar");
            addActionListener(new EquipButtonListener(item));
        }
    }
```

### EquipButtonListener

Este `ActionListener` se utiliza para equipar un objeto. Al hacer clic en el botón, se equipa el objeto seleccionado por
el jugador.

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
            StatusPanel.getInstance(0).update();
            PlayerPanel.getInstance(player).update();
            InventoryPanel.getInstance(2).update();
        }
    }
```

## SellButton

Este botón se utiliza para vender un objeto. Al hacer clic en él, se vende el objeto seleccionado por el jugador.

```java
    package gui.buttons;
    
    import gui.events.SellButtonListener;
    import items.Item;
    
    public class SellButton extends ActionButton {
    
        public SellButton(Item item) {
    
            super("Vender");
            addActionListener(new SellButtonListener(item));
        }
    }
```

### SellButtonListener

Este `ActionListener` se utiliza para vender un objeto. Al hacer clic en el botón, se vende el objeto seleccionado por
el jugador.

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
            StatusPanel.getInstance(0).update();
            PlayerPanel.getInstance(player).update();
            InventoryPanel.getInstance(2).update();
        }
    }
```

## BuyButton

Este botón se utiliza para comprar un objeto. Al hacer clic en él, se compra el objeto seleccionado por el jugador.

```java
    package gui.buttons;
    
    import gui.events.BuyButtonListener;
    import items.Item;
    
    public class BuyButton extends ActionButton {
    
        public BuyButton(Item item) {
    
            super("Comprar");
            addActionListener(new BuyButtonListener(item));
        }
    }
```

### BuyButtonListener

Este `ActionListener` se utiliza para comprar un objeto. Al hacer clic en el botón, se compra el objeto seleccionado por
el jugador.

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
            StatusPanel.getInstance(0).update();
            PlayerPanel.getInstance(player).update();
            InventoryPanel.getInstance(2).update();
        }
    }
```

## ThrowButton

Este botón se utiliza para tirar un objeto. Al hacer clic en él, se tira el objeto seleccionado por el jugador.

```java
    package gui.buttons;
    
    import gui.events.ThrowButtonListener;
    import items.Item;
    
    public class ThrowButton extends ActionButton {
    
        public ThrowButton(Item item) {
    
            super("Tirar");
            addActionListener(new ThrowButtonListener(item));
        }
    }
```

### ThrowButtonListener

Este `ActionListener` se utiliza para tirar un objeto. Al hacer clic en el botón, se tira el objeto seleccionado por el
jugador.

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
        public void actionPerformed(ActionEvent e) {
    
            Player player = Player.getInstance();
            player.getInventory().removeItem(item);
            DialogPanel.getInstance().addText(String.format("Tiraste %s.\n", item.getName()));
            updatePanels();
        }
    
        /**
         * Método que actualiza los paneles de la interfaz gráfica.
         */
        private void updatePanels() {
    
            Player player = Player.getInstance();
            // Actualizamos los paneles
            StatusPanel.getInstance(0).update();
            PlayerPanel.getInstance(player).update();
            InventoryPanel.getInstance(2).update();
        }
    }
```
