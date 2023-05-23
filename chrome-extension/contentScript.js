// // Listen for the mouseup event on the webpage
// document.addEventListener("mouseup", (event) => {
//     var selectedText = window.getSelection().toString();
//     const mousePosition = {
//         x: event.clientX,
//         y: event.clientY,
//     };

//     chrome.runtime.sendMessage(
//         {
//             action: "selectedText",
//             selectedText: selectedText,
//             mousePosition: mousePosition,
//         },
//         function (response) {
//             console.log(response);
//         }
//     );
// });

// Create the icon element
const emotionText = document.createElement("div");
emotionText.classList.add("custom-icon"); // Add a CSS class to style the icon
emotionText.textContent = "Loading..."; // Add text content to the icon element (optional)

// Apply CSS styles to the icon element
emotionText.style.width = "207px";
emotionText.style.height = "45px";
emotionText.style.backgroundColor = "#000000"; // Replace with your desired color
emotionText.style.display = "flex"; // Apply flexbox layout
emotionText.style.alignItems = "center"; // Center items vertically
emotionText.style.justifyContent = "center"; // Center items horizontally
emotionText.style.color = "white"; // Center items horizontally

// Handle the mouseup event
function handleMouseUp(event) {
    // Get the mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Set the position of the icon element
    emotionText.style.position = "fixed";
    emotionText.style.top = `${mouseY}px`;
    emotionText.style.left = `${mouseX}px`;

    // Append the icon element to the document body
    document.body.appendChild(emotionText);
}

// Handle the mousedown event
function handleMouseDown() {
    // Remove the icon element from the document
    if (emotionText.parentNode) {
        emotionText.parentNode.removeChild(emotionText);
    }
}

// Define the list of texts
const textList = ["Loading.", "Loading..", "Loading..."]; // Add your list of texts here
let currentIndex = 0; // Current index in the text list
let continueLoop;
let timeoutId;
// Function to update the element with the current text
function updateElement() {
    emotionText.textContent = textList[currentIndex];
}

// Recursive function for the infinite loop
function infiniteLoop() {
    // Perform your desired actions here
    updateElement();

    // Increment the index and loop back to the beginning if the end is reached
    currentIndex = (currentIndex + 1) % textList.length;

    if (!continueLoop) {
        return; // Exit the loop
    }

    // Continue the infinite loop
    timeoutId = setTimeout(infiniteLoop, 500); // 0.5-second interval
}

// Add event listeners for mouseup and mousedown events
document.addEventListener("mouseup", (event) => {
    var selectedText = window.getSelection().toString();

    if (selectedText !== "") {
        continueLoop = true;
        handleMouseUp(event);

        infiniteLoop();

        chrome.runtime.sendMessage(
            {
                action: "selectedText",
                selectedText: selectedText,
            },
            function (response) {
                clearTimeout(timeoutId);
                continueLoop = false;
                emotionText.textContent = response.toUpperCase();
            }
        );
    }
});

document.addEventListener("mousedown", handleMouseDown);
