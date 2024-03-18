---
icon: gamepad
title: FileManager
description: Salvando y Cargando nuestro Juego.
---

## FileManager

Como te habrás dado cuenta, la clase Game hace uso del FileManager, que se encargará de guardar y cargar nuestra
partida, así que veamos como luce:

```java
package util;

import player.Player;

import java.io.*;

public class FileManager {

	public static Player loadGame() throws FileNotFoundException {

		Player player = null;
		try {
			player = (Player) new ObjectInputStream(new FileInputStream("files/game.dat")).readObject();
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

Y ahora con todas estas clases y excepciones, nuestro juego está listo para ser probado, así que adelante, crea los
enemigos que gustes en tu proyecto y pon a prueba a tu jugador.
