document.addEventListener('DOMContentLoaded', function () {
  const messageElement = document.getElementById('message');
  const messageElement2 = document.getElementById('message2');

  // Send a message to the content script to get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    // const thirdSlashIndex = url.indexOf('/', url.indexOf('/') + 2); // Find index of third slash
    // const topDomain = url.substring(0, thirdSlashIndex); // Extract all text before third slash
    
    console.log(topDomain);
    
    fetch('http://15.207.54.78/analyze-url/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
      const prediction = data.results; // Assuming the server responds with { "prediction": "some_value" }
      console.log(prediction);
      messageElement.textContent = `Prediction: ${prediction}`;
      messageElement2.textContent = `URL: ${url}`;

      // Check if prediction is 1 (phishing website)
      if (prediction === 1) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Warning: Phishing Website Detected! Be careful.';
        alert('Warning: Phishing Website Detected! Be careful.'); // Display an alert
        if (confirm('Would you like to close this tab?')) {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tabId = tabs[0].id;
            chrome.tabs.remove(tabId);
          });
        }
      }
    })
    .catch(error => {
      console.error(error);
      messageElement.textContent = 'Error fetching data from Python backend.';
    });
  });
});
