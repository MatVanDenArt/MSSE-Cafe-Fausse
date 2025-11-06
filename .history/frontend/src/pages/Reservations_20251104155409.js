import React, { useState, useEffect } from "react";
import "./Reservations.css";

const Reservations = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    time_slot: "",
    number_of_guests: 2,
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
            <div className="form-group">
              <label htmlFor="time_slot" className="form-label">
                Preferred Date & Time *
              </label>
              <select
                id="time_slot"
                name="time_slot"
                value={formData.time_slot}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a date and time</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="number_of_guests" className="form-label">
                Number of Guests *
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
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="customer_name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your email address"
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
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="newsletter_signup"
                  checked={formData.newsletter_signup}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  Subscribe to our newsletter for updates and special offers
                </span>
              </label>
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
      </div>
    </div>
  );
};

export default Reservations;
