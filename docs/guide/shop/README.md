---
icon: shopping-cart
title: Definamos la tienda
description: Definamos a nuestro jugador y algunas de sus características.
---

## Definamos la tienda

En este tutorial, aprenderemos a definir la tienda de nuestra aplicación. La tienda es el lugar donde el jugador podrá
comprar objetos y mejoras para su personaje. En este caso, definiremos la tienda con un conjunto de objetos que el
jugador podrá comprar.

Para definir la tienda, necesitamos crear una clase que represente a la tienda. En esta clase, definiremos los objetos
que el jugador podrá comprar. Cada objeto tendrá un precio y una descripción. Además, necesitaremos una clase que
represente al jugador y que mantenga un registro de los objetos que ha comprado.

Para empezar crearemos un panel que represente la tienda. Este panel contendrá una lista de objetos que el jugador podrá
comprar. Cada objeto tendrá un botón que permitirá al jugador comprarlo. Cuando el jugador compre un objeto, este se
agregará a la lista de objetos que ha comprado.

Para crear la tienda, necesitaremos las siguientes clases:

- `ShopItemDetail`: Clase que representa un objeto que el jugador podrá comprar. Esta clase contendrá un precio y una
  descripción del objeto.
- `ShopPanel`: Clase que representa la tienda. Esta clase contendrá una lista de objetos que el jugador podrá comprar.
  Cada objeto tendrá un botón que permitirá al jugador comprarlo.
- `Player`: Clase que representa al jugador. Esta clase mantendrá un registro de los objetos que ha comprado.

## ShopItemDetail

La clase `ShopItemDetail` representa un objeto que el jugador podrá comprar. Esta clase contendrá un precio y una
descripción del objeto.

Lo primero que haremos es crear un GUI Form para la clase `ShopItemDetail`. Para ello, haremos clic derecho sobre el
paquete panels y seleccionaremos la opción New -> GUI Form. En el cuadro de diálogo que aparece, escribiremos el nombre
de la clase `ShopItemDetail` y haremos clic en el botón Finish.

A continuación, abriremos el archivo `ShopItemDetail.form` y agregaremos los siguientes componentes:

- Un `JTextPane` para mostrar la descripción del objeto.
- Un `JButton` para permitir al jugador comprar el objeto.

El código de la clase `ShopItemDetail` será el siguiente:

```java
    package gui.panels;
    
    import gui.buttons.BuyButton;
    import items.Item;
    import util.managers.FontManager;
    
    import javax.swing.*;
    import javax.swing.border.EmptyBorder;
    
    public class ShopItemDetail extends BackGroundPanel {
    
        private final Item item;
        private JTextPane itemDescription;
        private JButton buyButton;
        private JPanel mainPanel;
    
        public ShopItemDetail(Item item) {
    
            super();
            this.item = item;
            add(mainPanel);
            mainPanel.setPreferredSize(getPreferredSize());
            mainPanel.setMaximumSize(getPreferredSize());
            mainPanel.setMinimumSize(getPreferredSize());
            mainPanel.setBorder(new EmptyBorder(12, 15, 12, 15));
            //mainPanel.setBorder(new LineBorder(Color.BLACK, 5));
            itemDescription.setFont(FontManager.getInstance().getFont("Player"));
            String description;
            description = String.format("%s (%s - $%d)", item.getName(), item.getRarity(), item.getPrice());
            ((CenteredTextPane) itemDescription).appendText(description, true);
            ((CenteredTextPane) itemDescription).appendText(item.getDescription(), false);
        }
    
        private void createUIComponents() {
    
            buyButton = new BuyButton(item);
            itemDescription = new CenteredTextPane();
        }
    }
```

En este código, la clase `ShopItemDetail` extiende de `BackGroundPanel`, que es una clase que representa un panel con
una imagen de fondo. La clase `ShopItemDetail` tiene un constructor que recibe un objeto de tipo `Item` y crea un panel
con la descripción del objeto y un botón para comprarlo.

