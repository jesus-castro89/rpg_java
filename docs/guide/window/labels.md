---
icon: window-restore
title: Las etiquetas y botones de la ventana
description: Aprende a personalizar las etiquetas y botones de la ventana.
---

## Las etiquetas y botones de la ventana

Las ventanas de la aplicación tienen una serie de etiquetas y botones que permiten al usuario interactuar con ellas. En
esta guía aprenderás a personalizar estas etiquetas y botones.

## SpriteLabel

La clase `SpriteLabel` es una etiqueta que se puede personalizar con un sprite. Puedes usarlo para mostrar un icono o
una imagen en la ventana.

```java
    package gui.labels;
    
    import util.interfaces.Dimensions;
    
    import javax.swing.*;
    import java.awt.*;
    
    public class SpriteLabel extends JLabel {
    
        protected Image image;
    
        public SpriteLabel(Image image) {
    
            this.image = image;
            Dimension size = Dimensions.SPRITE_SIZE;
            setPreferredSize(size);
            setMinimumSize(size);
            setMaximumSize(size);
            setSize(size);
            setOpaque(false);
            setVisible(true);
        }
    
        public void updateImage(Image image) {
    
            this.image = image;
            repaint();
        }
    
        @Override
        public void paintComponent(Graphics g) {
    
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g;
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            paintImage(g2d);
        }
    
        protected void paintImage(@NotNull Graphics2D g2d) {
        
            int w = Math.min(image.getWidth(null), Dimensions.SPRITE_SIZE.width);
            int h = Math.min(image.getHeight(null), Dimensions.SPRITE_SIZE.height);
            int x = ((Dimensions.DIALOG_PANEL_SIZE.width / 2) - w) / 2;
            int y = (Dimensions.SPRITE_SIZE.height - h) / 2;
            g2d.drawImage(image, x, y, w, h, null);
        }
    }
```

## PlayerSpriteLabel

La clase `PlayerSpriteLabel` es una etiqueta que muestra el sprite del jugador. Puedes usarlo para mostrar la imagen del
jugador en la ventana.

```java
    package gui.labels;
    
    import util.interfaces.Dimensions;
    
    import java.awt.*;
    
    public class PlayerSpriteLabel extends SpriteLabel {
    
        public PlayerSpriteLabel(Image image) {
    
            super(image);
            Dimension size = Dimensions.PLAYER_SPRITE_SIZE;
            setPreferredSize(size);
            setMinimumSize(size);
            setMaximumSize(size);
            setSize(size);
        }
    
        @Override
        protected void paintImage(Graphics2D g2d) {
    
            int w = Math.min(image.getWidth(null), Dimensions.PLAYER_SPRITE_SIZE.width);
            int h = Math.min(image.getHeight(null), Dimensions.PLAYER_SPRITE_SIZE.height);
            int x = ((Dimensions.DIALOG_PANEL_SIZE.width / 2) - w) / 2;
            int y = (Dimensions.SPRITE_SIZE.height - h) / 2;
            g2d.drawImage(image, x, y, w, h, null);
        }
    }
```

## HpLabel

La clase `HpLabel` es una etiqueta que muestra el valor de la salud del jugador. Puedes usarlo para mostrar el valor de
la salud en la ventana.

