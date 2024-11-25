# Focus Mode Chrome Extension

## Overview

The Focus Mode Chrome Extension helps users maintain concentration by allowing them to focus on a specific tab for a set duration. While in focus mode, the extension prevents users from switching away from the designated tab.

## Features

- Start and stop focus mode from a popup.
- Set a timer for how long to stay focused.
- Visual indication of focus mode through a badge icon.
- Automatically switches back to the focused tab if the user attempts to switch away.

## Installation

1. Download or clone this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the directory where the extension files are located.
5. The extension should now be installed and visible in your extensions list.

## Usage

1. Click on the extension icon in the Chrome toolbar.
2. Set the duration for focus mode and select the tab you want to focus on.
3. Click "Start Focus" to begin.
4. The badge will change to indicate that focus mode is active.
5. To stop focus mode, click the extension icon again and select "Stop Focus."

## Code Structure

- `background.js`: Contains the core logic for managing focus mode, including message handling, tab switching, and timing.
- `popup.html`: The HTML interface for starting and stopping focus mode.
- `manifest.json`: Configuration file for the Chrome extension, specifying permissions and background scripts.

## Permissions

This extension requires the following permissions:

- `tabs`: To manage and switch between tabs.
- `activeTab`: To interact with the currently active tab.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## Acknowledgments

- Inspired by the need for better focus and productivity tools.
- Thanks to the Chrome Extensions documentation for guidance on development.