El método `createUIComponents` crea los componentes del panel. En este caso, creamos un botón de tipo `BuyButton` y un
`JTextPane` de tipo `CenteredTextPane` para mostrar la descripción del objeto.

## ShopPanel

La clase `ShopPanel` representa la tienda. Esta clase contendrá una lista de objetos que el jugador podrá comprar. Cada
objeto tendrá un botón que permitirá al jugador comprarlo.

Lo primero que haremos es crear un GUI Form para la clase `ShopPanel`. Para ello, haremos clic derecho sobre el paquete
panels y seleccionaremos la opción New -> GUI Form. En el cuadro de diálogo que aparece, escribiremos el nombre de la
clase `ShopPanel` y haremos clic en el botón Finish.

A continuación, abriremos el archivo `ShopPanel.form` y agregaremos los siguientes componentes:

- Un `JTabbedPane` para mostrar la lista de objetos que el jugador podrá comprar.
- Un `JPanel` para cada categoría de objetos.

El código de la clase `ShopPanel` será el siguiente:

```java
    package gui.panels;
    
    import gui.events.HandCursorListener;
    import gui.ui.InventoryTabUI;
    import items.Item;
    import items.ItemType;
    import items.armors.head.IronHelmet;
    import items.armors.head.WoodHelmet;
    import items.weapons.blades.WoodBlade;
    import player.Player;
    import util.interfaces.Dimensions;
    
    import javax.swing.*;
    import java.awt.*;
    import java.util.ArrayList;
    
    public class ShopPanel extends BackGroundPanel {
    
        private static ShopPanel instance;
        private final Player player;
        private final ActionsPanel actionsPanel;
        private final int tabIndex;
        private static ArrayList<Item> weapons;
        private static ArrayList<Item> armors;
        private JTabbedPane itemDisplayPanel;
        private JPanel weaponsPanel;
        private JPanel armorsPanel;
        private JPanel backgroundPanel;
    
        public static ShopPanel getInstance(int tabIndex, Player player) {
    
            if (instance == null) {
    
                weapons = new ArrayList<>();
                weapons.add(new WoodBlade());
                weapons.add(new WoodBlade());
                armors = new ArrayList<>();
                armors.add(new IronHelmet());
                armors.add(new WoodHelmet());
                instance = new ShopPanel(tabIndex, player);
            }
            return instance;
        }
    
        private ShopPanel(int tabIndex, Player player) {
    
            super();
            this.player = player;
            itemDisplayPanel.setUI(new InventoryTabUI());
            this.tabIndex = tabIndex;
            this.actionsPanel = ActionsPanel.getInstance();
            Dimension size = Dimensions.TAB_SIZE;
            setPreferredSize(size);
            setMinimumSize(size);
            setMaximumSize(size);
            setSize(size);
            add(backgroundPanel);
            setOpaque(false);
            setBackground(null);
            setMixingCutoutShape(new Rectangle(0, 0, 0, 0));
            setName("Tienda");
            itemDisplayPanel.addMouseMotionListener(new HandCursorListener(itemDisplayPanel));
        }
    
        private void createUIComponents() {
    
            //Iniciamos los paneles con las listas de objetos
            weaponsPanel = new ItemPanel(ItemType.WEAPON, player, weapons);
            armorsPanel = new ItemPanel(ItemType.ARMOR, player, armors);
        }
    
        public void update() {
    
            ((ItemPanel) weaponsPanel).initComponents(weapons);
            ((ItemPanel) armorsPanel).initComponents(armors);
        }
    }
```

En este código, la clase `ShopPanel` extiende de `BackGroundPanel`, que es una clase que representa un panel con una
imagen de fondo. La clase `ShopPanel` tiene un constructor que recibe un índice de pestaña y un objeto de tipo `Player`.

El método `createUIComponents` crea los componentes del panel. En este caso, creamos dos paneles de tipo `ItemPanel`
para
mostrar la lista de armas y armaduras que el jugador podrá comprar.

## Actualizar `ItemPanel`

