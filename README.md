# License Plate Scanner

This project is a web-based application that allows users to scan or upload an image of a license plate and retrieve insurance details using a server-side API. It is built using modern technologies such as JavaScript, HTML5, and the Canvas API. The application focuses on ease of use with camera capture, file uploads, and real-time feedback.

## Key Features

- **Camera Capture**: Users can capture an image of a license plate using their device's camera.
- **File Upload**: Users can upload a license plate image from their device's local storage.
- **Data Fetching**: The application processes the image and fetches insurance details from a backend API.
- **Countdown Timer**: A timer is displayed while the application waits for the server to return insurance data.
- **Real-time Insurance Details Display**: Insurance information is displayed on the screen as soon as it is retrieved from the server.

This project is designed for a smooth user experience in scanning license plates and fetching insurance details in real-time.

## Getting Started

Follow the steps below to set up and run the application on your local machine.

### Prerequisites

Make sure you have the following tools installed:
- **Node.js** version 20.16.0.
- A modern web browser that supports the `getUserMedia` API for camera access.

### Installation

#### Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/your-username/license-plate-scanner.git
```
#### Navigate to the Project Directory
Go to the project folder:
```bash
cd license-plate-scanner
```
### Install Dependencies
- Open a command prompt (cmd) in the project directory.
- Run the following command to install all the required npm packages:
     ```bash
     npm install
     ```
#### Running the Application
### Open the Application
Open the index.html file in your browser:
- You can double-click on the file or manually open it from your browser.
### Ensure Backend API is Running
Make sure the backend API is running to retrieve insurance details. The application sends a POST request to the following endpoint:
- localhost:3001/get-insurance
### Request Format:
```bash
{
  "image": "data:image/png;base64,...."
}
```
### Response Format:
```bash
{
  "insurance": [
    {
      "title": "Forsikring",
      "date": "7. December 2023",
      "content": "Køretøjet forsikres hos Selvforsikring\nForsikring er Aktiv"
    }
  ]
}
```
### Countdown Timer:
A countdown timer starts when a picture is captured or an image is uploaded. The timer continues until the insurance data is fetched from the server and displayed.