```java
    package gui.labels;
    
    import characters.BasicCharacter;
    import util.interfaces.Dimensions;
    import util.managers.FontManager;
    import util.managers.ImageManager;
    
    import javax.swing.*;
    import java.awt.*;
    
    public class HpLabel extends JLabel {
    
        protected BasicCharacter character;
        protected Image image;
        protected String displayText;
    
        public HpLabel(BasicCharacter character) {
    
            super(character.getName());
            this.character = character;
            init();
            Font font = FontManager.getInstance().getFont("Standard");
            Dimension size = Dimensions.BAR_SIZE;
            setPreferredSize(size);
            setMinimumSize(size);
            setMaximumSize(size);
            setSize(size);
            setBorder(BorderFactory.createEmptyBorder(10, 0, 0, 0));
            setFont(font);
        }
    
        protected void init() {
    
            displayText = String.format("%d/%d", character.getHp(), character.getMaxHp());
            double hpPercentage = (double) character.getHp() / character.getMaxHp();
            ImageManager imageManager = ImageManager.getInstance();
            Color color;
            if (hpPercentage >= .8) {
                image = imageManager.getImage("hp100");
                color = new Color(0, 0, 0, 255);
            } else if (hpPercentage > 0.6) {
                image = imageManager.getImage("hp80");
                color = new Color(0, 0, 0, 255);
            } else if (hpPercentage > 0.4) {
                image = imageManager.getImage("hp60");
                color = new Color(109, 109, 109, 255);
            } else if (hpPercentage > 0.2) {
                image = imageManager.getImage("hp40");
                color = new Color(109, 109, 109, 255);
            } else if (hpPercentage > 0) {
                image = imageManager.getImage("hp20");
                color = new Color(109, 109, 109, 255);
            } else {
                image = imageManager.getImage("hp0");
                color = new Color(255, 255, 255, 255);
            }
            setForeground(color);
        }
    
        public void updateCharacter(BasicCharacter character) {
    
            this.character = character;
            init();
            repaint();
        }
    
        @Override
        protected void paintComponent(Graphics g) {
    
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g;
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
            paintImage(g2d);
        }
    
        protected void paintImage(Graphics2D g2d) {
    
            g2d.drawImage(image, 0, 0, null);
            int textPositionY = image.getHeight(null) / 2 + 1 + g2d.getFontMetrics().getHeight() / 4;
            int textPositionX = ((image.getWidth(null) - 28) / 2) + 28 - (g2d.getFontMetrics().stringWidth(displayText) / 2);
            g2d.translate(textPositionX, textPositionY);
            g2d.drawString(displayText, 0, 0);
        }
    
        public void setText(String text) {
    
            this.displayText = text;
            repaint();
        }
    }
```

## MpLabel

La clase `MpLabel` es una etiqueta que muestra el valor de la energía mágica del jugador. Puedes usarlo para mostrar el
valor de la energía mágica en la ventana.

```java
    package gui.labels;
    
    import characters.BasicCharacter;
    
    import javax.swing.*;
    import java.awt.*;
    
    public class MpLabel extends HpLabel {
    
        public MpLabel(BasicCharacter character) {
    
            super(character);
        }
    
        @Override
        protected void init() {
    
            displayText = String.format("%d/%d", character.getMp(), character.getMaxMp());
            double hpPercentage = (double) character.getMp() / character.getMaxMp();
            Color color;
            if (hpPercentage >= .8) {
                image = new ImageIcon("img/player/mp100.png").getImage();
                color = new Color(0, 0, 0, 255);
            } else if (hpPercentage > 0.6) {
                image = new ImageIcon("img/player/mp80.png").getImage();
                color = new Color(0, 0, 0, 255);
            } else if (hpPercentage > 0.4) {
                image = new ImageIcon("img/player/mp60.png").getImage();
                color = new Color(109, 109, 109, 255);
            } else if (hpPercentage > 0.2) {
                image = new ImageIcon("img/player/mp40.png").getImage();
                color = new Color(109, 109, 109, 255);
            } else if (hpPercentage > 0) {
                image = new ImageIcon("img/player/mp20.png").getImage();
                color = new Color(109, 109, 109, 255);
            } else {
                image = new ImageIcon("img/player/mp0.png").getImage();
                color = new Color(255, 255, 255, 255);
            }
            setForeground(color);
        }
    
        @Override
        protected void paintImage(Graphics2D g2d) {
    
            g2d.drawImage(image, 0, 0, null);
            int textPositionY = image.getHeight(null) / 2 + 1 + g2d.getFontMetrics().getHeight() / 4;
            int textPositionX = ((image.getWidth(null) / 2) - 14
                                - (g2d.getFontMetrics().stringWidth(displayText) / 2));
            g2d.translate(textPositionX, textPositionY);
            g2d.drawString(displayText, 0, 0);
        }
    }
```

## ActionButton

La clase `ActionButton` es un botón que muestra una acción que el jugador puede realizar. Puedes usarlo para mostrar las
acciones disponibles en la ventana.

```java
    package gui.buttons;
    
    import gui.events.ButtonCursorAdapter;
    import util.interfaces.Dimensions;
    import util.managers.FontManager;
    import util.managers.ImageManager;
    
    import javax.swing.*;
    import java.awt.*;
    
    public abstract class ActionButton extends JButton {
    
        private final String displayText;
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
            Dimension size = Dimensions.BUTTON_SIZE;
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
