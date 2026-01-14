from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# This block ensures logic.py is found regardless of Vercel's pathing
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    import logic
except ImportError:
    from . import logic

app = Flask(__name__)
CORS(app)

@app.route('/api/calculate', methods=['POST'])
def handle_calculate():
    try:
        # get_json handles the content-type validation automatically
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        # Pass standardized parameters to logic.py
        result = logic.calculate_trip(
            departure=data.get('from', ''), 
            destination=data.get('to', ''), 
            mode=data.get('mode', 'trishaw'), 
            promo_code=data.get('promoCode')
        )
        
        # If the logic found a KeyError or city mismatch, return 400
        if isinstance(result, dict) and "error" in result:
            return jsonify(result), 400
            
        return jsonify(result)
    except Exception as e:
        # This will now display the exact error message in your browser console
        return jsonify({"error": str(e)}), 500

@app.route('/api/validate-promo', methods=['POST'])
def handle_validate():
    try:
        data = request.get_json() or {}
        code = str(data.get('code', '')).lower().strip()
        valid = code in logic.promo_codes
        discount = logic.promo_codes.get(code, 0)
        return jsonify({"valid": valid, "discount": discount})
    except Exception as e:
        return jsonify({"valid": False, "error": str(e)})

# Vercel ignores the block below but keep for local testing
if __name__ == '__main__':
    app.run(debug=True, port=5000)