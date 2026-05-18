# Blockly ESP

A visual block-based programming environment for ESP microcontrollers. This project allows users to program ESP devices using Google Blockly.

## Features

- **Visual Block-Based Programming**: Drag-and-drop interface for creating ESP programs without writing code
- **Code Generation**: Automatically generates C++ code from visual blocks
- **Real-time Code Preview**: View generated code instantly
- **Device Upload**: Upload compiled code directly to ESP boards

## Live Demo

The application is available at: **https://digilab08.github.io/blockly-esp/**

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/digilab08/blockly-esp.git
cd blockly-esp
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Project Structure

- `src/blockly/` - Custom Blockly configurations, blocks, and code generators
- `src/components/` - Vue components including the Blockly workspace
- `src/views/` - Application views and pages
- `src/stores/` - Application state management
- `public/` - Static assets

## Technologies

- **Vue.js 3** - Frontend framework
- **Vite** - Build tool
- **Google Blockly** - Visual programming library
- **JavaScript** - Programming language
