---
icon: briefcase
title: Utilidades
description: Utilidades para facilitar el desarrollo de nuestro juego.
---

# Utilidades

En esta sección encontrarás utilidades que te ayudarán a facilitar el desarrollo de tu juego.

## ImageCache & ImageManager

La clase `ImageCache` es una clase que se encarga de almacenar las imágenes que se cargan en el juego. La
clase `ImageManager` es una clase que se encarga de gestionar las imágenes que se cargan en el juego.

### ImageCache

La clase `ImageCache` es una clase que se encarga de almacenar las imágenes que se cargan en el juego. La clase
`ImageCache` es una clase que se encarga de almacenar las imágenes que se cargan en el juego.

```java
    package util.cache;
    
    import java.awt.*;
    import java.util.HashMap;
    import java.util.Map;
    
    /**
     * Clase que implementa un caché de imágenes
     */
    public class ImageCache {
        /**
         * Instancia de la clase
         */
        private static ImageCache instance;
        /**
         * Mapa que almacena las imágenes
         */
        private final Map<String, Image> imageCache;
    
        /**
         * Constructor de la clase
         */
        private ImageCache() {
    
            imageCache = new HashMap<>();
        }
    
        /**
         * Método que lanza una excepción si se intenta clonar la clase
         *
         * @return excepción
         *
         * @throws CloneNotSupportedException excepción
         */
        @Override
        public Object clone() throws CloneNotSupportedException {
    
            throw new CloneNotSupportedException("Clonación no permitida para la clase Singleton.");
        }
    
        /**
         * Método que devuelve la instancia de la clase
         *
         * @return instancia de la clase
         */
        public static ImageCache getInstance() {
    
            if (instance == null) {
                instance = new ImageCache();
            }
            return instance;
        }
    
        /**
         * Método que añade una imagen al caché
         *
         * @param imageName nombre de la imagen
         * @param image     imagen
         */
        public void addImage(String imageName, Image image) {
    
            imageCache.put(imageName, image);
        }
    
        /**
         * Método que devuelve una imagen del caché
         *
         * @param imageName nombre de la imagen
         *
         * @return imagen
         */
        public Image getImage(String imageName) {
    
            return imageCache.get(imageName);
        }
    
        /**
         * Método que comprueba si el caché contiene una imagen
         *
         * @param imageName nombre de la imagen
         *
         * @return true si la imagen está en el caché, false en caso contrario
         */
        public boolean containsImage(String imageName) {
    
            return imageCache.containsKey(imageName);
        }
    
        /**
         * Método que comprueba si el caché está vacío
         *
         * @return true si el caché está vacío, false en caso contrario
         */
        public boolean isCacheEmpty() {
    
            return imageCache.isEmpty();
        }
    }
```

### ImageManager

La clase `ImageManager` es una clase que se encarga de gestionar las imágenes que se cargan en el juego. La clase
`ImageManager` es una clase que se encarga de gestionar las imágenes que se cargan en el juego.

