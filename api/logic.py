import random
import os
from datetime import datetime

# Core pricing and promo data from original dm.py [cite: 113, 127]
cities_price_list = {
    'Alvin': {'Alvin': 0, 'Jamz': 20, 'Razi': 40, 'Mali': 40, 'Zuhar': 20},
    'Jamz': {'Alvin': 20, 'Jamz': 0, 'Razi': 20, 'Mali': 40, 'Zuhar': 40},
    'Razi': {'Alvin': 40, 'Jamz': 20, 'Razi': 0, 'Mali': 20, 'Zuhar': 40},
    'Mali': {'Alvin': 40, 'Jamz': 40, 'Razi': 20, 'Mali': 0, 'Zuhar': 20},
    'Zuhar': {'Alvin': 20, 'Jamz': 40, 'Razi': 40, 'Mali': 20, 'Zuhar': 0}
}
vehicle_prices = {'trishaw': 1, 'car': 2, 'van': 3} # [cite: 121]
promo_codes = {f"pro{i}": i for i in range(1, 16)} # [cite: 144]

def calculate_trip(departure, destination, mode, promo_code=None):
    # Retrieve base fare from the city list [cite: 200]
    base = cities_price_list[departure.capitalize()][destination.capitalize()]
    gross = base * vehicle_prices[mode.lower()] # [cite: 201]
    
    promo_val = 0
    random_val = 0
    
    # Check for valid promo code [cite: 176, 179]
    if promo_code and promo_code.lower() in promo_codes:
        promo_val = promo_codes[promo_code.lower()]
    elif not promo_code:
        # Apply 33.33% chance random discount [cite: 183, 184]
        if random.randint(1, 3) == 1:
            random_val = 5
            
    total = max(gross - promo_val - random_val, 0) # [cite: 180, 185]
    
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    # Generate filename based on requirements [cite: 206]
    filename = f"{now.strftime('%Y-%m-%d %H_%M_%S')}_{random.randint(1000, 9999)}.txt"
    
    return {
        "timestamp": timestamp,
        "filename": filename,
        "from": departure,
        "to": destination,
        "mode": mode,
        "grossAmount": gross,
        "promoDiscount": promo_val,
        "randomReduction": random_val,
        "totalFinal": total
    }