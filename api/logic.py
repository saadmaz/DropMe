import random
from datetime import datetime

# Kingdom of Miranda City Matrix
cities_price_list = {
    'Alvin': {'Alvin': 0, 'Jamz': 20, 'Razi': 40, 'Mali': 40, 'Zuhar': 20},
    'Jamz': {'Alvin': 20, 'Jamz': 0, 'Razi': 20, 'Mali': 40, 'Zuhar': 40},
    'Razi': {'Alvin': 40, 'Jamz': 20, 'Razi': 0, 'Mali': 20, 'Zuhar': 40},
    'Mali': {'Alvin': 40, 'Jamz': 40, 'Razi': 20, 'Mali': 0, 'Zuhar': 20},
    'Zuhar': {'Alvin': 20, 'Jamz': 40, 'Razi': 40, 'Mali': 20, 'Zuhar': 0}
}

vehicle_prices = {'trishaw': 1, 'car': 2, 'van': 3}
promo_codes = {f"pro{i}": i for i in range(1, 16)}

def calculate_trip(departure, destination, mode, promo_code=None):
    try:
        # Standardize inputs: Remove spaces and Force Capitalization
        start = str(departure or "").strip().capitalize()
        end = str(destination or "").strip().capitalize()
        vehicle = str(mode or "trishaw").strip().lower()

        # Validation to prevent KeyError crash
        if start not in cities_price_list or end not in cities_price_list[start]:
            return {"error": f"Invalid route: {start} to {end}"}

        # Calculation logic
        base = cities_price_list[start][end]
        multiplier = vehicle_prices.get(vehicle, 1)
        gross = base * multiplier
        
        promo_val = 0
        random_val = 0
        
        # Promo validation
        if promo_code:
            clean_code = str(promo_code).strip().lower()
            promo_val = promo_codes.get(clean_code, 0)
        else:
            # 33% chance for random 5 KMD reduction
            if random.randint(1, 3) == 1:
                random_val = 5
                
        total = max(gross - promo_val - random_val, 0)
        
        now = datetime.now()
        return {
            "timestamp": now.strftime("%Y-%m-%d %H:%M:%S"),
            "filename": f"{now.strftime('%Y%m%d_%H%M%S')}_{random.randint(1000, 9999)}.txt",
            "from": start,
            "to": end,
            "mode": vehicle,
            "grossAmount": float(gross),
            "promoDiscount": float(promo_val),
            "randomReduction": float(random_val),
            "totalFinal": float(total)
        }
    except Exception as e:
        return {"error": str(e)}