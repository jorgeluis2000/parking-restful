# PRUEBA TECNICA

Se desarrolla una *API-Rest* para **AVÍATECNOLOGÍA**, la cual se basa en el desarrollo logico del funcionamiento de un parking.

## Desarrollo de la prueba Tecnica

<br>

>**IMPORTANTE!!!**: El *APi-Rest* funciona con una Base de datos SQL, trabaja principalmente con *PostgreSQL*.

### **Requisitos de ejecucion**

Es necesario tener en cuenta que este desarrollo fue hecho en **NodeJS** *v16.13*, si se desea que se ejecute el programa a la perfeccion es necesario tener la misma version de **NodeJS** que se usa en este **Back-end** o si require puede usar el docker-compose ya elaborado para una ejecucion rapida.

Ya cumpliendo con los anterires requisitos se debe contemplar la misma version de nodejs, escribir en la ventana de comandos.

```bash
npm i
```

o escribir y ejecutar

```bash
npm i cors crypto-js dotenv express http jsonwebtoken moment moment-timezone pg pg-hstore sequelize
```

### **Variables de entorno**

Las variables de entorno que utiliza el microservicio son:

```bash
DB_DIALECT="<cual base de datos se usa: postgres || mysql || mysqli> se requiere que sea postgres"
DB_USER="<usurio de la base de datos>"
DB_PASS="<password de la base de datos>"
DB_HOST="<domino o Ipv4 o Ipv6 donde se encuentra la base de datos>"
DB_PORT=<puerto de la base de datos>
DB_NAME="<nombre de la base de datos>"

NICK_SERVICE="<nick identificador para las credenciales de API-Key,  use por defecto parking>"
SECRETKEY="secret"
SECRETKEYTOKEN="secretkeytoken"
MAINWORD="exampleword"
REST_PORT=<puerto para el server REST>
TOKEN_AUTH="<Token de utenticacion>"
```

>***IMPORTANTE:*** Para generar el *TOKEN_AUTH* se debe usar el comando
>```
>npm run gen-token
>```
>y copiar ese token donde se requiere en el **Postman** y en las variables de entorno. Antes de generar el token se debe recordar que es necesario que ya esten definidas las variables de entorno *SECRETKEY*, *SECRETKEYTOKEN* y *MAINWORD*.
