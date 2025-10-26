from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import random
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://username:password@localhost/cafe_fausse')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Import models after db initialization
from models import Customer, Reservation

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Café Fausse API is running'})

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['customer_name', 'email', 'time_slot', 'number_of_guests']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if time slot is available
        time_slot = datetime.fromisoformat(data['time_slot'].replace('Z', '+00:00'))
        existing_reservations = Reservation.query.filter_by(time_slot=time_slot).count()
        
        # Check if all 30 tables are booked for this time slot
        if existing_reservations >= 30:
            return jsonify({'error': 'This time slot is fully booked. Please choose another time.'}), 400
        
        # Create or find customer
        customer = Customer.query.filter_by(email=data['email']).first()
        if not customer:
            customer = Customer(
                name=data['customer_name'],
                email=data['email'],
                phone=data.get('phone', ''),
                newsletter_signup=data.get('newsletter_signup', False)
            )
            db.session.add(customer)
            db.session.flush()  # Get the customer ID
        
        # Assign random table (1-30)
        available_tables = list(range(1, 31))
        booked_tables = [r.table_number for r in Reservation.query.filter_by(time_slot=time_slot).all()]
        available_tables = [t for t in available_tables if t not in booked_tables]
        assigned_table = random.choice(available_tables)
        
        # Create reservation
        reservation = Reservation(
            customer_id=customer.id,
            time_slot=time_slot,
            table_number=assigned_table
        )
        db.session.add(reservation)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reservation confirmed successfully!',
            'reservation_id': reservation.id,
            'table_number': assigned_table,
            'time_slot': time_slot.isoformat()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/reservations/check', methods=['GET'])
def check_availability():
    try:
        time_slot = request.args.get('time_slot')
        if not time_slot:
            return jsonify({'error': 'time_slot parameter is required'}), 400
        
        time_slot_dt = datetime.fromisoformat(time_slot.replace('Z', '+00:00'))
        existing_reservations = Reservation.query.filter_by(time_slot=time_slot_dt).count()
        
        return jsonify({
            'time_slot': time_slot,
            'available_tables': 30 - existing_reservations,
            'total_tables': 30,
            'is_available': existing_reservations < 30
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/newsletter', methods=['POST'])
def newsletter_signup():
    try:
        data = request.get_json()
        
        if not data.get('email'):
            return jsonify({'error': 'Email is required'}), 400
        
        # Check if email already exists
        existing_customer = Customer.query.filter_by(email=data['email']).first()
        
        if existing_customer:
            # Update newsletter signup status
            existing_customer.newsletter_signup = True
            db.session.commit()
            return jsonify({'message': 'Email updated for newsletter subscription'}), 200
        else:
            # Create new customer for newsletter
            customer = Customer(
                name=data.get('name', ''),
                email=data['email'],
                phone='',
                newsletter_signup=True
            )
            db.session.add(customer)
            db.session.commit()
            return jsonify({'message': 'Successfully subscribed to newsletter'}), 201
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
