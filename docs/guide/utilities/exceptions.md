---
icon: briefcase
title: Excepciones
description: Las excepciones de nuestro programa.
---

# Excepciones

Las excepciones son errores que ocurren durante la ejecución de un programa. Estos errores pueden ser de varios tipos,
como por ejemplo, errores de sintaxis, errores de lógica, errores de tiempo de ejecución, etc.

En Java, las excepciones son objetos que se lanzan cuando ocurre un error. Estos objetos pueden ser capturados y
tratados por el programador, para evitar que el programa se detenga.

## EnemyDeadException

Esta excepción se lanza cuando un enemigo muere.

```java
package gui.exceptions;

public class EnemyDeadException extends Exception {

    public EnemyDeadException() {
        super("El Enemigo recibió un overkill");
    }
}
```

## PlayerDeadException

Esta excepción se lanza cuando el jugador muere.

```java
    package gui.exceptions;
    
    public class PlayerDeadException extends Exception {
    
        public PlayerDeadException() {
            super("El jugador ha muerto");
        }
    }
```

## ZeroException

Esta excepción se lanza cuando se intenta dividir por cero.

```java
package gui.exceptions;

public class ZeroException extends Exception {

    public ZeroException() {
        super("El Dato ingresado en 0");
    }
}
```
