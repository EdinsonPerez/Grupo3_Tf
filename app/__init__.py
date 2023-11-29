import mysql.connector
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask import request
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

class Registro:

    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
        )
        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS clientes (
            dni INT NOT NULL,
            nombre VARCHAR(255) NOT NULL,
            apellido VARCHAR(255) NOT NULL,
            direccion VARCHAR(255) NOT NULL,
            ciudad VARCHAR(255) NOT NULL,
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
     
#      sql = "INSERT INTO clientes (dni, nombre, apellido, direccion, ciudad, cp, nac) VALUES (%s, %s, %s, %s, %s, %s, %s)"
# values = (dni, nom, ape, dire, ciu, cp, nac)
# self.cursor.execute(sql, values)


     sql = f"INSERT INTO clientes \
            (dni, nombre, apellido, direccion, ciudad, cp, nac) \
            VALUES \
            ({dni}, '{nom}', '{ape}', '{dire}', '{ciu}', {cp} , {nac})"
     self.cursor.execute(sql)
     self.conn.commit()
     return True                                    

    def mostrar_clientes(self):
        print("-"*40)
        for cliente in self.clientes:
            print(f"Dni...........: {cliente['dni']}" )
            print(f"Nombre........: {cliente['nombre']}" )
            print(f"Apellido......: {cliente['apellido']}" )
            print(f"Direccion.....: {cliente['direccion']}" )
            print(f"Ciudad........: {cliente['ciudad']}" )
            print(f"Cp............: {cliente['cp']}" )
            print(f"Nacimiento....: {cliente['nacimiento']}" )
            print("-"*40)
        else:
            print("Cliente no encontrado.")

    def listar_clientes(self):
        self.cursor.execute("SELECT * FROM clientes")
        clientes = self.cursor.fetchall()
        return clientes


    def eliminar_cliente(self, dni):
        self.cursor.execute(f"DELETE FROM clientes WHERE dni = {dni}")
        self.conn.commit()
        return self.cursor.rowcount > 0
  
    def modificar_cliente(self, dni, nom, ape, dire, ciu, cp, nac):
        sql = f"UPDATE clientes SET \
                nombre = '{nom}',\
                apellido = '{ape}',\
                direccion = '{dire}',\
                cuidad = '{ciu}',\
                cp = {cp},\
                nac = {nac}\
                WHERE dni = {dni}"
        self.cursor.execute(sql)
        self.conn.commit()
        return True 

    def consultar_cliente(self, dni):
        self.cursor.execute(f"SELECT * FROM clientes WHERE dni = {dni}")
        return self.cursor.fetchone()

registro = Registro('localhost','root','', 'miapp')

@app.route("/clientes", methods=["GET"])
def listar_clientes():
    try:
        clientes = registro.listar_clientes()
        print(f"Clientes obtenidos de la base de datos: {clientes}")
        return jsonify({"clientes": clientes})
    except Exception as e:
        print(f"Error al obtener clientes: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/clientes", methods=["POST"])
def agregar_cliente():
    try:
        data = request.get_json()
        dni = data['dni']
        nombre = data['nombre']
        apellido = data['apellido']
        direccion = data['direccion']
        ciudad = data['ciudad']  # Corregido de 'cuidad' a 'ciudad'
        cp = data['cp']
        nacimiento = data['nacimiento']

        if registro.agregar_cliente(dni, nombre, apellido, direccion, ciudad, cp, nacimiento):
            return jsonify({"mensaje": "Cliente agregado"}), 201
        else:
            return jsonify({"mensaje": "Cliente ya existe"}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400


@app.route("/clientes/<int:dni>", methods=["PUT"])
def modificar_cliente(dni):
    datos = request.form
    nueva_direccion = datos.get("direccion")
    nueva_cuidad = datos.get("cuidad")
    nuevo_cp = datos.get("cp")

    if registro.modificar_cliente(dni,nueva_direccion, nueva_cuidad, nuevo_cp):
        return jsonify({"mensaje": "Cliente modificado"}), 200
    else:
        return jsonify({"mensaje": "Cliente no encontrado"}), 404
    
@app.route("/clientes/<int:dni>", methods=["DELETE"])
def eliminar_cliente(dni):
    cliente = registro.consultar_cliente(cliente)
    if cliente:
        if registro.eliminar_cliente(dni):
            return jsonify({"mensaje": "Cliente eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el cliente"}), 500
    else:
        return jsonify({"mensaje": "Cliente no encontrado"}), 404
#--------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
