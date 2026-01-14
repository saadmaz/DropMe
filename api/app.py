from flask import Flask, request, jsonify
from flask_cors import CORS
import logic 

app = Flask(__name__)
CORS(app) 

# This is the "Entry Point" Vercel looks for
@app.route('/api/calculate', methods=['POST'])
def handle_calculate():
    data = request.json
    # The frontend sends lowercase keys, logic expects capitalized city names [cite: 97, 190]
    result = logic.calculate_trip(
        data['from'], 
        data['to'], 
        data['mode'], 
        data.get('promoCode')
    )
    return jsonify(result)

@app.route('/api/validate-promo', methods=['POST'])
def handle_validate():
    # Promo codes in the original system are case-insensitive [cite: 98]
    code = request.json.get('code', '').lower()
    # Check against the promo dictionary in logic.py [cite: 127, 234]
    valid = code in logic.promo_codes
    # Return the KMD reduction value [cite: 84]
    discount = logic.promo_codes.get(code, 0)
    return jsonify({"valid": valid, "discount": discount})

# Keep this for local testing only
if __name__ == '__main__':
    app.run(debug=True, port=5000)