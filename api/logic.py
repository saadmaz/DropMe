import random
from datetime import datetime

# Core pricing data for the Kingdom of Miranda [cite: 10, 114-118]
cities_price_list = {
    'Alvin': {'Alvin': 0, 'Jamz': 20, 'Razi': 40, 'Mali': 40, 'Zuhar': 20},
    'Jamz': {'Alvin': 20, 'Jamz': 0, 'Razi': 20, 'Mali': 40, 'Zuhar': 40},
    'Razi': {'Alvin': 40, 'Jamz': 20, 'Razi': 0, 'Mali': 20, 'Zuhar': 40},
    'Mali': {'Alvin': 40, 'Jamz': 40, 'Razi': 20, 'Mali': 0, 'Zuhar': 20},
    'Zuhar': {'Alvin': 20, 'Jamz': 40, 'Razi': 40, 'Mali': 20, 'Zuhar': 0}
}

# Multipliers for transport modes [cite: 121-125, 233]
vehicle_prices = {
    'trishaw': 1, 
    'car': 2, 
    'van': 3
} 

# Valid promotional codes [cite: 85, 127-144, 234]
promo_codes = {f"pro{i}": i for i in range(1, 16)} 

def calculate_trip(departure, destination, mode, promo_code=None):
    try:
        # Standardize inputs to match dictionary keys [cite: 97, 190-192]
        start = departure.strip().capitalize()
        end = destination.strip().capitalize()
        vehicle = mode.strip().lower()

        # 1. Base Fare Retrieval [cite: 200]
        if start not in cities_price_list or end not in cities_price_list[start]:
            raise ValueError(f"Invalid city: {start} or {end}")
            
        base = cities_price_list[start][end]
        
        # 2. Vehicle Multiplier [cite: 201]
        multiplier = vehicle_prices.get(vehicle, 1) # Default to Trishaw (1) if not found [cite: 100]
        gross = base * multiplier
        
        promo_val = 0
        random_val = 0
        
        # 3. Discount Logic [cite: 171-188]
        if promo_code and promo_code.strip().lower() in promo_codes:
            promo_val = promo_codes[promo_code.strip().lower()]
        elif not promo_code or promo_code.strip() == "":
            # 33.33% chance for random 5 KMD reduction [cite: 101, 183-185, 249]
            if random.randint(1, 3) == 1:
                random_val = 5
                
        # 4. Final Calculation [cite: 180, 185]
        total = max(gross - promo_val - random_val, 0)
        
        # 5. Metadata Generation [cite: 87, 89, 203-206]
        now = datetime.now()
        timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
        filename = f"{now.strftime('%Y-%m-%d %H_%M_%S')}_{random.randint(1000, 9999)}.txt"
        
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
    except Exception as e:
        # Return a dictionary that the frontend can handle even on error
        return {"error": str(e)}