import React, { useState, useEffect } from "react";
import "./Reservations.css";

const Reservations = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    time_slot: "",
    number_of_guests: 2,
    date: "",
    time: "08:00",
    special_request: "",
    newsletter_signup: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Generate time slots for the next 30 days
  const generateTimeSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip if it's a past date
      if (date < today) continue;

      const dayOfWeek = date.getDay();

      // Business hours: Mon-Sat 5PM-11PM, Sun 5PM-9PM
      const isSunday = dayOfWeek === 0;
      const startHour = 17; // 5 PM
      const endHour = isSunday ? 21 : 23; // 9 PM on Sunday, 11 PM other days

      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotDate = new Date(date);
          slotDate.setHours(hour, minute, 0, 0);

          slots.push({
            value: slotDate.toISOString(),
            label: slotDate.toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          });
        }
      }
    }

    return slots;
  };

  useEffect(() => {
    setAvailableSlots(generateTimeSlots());
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message,
          details: `Table ${data.table_number} has been reserved for ${new Date(
            data.time_slot
          ).toLocaleString()}`,
        });
        // Reset form
        setFormData({
          customer_name: "",
          email: "",
          phone: "",
          time_slot: "",
          number_of_guests: 2,
          date: "",
          time: "08:00",
          special_request: "",
          newsletter_signup: false,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.error || "An error occurred while making your reservation",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservations">
      <div className="container">
        <div className="reservation-header-section">
          <p className="reservation-subtitle">
            <span className="decorative-line"></span>
            RESERVATION
            <span className="decorative-line"></span>
          </p>
          <h1 className="reservation-title">Book A Table</h1>
          <p className="reservation-description">
            Reservations can be made up to 30 days in advance. We hold
            reservations for 15 minutes past the scheduled time. Please call us
            if you need to cancel or modify your reservation. Large parties (8+
            guests) should call us directly
          </p>
          <p className="booking-contact">
            Booking request <span className="phone-number">+88-123-123456</span>{" "}
            or fill out the order form
          </p>
        </div>

        <div className="reservation-form-container">
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row form-row-three">
              <div className="form-group">
                <label htmlFor="customer_name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="form-row form-row-three">
              <div className="form-group">
                <label htmlFor="number_of_guests" className="form-label">
                  1 Person
                </label>
                <select
                  id="number_of_guests"
                  name="number_of_guests"
                  value={formData.number_of_guests}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Person" : "Persons"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  DD-MM-YYYY
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="DD-MM-YYYY"
                />
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  08:00 am
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time || "08:00"}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="08:00">08:00 am</option>
                  <option value="09:00">09:00 am</option>
                  <option value="10:00">10:00 am</option>
                  <option value="11:00">11:00 am</option>
                  <option value="12:00">12:00 pm</option>
                  <option value="13:00">01:00 pm</option>
                  <option value="14:00">02:00 pm</option>
                  <option value="15:00">03:00 pm</option>
                  <option value="16:00">04:00 pm</option>
                  <option value="17:00">05:00 pm</option>
                  <option value="18:00">06:00 pm</option>
                  <option value="19:00">07:00 pm</option>
                  <option value="20:00">08:00 pm</option>
                  <option value="21:00">09:00 pm</option>
                </select>
              </div>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="special_request" className="form-label">
                Special Request
              </label>
              <textarea
                id="special_request"
                name="special_request"
                value={formData.special_request || ""}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Special Request"
                rows="4"
              ></textarea>
            </div>

            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                <p>{submitStatus.message}</p>
                {submitStatus.details && <p>{submitStatus.details}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="reservation-submit"
            >
              {isSubmitting ? "Making Reservation..." : "BOOK A TABLE"}
            </button>
          </form>
          <p className="powered-by">*Powered by OpenTable</p>
        </div>

        <div className="reservation-policy-section">
          <div className="info-card">
            <h3>Reservation Policy</h3>
            <ul>
              <li>Reservations can be made up to 30 days in advance</li>
              <li>
                We hold reservations for 15 minutes past the scheduled time
              </li>
              <li>
                Please call us if you need to cancel or modify your reservation
              </li>
              <li>Large parties (8+ guests) should call us directly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
