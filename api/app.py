from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from pymongo import MongoClient

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Konfigurasi MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Ganti jika MongoDB Anda berada di host lain
db = client['sensor_data_db']
collection = db['sensor_data']

@app.route('/')
def index():
    data = list(collection.find({}, {"_id": 0}))  # Tidak menyertakan _id
    return render_template('index.html', data=data)
    # return "Flask server is running. Use the /data endpoint to send data."

# Endpoint untuk menerima data dari Arduino
@app.route('/data', methods=['POST'])
def receive_data():
    try:
        # Ambil data JSON dari request
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        # Simpan data ke MongoDB
        collection.insert_one(data)

        # Emit data ke klien menggunakan SocketIO
        socketio.emit('sensor_data', data)

        return jsonify({"message": "Data received and saved successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint untuk mendapatkan semua data dari MongoDB
@app.route('/data', methods=['GET'])
def get_data():
    try:
        # Ambil semua data dari MongoDB
        data = list(collection.find({}, {"_id": 0}))  # Tidak menyertakan _id
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Jalankan server Flask
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
