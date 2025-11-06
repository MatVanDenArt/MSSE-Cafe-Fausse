import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///cafe_fausse.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Restaurant configuration
    TOTAL_TABLES = 30
    RESERVATION_ADVANCE_DAYS = 30  # How many days in advance reservations can be made
    
    # Business hours (in 24-hour format)
    BUSINESS_HOURS = {
        'monday': {'open': 17, 'close': 23},      # 5 PM - 11 PM
        'tuesday': {'open': 17, 'close': 23},     # 5 PM - 11 PM
        'wednesday': {'open': 17, 'close': 23},   # 5 PM - 11 PM
        'thursday': {'open': 17, 'close': 23},    # 5 PM - 11 PM
        'friday': {'open': 17, 'close': 23},      # 5 PM - 11 PM
        'saturday': {'open': 17, 'close': 23},    # 5 PM - 11 PM
        'sunday': {'open': 17, 'close': 21}       # 5 PM - 9 PM
    }