La clase `ItemPanel` es una clase que representa un panel con una lista de objetos que el jugador podrá comprar. Esta
clase tiene un constructor que recibe un tipo de objeto, un objeto de tipo `Player` y una lista de objetos que el
jugador podrá comprar.

Para actualizar la clase `ItemPanel`, necesitamos agregar un método `initComponents` que reciba una lista de objetos y
actualice la lista de objetos que el jugador podrá comprar.

El código de la clase `ItemPanel` será el siguiente:

```java
    package gui.panels;
    
    import items.Item;
    import items.ItemType;
    import player.Inventory;
    import player.Player;
    import util.interfaces.Dimensions;
    
    import javax.swing.*;
    import java.awt.*;
    import java.util.List;
    
    public class ItemPanel extends BackGroundPanel {
    
        protected JPanel mainPanel;
        protected JScrollPane scrollPanel;
        protected JPanel displayPanel;
        private final ItemType type;
        private final Player player;
    
        public ItemPanel(ItemType type, Player player) {
    
            super();
            mainPanel.setPreferredSize(getPreferredSize());
            this.player = player;
            this.type = type;
            add(mainPanel);
            initComponents();
        }
    
        public ItemPanel(ItemType type, Player player, List<Item> items) {
    
            super();
            mainPanel.setPreferredSize(getPreferredSize());
            this.player = player;
            this.type = type;
            add(mainPanel);
            initComponents(items);
        }
    
        /**
         * La función initComponents se encarga de inicializar los componentes de la tienda con
         * una lista de items.
         *
         * @param items La lista de items que se mostrarán en la tienda.
         */
        public void initComponents(List<Item> items) {
    
            setLayouts();
            items.forEach(this::addShopItem);
            // Colocamos el scroll en la parte superior
            scrollPanel.getViewport().setViewPosition(new Point(0, 0));
        }
    
        public void initComponents() {
    
            setLayouts();
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
    
        private void setLayouts() {
    
            GridBagLayout layout = new GridBagLayout();
            setBorder(BorderFactory.createEmptyBorder(6, 8, 8, 8));
            layout.columnWidths = new int[]{Dimensions.ITEM_DETAIL_SIZE.width};
            layout.rowHeights = new int[]{Dimensions.ITEM_DETAIL_SIZE.height};
            displayPanel.removeAll();
            displayPanel.setLayout(layout);
            displayPanel.setOpaque(false);
            scrollPanel.setOpaque(false);
            scrollPanel.setBorder(BorderFactory.createEmptyBorder());
            scrollPanel.getViewport().setOpaque(false);
            scrollPanel.getVerticalScrollBar().setOpaque(false);
            scrollPanel.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
            scrollPanel.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        }
    
        protected void addShopItem(Item item) {
    
            addItemComponent(new ShopItemDetail(item));
        }
    
        protected void addItem(Item item) {
    
            addItemComponent(new ItemDetail(item));
        }
    
        private void addItemComponent(BackGroundPanel detail) {
    
            GridBagConstraints c = new GridBagConstraints();
            c.gridx = displayPanel.getComponentCount() % 3;
            c.gridy = displayPanel.getComponentCount() / 3;
            c.fill = GridBagConstraints.CENTER;
            c.anchor = GridBagConstraints.CENTER;
            c.weightx = 1;
            c.weighty = 1;
            displayPanel.add(detail, c);
            displayPanel.revalidate();
            displayPanel.repaint();
        }
    }
```

En este código, la clase `ItemPanel` extiende de `BackGroundPanel`, que es una clase que representa un panel con una
imagen de fondo. La clase `ItemPanel` tiene un constructor que recibe un tipo de objeto y un objeto de tipo `Player`.

El método `initComponents` inicializa los componentes del panel con una lista de objetos que el jugador podrá comprar.
El método `initComponents` recibe una lista de objetos y los muestra en el panel.

El método `initComponents` sin argumentos inicializa los componentes del panel con los objetos que el jugador tiene en
su inventario.

## Actualizando la clase `GameWindow`

Para mostrar la tienda en la ventana del juego, necesitamos actualizar la clase `GameWindow` para agregar un panel de
tipo `ShopPanel` al TabbedPane.

