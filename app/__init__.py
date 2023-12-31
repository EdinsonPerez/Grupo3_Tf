import mysql.connector
from flask_cors import CORS
from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.utils import secure_filename



class Registro:
    registro = []
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.conn.cursor(dictionary=True)

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS clientes (
            dni INT,
            nombre VARCHAR(20) NOT NULL,
            apellido VARCHAR(20) NOT NULL,
            direccion VARCHAR(35) NOT NULL,
            ciudad VARCHAR(25) NOT NULL,
            cp INT,
            nacimiento INT)''')
        self.conn.commit()  
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)   

    def agregar_cliente(self, dni, nom, ape, dire, ciu, cp, nac):
        self.cursor.execute(f"SELECT * FROM clientes WHERE dni = {dni}")
        cliente_exist = self.cursor.fetchone()
        if cliente_exist:
            return False

        sql = f"INSERT INTO clientes \
                (dni, nombre, apellido, direccion, ciudad, cp, nacimiento) \
                VALUES \
                ({dni}, '{nom}', '{ape}', '{dire}', '{ciu}', {cp} , {nac})"
        self.cursor.execute(sql)
        self.conn.commit()
        return True                                    

    def mostrar_clientes(self):
        print("-" * 40)
        if not self.clientes:  # Debería ser self.clientes en lugar de solo clientes
            print("sin cliente")
        else:
            for cliente in self.listar_clientes():
                print(f"Dni...........: {cliente['dni']}")
                print(f"Nombre........: {cliente['nombre']}")
                print(f"Apellido......: {cliente['apellido']}")
                print(f"Direccion.....: {cliente['direccion']}")
                print(f"Ciudad........: {cliente['ciudad']}")
                print(f"Cp............: {cliente['cp']}")
                print(f"Nacimiento....: {cliente['nacimiento']}")
                print("-" * 40)
            else:
                print("Cliente no encontrado.")

    def listar_clientes(self):
        self.cursor.execute("SELECT * FROM clientes")
        clientes = self.cursor.fetchall()
        print(f"Clientes obtenidos de la base de datos: {clientes}")
        return clientes
    
    
    def listar_clientes_by_dni(self, dni=None):
        if dni is not None:
            query = "SELECT * FROM clientes WHERE dni = %s"
            self.cursor.execute(query, (dni,))
        else:
            query = "SELECT * FROM clientes"
            self.cursor.execute(query)

        clientes = self.cursor.fetchall()
        print(f"Clientes obtenidos de la base de datos: {clientes}")
        return clientes



    def eliminar_cliente(self, dni):
        self.cursor.execute(f"DELETE FROM clientes WHERE dni = {dni}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    def modificar_cliente(self, dni, dire, ciu, cp,):
        sql = f"UPDATE clientes SET \
                direccion = '{dire}',\
                ciudad = '{ciu}',\
                cp = {cp}\
                WHERE dni = {dni}"
        self.cursor.execute(sql)
        self.conn.commit()
        return True 

    def consultar_cliente(self, dni):
        self.cursor.execute(f"SELECT * FROM clientes WHERE dni = {dni}")
        # return self.cursor.fetchone()
        cliente_exist = self.cursor.fetchone()
        if cliente_exist:
            return cliente_exist

# Crear instancia de la clase Registro después de su definición
registro = Registro(host='localhost', user='root', password='', database='clientes')
# registro.agregar_cliente(92154, "ana", "lopez", "costanera", "matanza", 1704, 120509) 
# print(registro.consultar_cliente(92154))
# print(registro.modificar_cliente(92154,"katy", "pinto", "jujuy", "la plata", 1600, 25121989))
# print(registro.eliminar_cliente(92154))

# Crear la aplicación Flask fuera de la clase
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, allow_headers="*")


@app.route("/clientes", methods=["GET"])
def listar_clientes():
    try:
        clientes = registro.listar_clientes()
        print(f"Clientes obtenidos de la base de datos: {clientes}")
        return jsonify({"clientes": clientes})
    except Exception as e:
        print(f"Error al obtener clientes: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/clientes/<int:dni>", methods=["GET"])
def listar_cliente_by_dni(dni):
    try:
        # Puedes acceder directamente al valor del DNI en la variable 'dni'
        clientes = registro.listar_clientes_by_dni(dni)
        print(f"Clientes obtenidos de la base de datos para DNI {dni}: {clientes}")
        return jsonify({"clientes": clientes})
    except Exception as e:
        print(f"Error al obtener clientes: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/clientes", methods=["POST"])
def agregar_cliente():
    try:
        data = request.form  # Puedes utilizar request.get_json() si estás enviando datos JSON
        dni = data['dni']
        nombre = data['nombre']
        apellido = data['apellido']
        direccion = data['direccion']
        ciudad = data['ciudad']  
        cp = data['cp']
        nacimiento = data['nacimiento']

        if registro.agregar_cliente(dni, nombre, apellido, direccion, ciudad, cp, nacimiento):
            return jsonify({"mensaje": "Cliente agregado"}), 201
        else:
            return jsonify({"mensaje": "Cliente ya existe"}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400
    
@app.route("/clientes/<int:dni>", methods=["POST"])
def modificar_cliente(dni):
    try:
        datos = request.get_json()
        nueva_direccion = datos.get("direccion")
        nueva_ciudad = datos.get("ciu")
        nuevo_cp = datos.get("cp")

        if registro.modificar_cliente(dni, nueva_direccion, nueva_ciudad, nuevo_cp):
            return jsonify({"mensaje": "Cliente modificado"}), 200
        else:
            return jsonify({"mensaje": "Cliente no encontrado"}), 404
    except Exception as e:
        print(f"Error al modificar cliente: {e}")
        return jsonify({"error": str(e)}), 500



# @app.route("/clientes/<int:dni>", methods=["PUT"])
# def modificar_cliente(dni):
#     try:
#         datos = request.get_json()
#         nueva_direccion = datos.get("direccion")
#         nueva_ciudad = datos.get("ciu")
#         nuevo_cp = datos.get("cp")

#         if registro.modificar_cliente(dni, nueva_direccion, nueva_ciudad, nuevo_cp):
#             return jsonify({"mensaje": "Cliente modificado"}), 200
#         else:
#             return jsonify({"mensaje": "Cliente no encontrado"}), 404
#     except Exception as e:
#         print(f"Error al modificar cliente: {e}")
#         return jsonify({"error": str(e)}), 500



    
@app.route("/clientes/<int:dni>", methods=["DELETE"])
def eliminar_cliente(dni):
    try:
        cliente = registro.consultar_cliente(dni)
        if cliente:
            if registro.eliminar_cliente(dni):
                return jsonify({"mensaje": "Cliente eliminado"}), 200
            else:
                return jsonify({"mensaje": "Error al eliminar el cliente"}), 500
        else:
            return jsonify({"mensaje": "Cliente no encontrado"}), 404
    except Exception as e:
        print(f"Error al eliminar cliente: {e}")
        return jsonify({"error": str(e)}), 500

#--------------------------------------------------------------------
# registro.agregar_cliente(92154, "ana", "lopez", "costanera", "matanza", 1704, 120509) 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


if __name__ == "__main__":
    app.run(debug=True)