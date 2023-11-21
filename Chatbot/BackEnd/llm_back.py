from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/message', methods=['POST'])
def handle_message():
    data = request.json
    user_message = data['message']

    # Example logic: Echo back the user message
    bot_response = f"Bot: You said '{user_message}'"
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='localhost', port=5000)