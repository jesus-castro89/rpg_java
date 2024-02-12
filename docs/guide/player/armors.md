---
icon: shield
title: Armaduras y Armas
description: Porque una personaje no es nada sin su armadura y su arma de batalla.
---

Como bien es sabido, un juego de RPG básico no es nada sin las armas y armaduras para nuestro personaje, y este no será
la excepción, por lo tanto deberemos de crear dos clases básicas en sus respectivos paquetes: "Armor", "Weapon", ambas
clases contarán con los siguientes atributos:

- name
    - El nombre de nuestra arma o armadura.
- description
    - La descripción del arma o armadura a mostrar.
- price
    - El precio de compraventa de nuestra arma o armadura.

Si gustas puedes agregar otros atríbutos que puedan sumarse al personaje por ejemplo, esto quedará a tu criterio. De
igual forma deberá crear de cada clase, dos clases hijas o derivadas y agregar al menos un atríbuto o función diferente
a las clases base.

Para ejemplos practicos, veamos mis clases Weapon y Armor:

::: code-tabs#java
@tab Weapon.java

```java
package items.weapons;

public class Weapon {

    protected String name;
    protected int attack;
    protected int price;
    protected String description;
}
```

@tab Armor.java

```java
package items.armors;

public class Armor {

    protected String name;
    protected int defense;
    protected int price;
    protected String description;
}
```

:::