```java
    package util.managers;
    
    import util.cache.ImageCache;
    
    import javax.swing.*;
    import java.awt.*;
    
    public class ImageManager {
    
        private static ImageManager instance;
    
        private final ImageCache imageCache;
    
        private ImageManager() {
    
            imageCache = ImageCache.getInstance();
            initImages();
        }
    
        private void initImages() {
    
            addPanels();
            addHolders();
            addTabs();
            addPlayerElements();
            addButtons();
            //Characters
            imageCache.addImage("portrait",
                    new ImageIcon("img/player/portrait.png").getImage());
        }
    
        private void addButtons() {
            //Buttons
            imageCache.addImage("button",
                    new ImageIcon("img/ui/buttons/idleButton.png").getImage());
            imageCache.addImage("buttonHover\"",
                    new ImageIcon("img/ui/buttons/hoverButton.png").getImage());
        }
    
        private void addPlayerElements() {
            //Player Elements
            imageCache.addImage("mp100", new ImageIcon("img/player/mp100.png").getImage());
            imageCache.addImage("mp80", new ImageIcon("img/player/mp80.png").getImage());
            imageCache.addImage("mp60", new ImageIcon("img/player/mp60.png").getImage());
            imageCache.addImage("mp40", new ImageIcon("img/player/mp40.png").getImage());
            imageCache.addImage("mp20", new ImageIcon("img/player/mp20.png").getImage());
            imageCache.addImage("mp0", new ImageIcon("img/player/mp0.png").getImage());
            imageCache.addImage("hp100", new ImageIcon("img/player/hp100.png").getImage());
            imageCache.addImage("hp80", new ImageIcon("img/player/hp80.png").getImage());
            imageCache.addImage("hp60", new ImageIcon("img/player/hp60.png").getImage());
            imageCache.addImage("hp40", new ImageIcon("img/player/hp40.png").getImage());
            imageCache.addImage("hp20", new ImageIcon("img/player/hp20.png").getImage());
            imageCache.addImage("hp0", new ImageIcon("img/player/hp0.png").getImage());
        }
    
        private void addTabs() {
            //Tabs
            imageCache.addImage("activeTab",
                    new ImageIcon("img/ui/tabs/activeTab.png").getImage());
            imageCache.addImage("inactiveTab",
                    new ImageIcon("img/ui/tabs/inactiveTab.png").getImage());
            imageCache.addImage("armorTab",
                    new ImageIcon("img/ui/tabs/armorTabActive.png").getImage());
            imageCache.addImage("weaponTab",
                    new ImageIcon("img/ui/tabs/weaponTabActive.png").getImage());
            imageCache.addImage("miscTab",
                    new ImageIcon("img/ui/tabs/miscTabActive.png").getImage());
            imageCache.addImage("armorTabInactive",
                    new ImageIcon("img/ui/tabs/armorTabInactive.png").getImage());
            imageCache.addImage("weaponTabInactive",
                    new ImageIcon("img/ui/tabs/weaponTabInactive.png").getImage());
            imageCache.addImage("miscTabInactive",
                    new ImageIcon("img/ui/tabs/miscTabInactive.png").getImage());
        }
    
        private void addHolders() {
            //Holders
            imageCache.addImage("expHolder",
                    new ImageIcon("img/ui/holders/expHolder.png").getImage());
            imageCache.addImage("attackHolder",
                    new ImageIcon("img/ui/holders/attackHolder.png").getImage());
            imageCache.addImage("defenseHolder",
                    new ImageIcon("img/ui/holders/defenseHolder.png").getImage());
            imageCache.addImage("goldHolder",
                    new ImageIcon("img/ui/holders/goldHolder.png").getImage());
            imageCache.addImage("dexterityHolder",
                    new ImageIcon("img/ui/holders/dexterityHolder.png").getImage());
            imageCache.addImage("intelligenceHolder",
                    new ImageIcon("img/ui/holders/intHolder.png").getImage());
            imageCache.addImage("luckHolder",
                    new ImageIcon("img/ui/holders/lukHolder.png").getImage());
            imageCache.addImage("headArmorHolder",
                    new ImageIcon("img/ui/holders/headArmorHolder.png").getImage());
            imageCache.addImage("chestArmorHolder",
                    new ImageIcon("img/ui/holders/chestArmorHolder.png").getImage());
            imageCache.addImage("legArmorHolder",
                    new ImageIcon("img/ui/holders/legArmorHolder.png").getImage());
            imageCache.addImage("feetArmorHolder",
                    new ImageIcon("img/ui/holders/feetArmorHolder.png").getImage());
            imageCache.addImage("handArmorHolder",
                    new ImageIcon("img/ui/holders/handArmorHolder.png").getImage());
            imageCache.addImage("resHolder",
                    new ImageIcon("img/ui/holders/resHolder.png").getImage());
            imageCache.addImage("velHolder",
                    new ImageIcon("img/ui/holders/velHolder.png").getImage());
            imageCache.addImage("weaponHolder",
                    new ImageIcon("img/ui/holders/weaponHolder.png").getImage());
            imageCache.addImage("textHolder",
                    new ImageIcon("img/ui/holders/textHolder.png").getImage());
            imageCache.addImage("itemHolder",
                    new ImageIcon("img/ui/holders/itemHolder.png").getImage());
        }
    
        private void addPanels() {
            //Paneles
            imageCache.addImage("statusPanel",
                    new ImageIcon("img/ui/panels/statusPanel.png").getImage());
            imageCache.addImage("playerPanel",
                    new ImageIcon("img/ui/panels/playerPanel.png").getImage());
            imageCache.addImage("enemyPanel",
                    new ImageIcon("img/ui/panels/enemyPanel.png").getImage());
            imageCache.addImage("battlePanel",
                    new ImageIcon("img/ui/panels/battlePanel.png").getImage());
            imageCache.addImage("charactersPanel",
                    new ImageIcon("img/ui/panels/charactersPanel.png").getImage());
            imageCache.addImage("skillPanel",
                    new ImageIcon("img/ui/panels/skillPanel.png").getImage());
            imageCache.addImage("dialogPanel",
                    new ImageIcon("img/ui/panels/dialogPanel.png").getImage());
            imageCache.addImage("skillDetailPanel",
                    new ImageIcon("img/ui/panels/skillDetailPanel.png").getImage());
            imageCache.addImage("inventoryPanel",
                    new ImageIcon("img/ui/panels/inventoryPanel.png").getImage());
            imageCache.addImage("shopPanel",
                    new ImageIcon("img/ui/panels/shopPanel.png").getImage());
        }
    
        public static ImageManager getInstance() {
    
            if (instance == null) {
                instance = new ImageManager();
            }
            return instance;
        }
    
        public Image getImage(String imageName) {
    
            return imageCache.getImage(imageName);
        }
    
        public Image getImage(String imageName, Image image) {
    
            if (imageCache.getImage(imageName) == null) {
                imageCache.addImage(imageName, image);
                return image;
            } else
                return imageCache.getImage(imageName);
        }
    }
```

## FontCache & FontManager

