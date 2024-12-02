from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import random

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

CORS(app)

# Function to generate random data
def generate_random_data():
    while True:
        # Simulate random data generation
        data = {
            'temperature': random.uniform(20.0, 30.0),  # Random temperature between 20 and 30
            'humidity': random.uniform(30.0, 70.0),     # Random humidity between 30 and 70
            'gas_level': random.uniform(0.0, 100.0)     # Random gas level between 0 and 100
        }
        # Emit the random data to the client
        socketio.emit('random_data', data)
        socketio.sleep(5)  # Use socketio.sleep instead of time.sleep

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Start the background task using SocketIO's built-in method
    socketio.start_background_task(generate_random_data)
    # Start the SocketIO server
    socketio.run(app, host='0.0.0.0', port=5000)
