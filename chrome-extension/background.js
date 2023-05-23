// Listen for messages from the content script
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    // get messages
    const { action, selectedText } = data;

    if (action === "selectedText") {
        // Send the selected text to the Python file using a suitable method (e.g., AJAX, fetch)
        // Here, I'm using the fetch API as an example
        fetch(
            "http://localhost:5000?selectedText=" +
                encodeURIComponent(selectedText)
        )
            .then((response) => response.json())
            .then((data) => {
                // Send the response back to the popup script
                sendResponse(data["emotion"]);
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error(error);
                sendResponse({
                    error: "An error occurred during the request",
                });
            });

        // Return true to indicate that the sendResponse function will be called asynchronously
        return true;
    }
});

// chrome.storage.local.get(["popupWindowId"], (result) => {
//     const { popupWindowId } = result;
// });

// // Store the reference to the popup window
// var popupWindowId = null;

// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
//     // get messages
//     const { action, selectedText, mousePosition } = data;

//     if (action === "selectedText") {
//         // Close the previous popup window (if any)
//         console.log(selectedText);
//         if (popupWindowId !== null) {
//             chrome.windows.get(popupWindowId, (window) => {
//                 if (chrome.runtime.lastError || !window) {
//                     // Window doesn't exist or has already been closed
//                     popupWindowId = null;
//                 } else {
//                     chrome.windows.remove(popupWindowId);
//                     popupWindowId = null;
//                 }
//             });
//         }

//         if (selectedText !== "") {
//             // Open the new popup window with the selected text
//             chrome.windows.create(
//                 {
//                     url: "popup/popup.html",
//                     type: "popup",
//                     width: 300, // Set the width and height of the popup as needed
//                     height: 100,
//                     left: mousePosition.x - Math.floor(300 / 2),
//                     top: mousePosition.y + 10,
//                     // focused: false, // Keep the pop-up unfocused
//                     incognito: false, // Adjust as needed
//                 },
//                 function (window) {
//                     // Store the new popup window ID
//                     popupWindowId = window.id;
//                 }
//             );

//             // Send the selected text to the Python file using a suitable method (e.g., AJAX, fetch)
//             // Here, I'm using the fetch API as an example
//             fetch(
//                 "http://localhost:5000?selectedText=" +
//                     encodeURIComponent(selectedText)
//             )
//                 .then((response) => response.json())
//                 .then((data) => {
//                     // Send the response back to the popup script
//                     sendResponse(data);
//                 })
//                 .catch((error) => {
//                     // Handle any errors that occur during the request
//                     console.error(error);
//                     sendResponse({
//                         error: "An error occurred during the request",
//                     });
//                 });

//             // Return true to indicate that the sendResponse function will be called asynchronously
//             return true;
//         }
//     }
// });

// // chrome.storage.local.get(["popupWindowId"], (result) => {
// //     const { popupWindowId } = result;
// // });