La clase `FontCache` es una clase que se encarga de almacenar las fuentes que se cargan en el juego. La clase
`FontManager` es una clase que se encarga de gestionar las fuentes que se cargan en el juego.

### FontCache

```java
    package util.cache;
    
    import javax.swing.*;
    import java.awt.*;
    import java.io.File;
    import java.util.HashMap;
    import java.util.Map;
    
    /**
     * Clase que implementa un caché de fuentes
     */
    public class FontCache {
    
        /**
         * Instancia de la clase
         */
        private static FontCache instance;
        /**
         * Mapa que almacena las fuentes
         */
        private final Map<String, Font> fontCache;
    
        /**
         * Constructor de la clase
         */
        private FontCache() {
    
            fontCache = new HashMap<>();
        }
    
        /**
         * Método que devuelve la instancia de la clase
         *
         * @return instancia de la clase
         */
        public static FontCache getInstance() {
    
            if (instance == null) {
                instance = new FontCache();
            }
            return instance;
        }
    
        /**
         * Método que lanza una excepción si se intenta clonar la clase
         *
         * @return excepción
         *
         * @throws CloneNotSupportedException excepción
         */
        @Override
        public Object clone() throws CloneNotSupportedException {
    
            throw new CloneNotSupportedException("Clonación no permitida para la clase Singleton.");
        }
    
        public void addFont(String fontName, Font font){
    
            fontCache.put(fontName, font);
        }
    
        /**
         * Método que añade una fuente al caché
         *
         * @param fontName nombre de la fuente
         * @param file     archivo de la fuente
         * @param size     tamaño de la fuente
         */
        public void addFont(String fontName, File file, float size) {
    
            try {
                Font font = Font.createFont(Font.TRUETYPE_FONT, file).deriveFont(size);
                fontCache.put(fontName, font);
            } catch (Exception e) {
                JOptionPane.showMessageDialog(null, "Error al cargar la fuente: " + fontName,
                        "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    
        /**
         * Método que devuelve una fuente del caché
         *
         * @param fontName nombre de la fuente
         *
         * @return fuente
         */
        public Font getFont(String fontName) {
    
            return fontCache.get(fontName);
        }
    
        /**
         * Método que elimina una fuente del caché
         *
         * @param fontName nombre de la fuente
         */
        public void removeFont(String fontName) {
    
            fontCache.remove(fontName);
        }
    
        /**
         * Método que limpia el caché
         */
        public void clearCache() {
    
            fontCache.clear();
        }
    
        /**
         * Método que comprueba si el caché contiene una fuente
         *
         * @param fontName nombre de la fuente
         *
         * @return true si el caché contiene la fuente, false en caso contrario
         */
        public boolean containsFont(String fontName) {
    
            return fontCache.containsKey(fontName);
        }
    
        /**
         * Método que imprime el caché
         */
        public void printCache() {
    
            for (Map.Entry<String, Font> entry : fontCache.entrySet()) {
                System.out.println(entry.getKey() + " : " + entry.getValue());
            }
        }
    
        /**
         * Método que comprueba si el caché está vacío
         *
         * @return true si el caché está vacío, false en caso contrario
         */
        public boolean isCacheEmpty() {
    
            return fontCache.isEmpty();
        }
    }
```

### FontManager

```java
    package util.managers;
    
    import util.cache.FontCache;
    
    import java.awt.*;
    import java.io.File;
    
    public class FontManager {
    
        private static FontManager instance;
    
        private final FontCache fontCache;
    
        private FontManager() {
    
            fontCache = FontCache.getInstance();
            initFonts();
        }
    
        private void initFonts() {
    
            fontCache.addFont("Game Title", new File("fonts\\fortune.otf"), 24f);
            fontCache.addFont("Game File", new File("fonts\\player.ttf"), 20f);
            fontCache.addFont("Player Status", new File("fonts\\player.ttf"), 16f);
            fontCache.addFont("Player", new File("fonts\\player.ttf"), 16f);
            fontCache.addFont("Standard", new Font("Arial", Font.BOLD, 15));
        }
    
        public static FontManager getInstance() {
    
            if (instance == null) {
                instance = new FontManager();
            }
            return instance;
        }
    
        public Font getFont(String fontName) {
    
            return fontCache.getFont(fontName);
        }
    }
```

## FileManager

La clase `FileManager` es una clase que se encarga de gestionar los archivos que se cargan en el juego.

```java
    package util.managers;
    
    import player.Player;
    
    import java.io.*;
    
    public class FileManager {
    
        public static Player loadGame(File file) throws FileNotFoundException {
    
            Player player;
            try {
                player = (Player) new ObjectInputStream(new FileInputStream(file)).readObject();
            } catch (IOException | ClassNotFoundException e) {
                throw new FileNotFoundException("No se encontró el archivo");
            }
            return player;
        }
    
        public static void saveGame(Player player) {
    
            ObjectOutputStream oos = null;
            try {
                oos = new ObjectOutputStream(new FileOutputStream("files/game.dat"));
                oos.writeObject(player);
                try {
                    oos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```
