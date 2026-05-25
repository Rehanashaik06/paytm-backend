# PAYTM CLONE API DOCUMENTATION

## Base URL

http://localhost:5000

---

# 1. GET ALL BOOKINGS

## Endpoint

GET /api/bookings

## Description

Fetches all bookings from backend.

## Method

GET

## Example URL

http://localhost:5000/api/bookings

---

# 2. CREATE BOOKING

## Endpoint

POST /api/bookings

## Description

Creates a new booking.

## Method

POST

## Request Body

{
  "type": "Flight Ticket",
  "name": "Rehana"
}

## Example URL

http://localhost:5000/api/bookings

---

# 3. UPDATE BOOKING

## Endpoint

PUT /api/bookings/:id

## Description

Updates booking details.

## Method

PUT

## Request Body

{
  "name": "Updated Booking"
}

## Example URL

http://localhost:5000/api/bookings/12345

---

# 4. DELETE BOOKING

## Endpoint

DELETE /api/bookings/:id

## Description

Deletes booking.

## Method

DELETE

## Example URL

http://localhost:5000/api/bookings/12345