# Project Overview

This project, named "Lumon" (with the title "Math Kids"), is a simple and interactive educational game designed for children. It functions as a Progressive Web App (PWA), allowing for offline use thanks to a service worker. The application helps kids practice basic arithmetic, including number recognition, addition, and subtraction.

The user interface is structured as a single-page application (SPA). Users navigate through different screens to select an activity (`Números`, `Somas`, `Subtrações`), a mode (`Sequencial`, `Aleatório`), and a difficulty level. The core activity involves flashcards that present questions. The app uses touch gestures (tapping and swiping) for interaction, making it intuitive for mobile devices.

## Key Technologies

*   **HTML5**: Provides the application's structure and content, organized into semantic sections representing different screens.
*   **CSS3**: Used for all styling, including layout, colors, fonts, and animations. It leverages CSS variables for a consistent theme.
*   **JavaScript (ES6)**: Contains all the application logic, such as game state management, question generation, DOM manipulation, and handling user input and gestures.
*   **Service Worker**: Caches the core application assets, enabling it to run offline after the first visit.
*   **Web App Manifest (`manifest.json`)**: Included to allow users to "install" the web app to their home screen on supported devices.

## Project Structure

*   `index.htm`: The single HTML file that defines the entire UI for the application.
*   `style.css`: The stylesheet responsible for the visual presentation.
*   `script.js`: The main script that controls the application's functionality.
*   `service-worker.js`: The script that manages caching and offline capabilities.
*   `.gitattributes`: A Git configuration file.

## Running the Application

This project consists of static files (HTML, CSS, JavaScript) and does not include a built-in web server.

You can open the `index.htm` file directly in a web browser. However, for the offline functionality (provided by the service worker) to work correctly, the files must be served over HTTP/HTTPS. Opening the HTML file from the local filesystem (e.g., `file:///...`) will prevent the service worker from registering.

To run the application with its full capabilities, you can use a simple local web server. Here are a few common methods:

*   **Using Python:**
    ```bash
    # If you have Python 3 installed
    python3 -m http.server
    ```
*   **Using Node.js:**
    ```bash
    # If you have Node.js installed, you can use the 'serve' package
    npx serve
    ```
*   **Using a code editor extension:**
    *   For Visual Studio Code, the "Live Server" extension is a popular choice.

Once the server is running, you can access the application at the provided local address (e.g., `http://localhost:8000`, `http://localhost:3000`).