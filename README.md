# Influencer Tracker PoC

## Overview
This project is a Proof of Concept (PoC) for an Influencer Dashboard that extracts and stores data from the Mockstagram API. The system is designed to be horizontally scalable, allowing for dynamic load distribution among multiple worker instances.

## Features
- Automatic load distribution among workers.
- Dynamic range calculation for workers based on the number of active workers.
- Periodic update of influencer data with one-minute resolution timeline.
- Robust handling of worker registration and deregistration.

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Axios

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB installed and running.

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/MayankAgrawal94/Influencer-Tracker.git
    cd Influencer-Tracker
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Setup Environment Variables**
    Create a `.env` file in the root directory and add the following environment variables:
    ```
    1.DB_CONNECTION_STRING=mongodb://localhost:27017
    2.DB_NAME=influencerDB
    3.BASE_URL=http://localhost:3000 /*(Mockstagram Api Base Url) **/
    ```

4. **Start the Mockstagram API**
    Follow the instructions in the Mockstagram API repository to start the server locally.

5. **Run Worker Instances**
    Open multiple terminal windows to run worker instances. Each instance will automatically register itself and distribute the load.
    ```bash
    node worker.js
    ```
    
## Project Structure
```
.
├── app
│   ├── models
│   │   ├── Influencer.model.js
│   │   └── Worker.model.js
│   └── services
│       ├── Influencer.service.js
│       └── Worker.service.js
├── config
│   ├── db.js
│   └── env.constant.js
├── package.json
├── package-lock.json
├── README.md
└── worker.js
```

## How It Works

1. **Worker Registration and Heartbeat**
   - Each worker registers itself in the MongoDB `Worker` collection with a unique `instanceId` and `workerId`.
   - Workers periodically update their timestamp to indicate they are alive.

2. **Dynamic Range Calculation**
   - Workers calculate the range of `pk` values they are responsible for based on the number of active workers.
   - The range is recalculated whenever a worker joins or leaves.

3. **Periodic Data Update**
   - Workers fetch influencer data from the Mockstagram API every minute and update the MongoDB `Influencer` collection.
   - The follower count timeline and average follower count are updated with each new data point.

4. **Graceful Shutdown**
   - Workers deregister themselves from the MongoDB collection upon receiving shutdown signals (SIGINT, SIGTERM).

## Contributing
If you have any suggestions or improvements, feel free to submit a pull request or open an issue.

## Contact
For any questions or inquiries, please contact [Mayank Agrawal] at `mnk.agrawal94@gmail.com`.
