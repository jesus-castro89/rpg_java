---
icon: sword
title: EnemyFactory
description: Creando enemigos de forma dinámica con EnemyFactory.
---

# EnemyFactory

La clase `EnemyFactory` es una clase que se encarga de crear enemigos de forma dinámica. Esta clase es muy útil cuando
necesitas crear enemigos de forma dinámica en tu juego.

## Creando un enemigo

Para crear un enemigo, simplemente debes llamar al método `generateRegularEnemy` de la clase `EnemyFactory`. Este método
no recibe ningún parámetro y devuelve un enemigo de tipo `RegularEnemy`.

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
        public static Enemy generateRegularEnemy() {
    
            Player player = Player.getInstance();
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
    }
```

En el código anterior, se muestra cómo se puede crear un enemigo de forma dinámica. La clase `EnemyFactory` tiene un
método llamado `generateRegularEnemy` que se encarga de crear un enemigo de forma dinámica. Este método utiliza la
librería Reflections para obtener todas las clases que tienen la anotación `RegularEnemy`. Luego, selecciona una clase
aleatoria de la lista y crea una instancia de esa clase.

## Anotación RegularEnemy

Para que una clase pueda ser seleccionada por la clase `EnemyFactory`, debe tener la anotación `RegularEnemy`. Esta
anotación no tiene ningún atributo y se utiliza simplemente para marcar las clases que pueden ser seleccionadas por la
clase `EnemyFactory`.

```java
    package util.annotations;
    
    import java.lang.annotation.*;
    
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface RegularEnemy {
    }
```

En el código anterior, se muestra cómo se puede crear una anotación llamada `RegularEnemy`. Esta anotación se utiliza
para marcar las clases que pueden ser seleccionadas por la clase `EnemyFactory`.

## Creando una clase de enemigo

Para crear una clase de enemigo que pueda ser seleccionada por la clase `EnemyFactory`, simplemente debes añadir la
anotación `RegularEnemy` a la clase. Por ejemplo, la clase `TinyBat` es una clase de enemigo que tiene la anotación
`RegularEnemy`.

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
    
            Player player = Player.getInstance();
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

En el código anterior, se muestra cómo se puede crear una clase de enemigo que puede ser seleccionada por la clase
`EnemyFactory`. La clase `TinyBat` tiene la anotación `RegularEnemy`, lo que significa que puede ser seleccionada por la
clase `EnemyFactory`.

## Conclusión

La clase `EnemyFactory` es una clase muy útil cuando necesitas crear enemigos de forma dinámica en tu juego. Esta clase
te permite crear enemigos de forma aleatoria y añadir variedad a tu juego. Además, la anotación `RegularEnemy` te
permite marcar las clases que pueden ser seleccionadas por la clase `EnemyFactory`. En resumen, la clase `EnemyFactory`
es una herramienta muy útil para crear enemigos de forma dinámica en tu juego.
