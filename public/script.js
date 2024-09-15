const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const insuranceResult = document.getElementById('insurance-result');
const uploadInput = document.getElementById('upload');

// Create countdown element
const countdownElement = document.createElement('div');
countdownElement.id = 'countdown';
countdownElement.style.fontSize = '20px';
countdownElement.style.color = '#4a4a8b';
countdownElement.style.marginTop = '10px';
document.body.appendChild(countdownElement);

let countdownInterval; // To store the interval for countdown

// Check for camera access
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
      alert('Camera access is not available. Please check your browser permissions.');
    });
} else {
  console.error('getUserMedia not supported in this browser.');
  alert('Camera access is not supported in this browser.');
}

// Capture image from video
document.getElementById('snap').addEventListener('click', () => {
  context.drawImage(video, 0, 0, 320, 240);
  const imageData = canvas.toDataURL('image/png');
  startCountdown(); // Start countdown when image is captured
  processImage(imageData);
});

// Handle file upload
uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      startCountdown(); // Start countdown when image is uploaded
      processImage(imageData);
    };
    reader.readAsDataURL(file);
  }
});

// Function to start countdown timer
function startCountdown() {
  let timeLeft = 6; // Set the countdown duration (10 seconds for example)

  countdownElement.textContent = `Fetching data... (${timeLeft}s left)`;

  countdownInterval = setInterval(() => {
    timeLeft -= 1;
    countdownElement.textContent = `Fetching data... (${timeLeft}s left)`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = 'Still fetching data...';
    }
  }, 1000);
}

// Function to stop countdown timer
function stopCountdown() {
  clearInterval(countdownInterval);
  countdownElement.textContent = ''; // Clear the countdown message
}

// Function to send image data to the server and process the result
async function processImage(imageData) {
  try {
    const response = await fetch('/get-insurance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageData })
    });

    const result = await response.json();

    // Stop the countdown when data is fetched
    stopCountdown();

    // Clear previous results
    insuranceResult.innerHTML = '';

    // Filter only insurance-related data (e.g., title is "Forsikring")
    const insuranceData = Array.isArray(result.insurance)
      ? result.insurance.filter(item => item.title === 'Forsikring')
      : result.insurance.title === 'Forsikring'
        ? [result.insurance]
        : [];

    if (insuranceData.length > 0) {
      // Display filtered insurance data
      insuranceData.forEach(item => {
        const section = document.createElement('div');
        section.style.marginBottom = '20px';

        const title = document.createElement('h4');
        title.textContent = `${item.title} (${item.date})`;
        section.appendChild(title);

        const content = document.createElement('p');
        content.innerHTML = item.content.replace(/\n/g, '<br>'); // Format newlines
        section.appendChild(content);

        insuranceResult.appendChild(section);
      });
    } else {
      insuranceResult.innerHTML = 'No insurance details found';
    }
  } catch (error) {
    console.error('Error processing image:', error);
    stopCountdown();
    insuranceResult.innerHTML = 'An error occurred while processing the image';
  }
}
