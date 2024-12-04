from flask import Flask, render_template, jsonify
import os
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/data/<chart_type>.json')
def get_chart_data(chart_type):
    try:
        with open(os.path.join('static', 'data', f'{chart_type}.json')) as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': f'File {chart_type}.json not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
