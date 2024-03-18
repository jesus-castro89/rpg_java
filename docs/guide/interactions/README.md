---
icon: gamepad
title: Lógica del Juego
description: Entendamos cual será la dinámica de nuestro juego.
---

Para esta parte deberemos de entender nuestro sistema temporal de juego, es decir como interactuará nuestro jugador con
los enemigos, etc.

## El flujo inicial

```flow:pie

st=>start: Inicio del Juego
ed=>end: Fin del Juego
c1=>condition: ¿Deseas Jugar?
c2=>condition: ¿Partida previa?
op1=>operation: Cargar Partida
op2=>operation: Crear nuevo Jugador
sub1=>subroutine: Menú de Juego

st->c1
c1(yes)->c2
c1(no)->ed
c2(yes)->op1->sub1
c2(no)->op2->sub1
sub1->ed

```

## El menú de Juego

Dentro de este menú lo que deberemos de hacer es permitir al jugador hacer alguna de las siguientes opciones:

1. Ver sus estadisticas
2. Ver su inventario
3. Atacar a los enemigos (siempre que exista alguno)
4. Equipar una armadura
5. Equipar un arma
6. Salir del juego

## El menú de ataque

Este submenú solo se abrirá cuando seleccionemos la opción 3 del menú previo, en este podremos atacar o intentar huir de
un enemigo mientras nosotros o el enemigo sigamos con vida.
