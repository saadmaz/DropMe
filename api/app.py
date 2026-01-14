from flask import Flask, request, jsonify
from flask_cors import CORS
import logic

app = Flask(__name__)
CORS(app) # Links the backend to external frontend requests

@app.route('/api/calculate', methods=['POST'])
def handle_calculate():
    data = request.json
    result = logic.calculate_trip(
        data['from'], 
        data['to'], 
        data['mode'], 
        data.get('promoCode')
    )
    return jsonify(result)

@app.route('/api/validate-promo', methods=['POST'])
def handle_validate():
    code = request.json.get('code', '').lower()
    valid = code in logic.promo_codes
    return jsonify({"valid": valid, "discount": logic.promo_codes.get(code, 0)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)