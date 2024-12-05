// Elements
const downloadTestButton = document.getElementById("downloadTest");
const uploadTestButton = document.getElementById("uploadTest");
const resultsDiv = document.getElementById("results");

// Helper function to display results
const displayResult = (message) => {
    resultsDiv.innerText = message;
};

// Test Download Speed
const testDownloadSpeed = async () => {
    const testFileUrl = "https://file-examples.com/storage/10MB.zip"; // Public test file
    const fileSizeInBytes = 10 * 1024 * 1024; // 10MB in bytes

    try {
        const startTime = Date.now();
        const response = await fetch(testFileUrl);
        await response.blob(); // Fetch the file (without saving it)
        const endTime = Date.now();

        const durationInSeconds = (endTime - startTime) / 1000;
        const speedMbps = ((fileSizeInBytes * 8) / (durationInSeconds * 1024 * 1024)).toFixed(2);

        displayResult(`Download Speed: ${speedMbps} Mbps`);
    } catch (error) {
        displayResult("Failed to test download speed. Please try again.");
    }
};

// Test Upload Speed
const testUploadSpeed = async () => {
    const blob = new Blob([new Array(5 * 1024 * 1024).fill('a').join('')]); // Create a 5MB blob
    const uploadUrl = "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts"; // Public proxy

    try {
        const startTime = Date.now();
        await fetch(uploadUrl, {
            method: "POST",
            body: blob,
            mode: "cors", // Allow CORS
        });
        const endTime = Date.now();

        const durationInSeconds = (endTime - startTime) / 1000;
        const fileSizeInBytes = blob.size;
        const speedMbps = ((fileSizeInBytes * 8) / (durationInSeconds * 1024 * 1024)).toFixed(2);

        displayResult(`Upload Speed: ${speedMbps} Mbps`);
    } catch (error) {
        displayResult("Failed to test upload speed. Please try again.");
    }
};

// Event Listeners
downloadTestButton.addEventListener("click", testDownloadSpeed);
uploadTestButton.addEventListener("click", testUploadSpeed);
