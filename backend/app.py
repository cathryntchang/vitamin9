import os
from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Sample quotes (you can expand this list)
QUOTES = [
    {
        "quote": "Be the change you wish to see in the world.",
        "author": "Mahatma Gandhi"
    },
    {
        "quote": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs"
    },
    {
        "quote": "Innovation distinguishes between a leader and a follower.",
        "author": "Steve Jobs"
    },
    {
        "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "author": "Winston Churchill"
    },
    {
        "quote": "Believe you can and you're halfway there.",
        "author": "Theodore Roosevelt"
    }
]

@app.route('/api/random-quote', methods=['GET'])
def get_random_quote():
    """
    Endpoint to return a random quote from the list
    """
    return jsonify(random.choice(QUOTES))

# For local development
if __name__ == '__main__':
    # Use environment variable for port, default to 5000
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port, debug=True)