Una vez agregado el panel al TabbedPane, necesitamos actualizar el método `createUIComponents` de la clase `GameWindow`
para inicializar el panel de la tienda.

El código de la clase `GameWindow` será el siguiente:

```java
    package gui.windows;
    
    import enemies.Enemy;
    import gui.panels.*;
    import player.Player;
    import util.enemies.EnemyFactory;
    import util.interfaces.Dimensions;
    
    import javax.swing.*;
    
    /**
     * Clase que representa la ventana principal del juego
     */
    public class GameWindow extends JFrame {
    
        /**
         * Instancia de la ventana principal
         */
        private static GameWindow instance;
        /**
         * Panel principal de la ventana
         */
        private JPanel backgroundPanel;
        private Player player;
        private Enemy enemy;
        private final int slot;
        private JTabbedPane actionTabs;
        private JPanel statusPanel;
        private JPanel battlePanel;
        private JPanel inventoryPanel;
        private JPanel playerPanel;
        private JPanel mainPanel;
        private JPanel enemyPanel;
        private JPanel shopPanel;
    
        /**
         * Método que devuelve la instancia de la ventana principal
         *
         * @param player El jugador
         * @param slot   El slot de guardado
         *
         * @return La instancia de la ventana principal
         */
        public static synchronized GameWindow getInstance(Player player, int slot) {
    
            //Si la instancia es nula, la creamos
            if (instance == null) {
    
                instance = new GameWindow(player, slot);
            }
            //Devolvemos la instancia
            return instance;
        }
    
        /**
         * Método que devuelve la instancia de la ventana principal
         *
         * @return La instancia de la ventana principal
         */
        public static synchronized GameWindow getInstance() {
    
            return instance;
        }
    
        /**
         * Constructor de la clase
         *
         * @param player El jugador
         * @param slot   El slot de guardado
         */
        private GameWindow(Player player, int slot) {
    
            this.player = player;
            //player.getSkillMap().put(Slash.NAME, Slash.getInstance(player));
            this.slot = slot;
        }
    
        /**
         * Método que inicializa la ventana
         */
        public void startGame() {
    
            ///setPanelsSize();
            //Título de la Ventana
            setTitle("Game Window");
            //Operación por defecto de cierre
            setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
            //No la hacemos escalable
            setResizable(false);
            //Agregamos el panel principal
            add(backgroundPanel);
            //Tamaño de la ventana
            pack();
            //Centramos la ventana
            setLocationRelativeTo(null);
            //Hacemos visible la ventana
            setVisible(true);
            setPreferredSize(Dimensions.SCREEN_SIZE);
        }
    
        private void createUIComponents() {
    
            DialogPanel.getInstance().addText("¡Bienvenido a la aventura!\n");
            playerPanel = PlayerPanel.getInstance(player);
            player.setEnemy(EnemyFactory.generateRegularEnemy(player));
            enemy = player.getEnemy();
            mainPanel = MainPanel.getInstance(enemy, player);
            enemyPanel = EnemyPanel.getInstance(enemy);
            //Agregamos las pestañas
            actionTabs = ActionsPanel.getInstance();
            //Agregamos el panel de estado
            statusPanel = StatusPanel.getInstance(0, player);
            //Agregamos el panel de batalla
            battlePanel = BattlePanel.getInstance(1, enemy, player, slot);
            //Agregamos el panel de inventario
            inventoryPanel = InventoryPanel.getInstance(2, player);
            //Agregamos el panel de la tienda
            shopPanel = ShopPanel.getInstance(3, player);
        }
    
        public Player getPlayer() {
    
            return player;
        }
    
        public void setPlayer(Player player) {
    
            this.player = player;
        }
    
        public Enemy getEnemy() {
    
            return enemy;
        }
    
        public void setEnemy(Enemy enemy) {
    
            BattlePanel.getInstance(1, this.enemy, player, slot).setEnemy(enemy);
            this.enemy = enemy;
        }
    
        public int getSlot() {
    
            return slot;
        }
    }
```
