from flask import Flask, request, jsonify
from flask_cors import CORS
import logic 

app = Flask(__name__)
CORS(app) 

@app.route('/api/calculate', methods=['POST'])
def handle_calculate():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        # Use .get() with defaults to prevent crashes
        result = logic.calculate_trip(
            departure=data.get('from', ''), 
            destination=data.get('to', ''), 
            mode=data.get('mode', 'trishaw'), 
            promo_code=data.get('promoCode')
        )
        
        # If logic returned an error dictionary, pass it through
        if "error" in result:
            return jsonify(result), 400
            
        return jsonify(result)
    except Exception as e:
        # This will now show up clearly in Vercel Logs
        print(f"Server Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/validate-promo', methods=['POST'])
def handle_validate():
    data = request.json or {}
    code = data.get('code', '').lower().strip()
    valid = code in logic.promo_codes
    discount = logic.promo_codes.get(code, 0)
    return jsonify({"valid": valid, "discount": discount})

if __name__ == '__main__':
    app.run(debug=True, port=5000)