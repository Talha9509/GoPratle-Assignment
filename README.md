# GoPratle - Full-Stack Requirement Posting Flow

A dynamic, multi-step form built for the GoPratle Full-Stack Developer Internship technical assignment. This application allows users (event hosts) to post event requirements and dynamically adjusts the data collection fields based on the type of event professionals they need (Event Planner, Performer, and/or Crew).

---

## Tech Stack

*   **Frontend:** Next.js (App Router), React Hook Form, Tailwind CSS
*   **Backend:** Next.js API Routes (Serverless) / Node.js, Zod
*   **Database:** MongoDB, Mongoose

---

## Key Features & Technical Decisions

*   **Dynamic Multi-Step State Management:** Utilized `react-hook-form` to persist state across a 3-step wizard without data loss. Validation is triggered at the end of each specific step before allowing the user to proceed.
*   **Combinatorial Categories:** Instead of limiting users to a single role (e.g., *only* a Planner), the architecture supports hiring multiple roles simultaneously (e.g., Planner + Crew). The UI dynamically maps and merges the relevant sub-forms.
*   **End-to-End Type Safety (Zod):** Implemented a shared Zod schema. The frontend shapes the flat form data into a nested JSON payload and validates it via Zod before transmission. The backend uses the exact same Zod schema to validate the incoming API request, preventing bad data injection.
*   **Unified MongoDB Schema:** Designed a single Mongoose document schema with nested, conditional objects (`plannerDetails`, `performerDetails`, `crewDetails`) that are only populated if the user selects that specific category, keeping the database clean and scalable.

---

## API Data Flow

* Endpoint: POST /api/events

The API accepts a dynamic JSON payload based on the selected categories. Example payload for an event requiring both an Event Planner and Crew:

```bash
  # Request
{
  "eventName": "Tech Summit 2026",
  "eventType": "Conference",
  "startDate": "2026-10-15T00:00:00.000Z",
  "endDate": "2026-10-17T00:00:00.000Z",
  "startTime": "09:00",
  "endTime": "18:00",
  "location": "Hyderabad",
  "categories": ["planner", "crew"],
  
  "plannerDetails": {
    "services": ["Catering", "Decoration"],
    "foodOption": "both",
    "guestCount": 500,
    "budget": "₹2,00,000"
  },
  
  "crewDetails": {
    "crewList": [
      { "role": "Security", "count": 10 },
      { "role": "AV Tech", "count": 3 }
    ],
    "shiftStartTime": "07:00",
    "shiftEndTime": "19:00",
    "budget": "₹30,000"
  }
}
```

```bash
  # Response
{
    "message": "Event created",
    "event": {
        "eventName": "Tech Summit 2026",
        "eventType": "Conference",
        "startDate": "2026-10-15T00:00:00.000Z",
        "endDate": "2026-10-17T00:00:00.000Z",
        "startTime": "09:00",
        "endTime": "18:00",
        "location": "Hyderabad",
        "categories": [
            "planner",
            "crew"
        ],
        "plannerDetails": {
            "services": [
                "Catering",
                "Decoration"
            ],
            "foodOption": "both",
            "guestCount": 500,
            "budget": "₹2,00,000"
        },
        "performerDetails": {
            "genres": []
        },
        "crewDetails": {
            "crewList": [
                {
                    "role": "Security",
                    "count": 10,
                    "_id": "6aa8d8bfab1ccd866177a76c"
                },
                {
                    "role": "AV Tech",
                    "count": 3,
                    "_id": "6aa8d8bfab1ccd866177a76d"
                }
            ],
            "shiftStartTime": "07:00",
            "shiftEndTime": "19:00",
            "budget": "₹30,000"
        },
        "_id": "6aa8d8bfab1ccd866177a76b",
        "createdAt": "2026-09-15T05:33:51.351Z",
        "updatedAt": "2026-09-15T05:33:51.351Z",
        "__v": 0
    }
}
```