from flask import Flask, request, jsonify
from flask_cors import CORS  # Make sure you have this line
import random  # For mock analysis
import os
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env


# Use os.getenv to get the API key from environment variables
API_KEY = os.getenv("MY_API_KEY")
print(API_KEY)  # This will print the API key if set correctly

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    print(data)
    text = data.get('text', '')

    # Basic mock analysis logic (replace this with your actual analysis)
    if 'fake' in text.lower():
        alert = 'Fake news detected!'
        source_score = random.uniform(0, 0.5)  # Example score
    elif 'fraud' in text.lower():
        alert = 'Fake news detected!'
        source_score = random.uniform(0, 0.5)  # Example score
    else:
        alert = 'No fake news detected.'
        source_score = random.uniform(0.5, 1)  # Example score

    # Create a response based on analysis
    response = {
        'source_score': source_score,
        'analysis_result': {
            'alert': alert
        },
        'final_score': source_score  # Adjust based on your logic
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
