---
icon: user
title: Actualizando el Jugador
description: En esta ocasión debemos de actualizar nuestra clase Player para generar los stats de forma aleatoria mientras agregamos las mecánicas de atacar y recibir daño.
---

## BasicCharacter

Antes de modificar a nuestro jugador, es hora de modificar a nuestra clase base de la siguiente manera:

```java{22-24,26-28}
    package characters;
    
    public abstract class BasicCharacter {
    
        protected String name;
        protected int hp;
        protected int mp;
        protected int maxHp;
        protected int maxMp;
    
        public BasicCharacter(String name, int hp, int mp) {
    
            this.name = name;
            this.hp = hp;
            this.mp = mp;
            this.maxHp = hp;
            this.maxMp = mp;
        }
    
        public abstract void displayData();
    
        public void takeDamage(int damage) {
            hp -= damage;
        }
    
        public boolean isDead() {
            return hp <= 0;
        }
    }
```

## Player

Con el enemigo creado, es momento de modificar a nuestro Player para agregar un conjunto de funciones para recibir y
hacer daño a los enemigos.

### randomizeStats

La función randomizeStats permitirá asignar un número de puntos determinado entre la totalidad de stats del personaje.

```java
    public void randomizeStats(int maxPoints) {

		int stat = Randomized.randomizeNumber(1, 5);
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
			}
			maxPoints--;
			stat = Randomized.randomizeNumber(1, 5);
		}
	}
```

En esta clase de ejemplo, podemos ver que se toman 30 puntos totales entre los 5 stats del personaje, si notamos en el
ciclo **while** continuará el ciclo siempre que el total sea mayor a 0. Una vez hecho lo anterior, se estará generando
un valor aleatorio entre 1 y 5. Una vez tomado dicho valor, se sumará 1 al stat seleccionado de acuerdo al **Switch**,
para que al finalizar, se disminuya el valor de puntos a asignar.

Para que esto funcione, deberemos de invocar esta función dentro el constructor.

```java
    public Player(String name) {
    
        super(name, 30, 10);
        experience = 0;
        level = 1;
        gold = 0;
        weapon = null;
        armor = null;
        randomizeStats(30);
    }
```

### attack, gainExperience, gainGold

La función attack del personaje deberá permitir causar al enemigo una cantidad de daño determinada de la siguiente
manera:

```java
    public void attack(Enemy enemy) {

		System.out.println(getName() + " attacks for " + getDamage() + " damage!");
		enemy.takeDamage(getDamage());
		if (enemy.isDead()) {

			gainExperience(enemy.getExperience());
			gainGold(enemy.getGold());
		}
	}
    
    public void gainExperience(int experience) {

        this.experience += experience;
    }

    public void gainGold(int gold) {
    
        this.gold += gold;
    }
```

### getDamage

Recordemos que el ataque del jugador se suma al ataque de su arma, si es que tuviera alguna, es por eso que la función
getDamage, permite obtener este valor sin modificar directamente el ataque del personaje.

```java
    public int getDamage() {
    
        return weapon != null ? strength + weapon.getAtk() : strength;
    }
```

### takeDamage

Por su lado, tenemos que agregar la función de recepción de daño por parte del enemigo, por lo que deberemos de agregar
una lógica determinada.

```java
    public void takeDamage(int damage) {

        if (armor != null) {
        
            damage -= armor.getDef();
            if (damage < 0) damage = 0;
        }
        super.takeDamage(damage);
        if (isDead()) printDeath();
    }
```

Recuerda que en este caso la función isDead es similar a la de Enemy, pero con los atributos del jugador.

> [!important]
> Para probar estos cambios, crearemos un enemigo a tu gusto y con nuestro personaje atacaremos al enemigo y haremos que
> el enemigo ataque a nuestro jugador por al menos 3 ocasiones para mostrar en pantalla la interacción entre ambos.
