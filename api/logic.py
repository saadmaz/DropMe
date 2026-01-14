import random
import os
from datetime import datetime

# Core pricing data for the Kingdom of Miranda
cities_price_list = {
    'Alvin': {'Alvin': 0, 'Jamz': 20, 'Razi': 40, 'Mali': 40, 'Zuhar': 20},
    'Jamz': {'Alvin': 20, 'Jamz': 0, 'Razi': 20, 'Mali': 40, 'Zuhar': 40},
    'Razi': {'Alvin': 40, 'Jamz': 20, 'Razi': 0, 'Mali': 20, 'Zuhar': 40},
    'Mali': {'Alvin': 40, 'Jamz': 40, 'Razi': 20, 'Mali': 0, 'Zuhar': 20},
    'Zuhar': {'Alvin': 20, 'Jamz': 40, 'Razi': 40, 'Mali': 20, 'Zuhar': 0}
}

# Multipliers for transport modes
vehicle_prices = {
    'trishaw': 1, 
    'car': 2, 
    'van': 3
} 

# Valid promotional codes
promo_codes = {f"pro{i}": i for i in range(1, 16)} 

def calculate_trip(departure, destination, mode, promo_code=None):
    # Ensure city names match dictionary keys
    start = departure.capitalize()
    end = destination.capitalize()
    vehicle = mode.lower()

    # Calculation logic for gross fare
    base = cities_price_list[start][end]
    gross = base * vehicle_prices[vehicle]
    
    promo_val = 0
    random_val = 0
    
    # Check for valid promo code and apply discount
    if promo_code and promo_code.lower() in promo_codes:
        promo_val = promo_codes[promo_code.lower()]
    elif not promo_code:
        # 33.33% chance for random 5 KMD reduction
        if random.randint(1, 3) == 1:
            random_val = 5
            
    # Final payment cannot be less than zero
    total = max(gross - promo_val - random_val, 0)
    
    # Generate timestamp and unique filename
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    filename = f"{now.strftime('%Y-%m-%d %H_%M_%S')}_{random.randint(1000, 9999)}.txt"
    
    # REMOVED: File saving logic (os.open / file.write)
    # NOTE: Vercel functions are read-only; saving files to disk will cause a crash.
    # The data is returned as JSON to the UI instead.
    
    return {
        "timestamp": timestamp,
        "filename": filename,
        "from": start,
        "to": end,
        "mode": vehicle,
        "grossAmount": float(gross),
        "promoDiscount": float(promo_val),
        "randomReduction": float(random_val),
        "totalFinal": float(total)
    }