# <img src="/public/LogoTD.png" alt="App Logo" width="28"> Therapy Dashboard Client
This repository contains the frontend application for the Therapy Dashboard, a comprehensive tool for therapists to manage their patients, sessions, and treatments efficiently. Built with React and TypeScript, it provides an intuitive interface for healthcare professionals.

### [Try the app](https://therapy-dashboard.netlify.app/)

----- 

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CarlosCanet/therapy-dashboard-client.git
```

2. Install dependencies:
```bash
cd therapy-dashboard-client
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the web:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---- 

## 🌟 Features

### Actual features
- **Patient Management**: Track and manage patient information, history, and progress
  - Create, edit and delete patients
  - Show all patients and filter by name
- **Session Tracking**: Record and monitor therapy sessions
- **Treatment Plans**: Create and manage customized treatment plans
- **Responsive Design**: Full functionality across desktop and mobile devices

#### Backlog features
- **Sort** patient list
- **Sort** session list
- **Create** a session from the dashboard, and select for which patient
- **Add some placeholder** while loading
- **Add confirmation** for add, edit and delete patients and sessions
- **Add** an external API with the med info in English

----- 

## 📚 Technologies, Libraries & APIs used

- **Framework**: React with TypeScript
- **Styling**: React Bootstrap & SCSS
- **HTTP Client**: Axios
- **Router**: React Router
- **Development**: Vite
- **External API (in spanish)**: [CIMA](https://cima.aemps.es/cima/publico/nomenclator.html) [CIMA API](https://cima.aemps.es/cima/rest/medicamento?nregistro=51347)

## 📱 API Integration

The frontend communicates with the backend through RESTful endpoints:

### Key Endpoints
- `/patients` - Patient management
- `/sessions` - Session tracking

For detailed API documentation, please refer to the [backend repository](https://github.com/CarlosCanet/therapy-dashboard-server).

## 🔄 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── styles/         # Global styles and variables
└── types/          # TypeScript type definitions
```

## Client Routes

| Path                             | Page                | Behaviour                                                                    |
| -------------------------------- | ------------------- | ---------------------------------------------------------------------------- |
| `/patients`                      | `PatientsListPage`  | Shows a list of all patients. Allows filtering and creating new patients.    |
| `/patients/:patientId`           | `PatientInfoPage`   | Shows detailed information for a specific patient, including their sessions. |
| `/new-patient`                   | `NewPatientPage`    | Displays a form to create a new patient.                                     |
| `/sessions`                      | `SessionListPage`   | Shows a list of all therapy sessions.                                        |
| `/sessions/:sessionId`           | `SessionInfoPage`   | Displays detailed information for a specific session.                        |
| `/patients/:patientId/new-session` | `NewSessionPage`    | Displays a form to create a new session for a specific patient.              |
| `/calendar`                      | `NextSessionsPage`  | Shows a calendar view of upcoming sessions.                                  |
| `/treatment-info/:treatmentId`   | `TreatmentInfoPage` | Shows detailed information about a specific treatment or medication.         |
| `*`                              | `NotFoundPage`      | Displays a 404 Not Found page for any unmatched routes.                      |

-----

## 🔗Links
- [Backend Repository](https://github.com/CarlosCanet/therapy-dashboard-server)
- [GitHub Project](https://github.com/users/CarlosCanet/projects/16)
- [Slides](https://docs.google.com/presentation/d/1PIrIcs4Ebyq9k7FFdz_cXba-nmvnWTsG7B0uOu2ort8/edit?usp=sharing)
- [Deployed API](https://therapy-dashboard-server.onrender.com/)