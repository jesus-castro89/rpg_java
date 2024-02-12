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

- **displayData**
    - Esta función permitirá mostrar los datos del personaje, puedes usar tu imaginación para destacar cada apartado del
      personaje.

Veamos un ejemplo de como sería esta clase:

```java
package characters;

import javax.swing.*;

public class BasicCharacter {

    private String name;
    private int hp;
    private int mp;
    private int maxHp;
    private int maxMp;

    public BasicCharacter(String name, int hp, int mp) {
        this.name = name;
        this.hp = hp;
        this.mp = mp;
        this.maxHp = hp;
        this.maxMp = mp;
    }
    
    public void displayData() {

        String output = String.format("Name: %s\n", name);
        output += String.format("\tHP: %d/%d\n", hp, maxHp);
        output += String.format("\tMP: %d/%d\n", mp, maxMp);
        JOptionPane.showMessageDialog(null, output);
    }
}
```

## Player

De esta primera clase deberemos de crear una clase hija llamada "Player con lo siguiente":

### Atributos

- **level**
    - El nivel actual del personaje
- **exp**
    - La experiencia del personaje
- **str**
    - La fuerza del personaje
- **def**
    - La defensa del personaje
- **dex**
    - La destreza del personaje
- **intll**
    - La inteligencia del personaje
- **luk**
    - La suerte del personaje.
    - **_Este es en mi caso el atríbuto extra que colocaré. Junto a tu equipo deberás pensar en tres más para tu
      personaje._**

### Funciones

- **Constructor vacío que solicitará el nombre del personaje.**
    - Este constructor iniciará los valores de Level a 1, Exp a 0, los puntos de hp y mp los dejamos a su consideración
      pero respetando un rango entre 10 y 20 puntos.
    - Por su lado, el resto de stats deberán de ser asignados de forma aleatoria 30 puntos entre todos los stats del
      personaje.
- **displayData**
    - Esta función permitirá mostrar los datos del personaje, puedes usar tu imaginación para destacar cada apartado del
      personaje.
- **attack**
    - Función básica del personaje que permitirá realizar ataques, etc.
- **flee**
    - Como todo, el personaje no siempre tendrá que terminar una pelea, por lo que siempre es bueno emprender la
      graciosa huida.
- **defend**
    - Sí así lo considera, el personaje podrá defenderse y evitar un daño contundente.

Veamos un ejemplo de como sería esta clase:

```java
package player;

import characters.BasicCharacter;

import javax.swing.*;

public class Player extends BasicCharacter {

    protected int experience;
    protected int level;
    protected int str;
    protected int dex;
    protected int def;
    protected int intll;
    protected int luk;

    public Player() {

        super(JOptionPane.showInputDialog("Ingresa el nombre del jugador: "), 20, 10);
        this.experience = 0;
        this.level = 1;
        this.str = 10;
        this.dex = 5;
        this.def = 5;
        this.intll = 5;
        this.luk = 5;
    }

    public void attack(BasicCharacter enemy) {

        int damage = str + (int) (Math.random() * 5);
        JOptionPane.showMessageDialog(null,
                String.format("%s ataca con %d de daño!", name, damage));
    }

    public void flee() {

        JOptionPane.showMessageDialog(null, "¡Has huido!");
    }

    public void defend() {

        JOptionPane.showMessageDialog(null, "¡Te has defendido!");
    }

    @Override
    public void displayData() {

        String output = String.format("Name: %s\n", name);
        output += String.format("\tHP: %d/%d\n", hp, maxHp);
        output += String.format("\tMP: %d/%d\n", mp, maxMp);
        output += String.format("\tExperience: %d\n", experience);
        output += String.format("\tLevel: %d\n", level);
        output += String.format("\tStrength: %d\n", str);
        output += String.format("\tDexterity: %d\n", dex);
        output += String.format("\tDefense: %d\n", def);
        output += String.format("\tIntelligence: %d\n", intll);
        output += String.format("\tLuck: %d\n", luk);
        JOptionPane.showMessageDialog(null, output);
    }
}
```

> [!important]
> Recuerda que para nuestro RPG, usaremos enteros positivos y sin punto decimal.

> [!warning]
> Es importante crear adecuadamente los nuevos stats colocando tanto su documentación como sus funciones de acceso
> adecuadas.
