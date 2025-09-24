# 🌴 Vacation Calendar

A modern, interactive vacation calendar application built with React and Vite that helps you plan your vacations around holidays worldwide. Features a beautiful glass-morphism UI with dynamic backgrounds and the ability to add personal images to calendar dates.

## ✨ Features

- **🌍 Multi-Country Support**: View holidays from multiple countries (USA, China, UK, Canada, Australia)
- **📅 Flexible Views**: Switch between monthly and quarterly calendar views
- **🖼️ Personal Images**: Add and manage personal images for specific dates
- **🎨 Modern UI**: Beautiful glass-morphism design with animated gradients
- **⌨️ Keyboard Navigation**: Navigate months using arrow keys
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎯 Holiday Integration**: Automatically fetches and displays public holidays

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vacation-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Navigation
- Use the **Prev/Next** buttons to navigate between months
- Use **arrow keys** on your keyboard for quick navigation
- Switch between **Monthly** and **Quarterly** views

### Country Selection
- Choose from 5 supported countries using the dropdown
- Holiday data is automatically fetched and displayed

### Adding Images
- **Click any calendar date** to open the image upload dialog
- **Drag & drop** images directly onto calendar dates
- **Multiple upload methods**: Click to browse files or drag from your computer
- **Image preview**: View uploaded images in full size with management options
- **Persistent storage**: Images are saved locally and remain between sessions
- **Visual indicators**: Blue dots appear on dates with images
- **Easy management**: Click existing image indicators to view, replace, or remove images

#### Image Upload Options:
1. **Click Method**: Click on any calendar date to open file browser
2. **Drag & Drop**: Drag image files directly onto calendar dates
3. **File Browser**: Use the traditional file selection dialog

## 🛠️ Technical Details

### Built With
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Nager.Date API** - Free public holiday data



## 🎨 Customization

### Styling
The application uses a modern glass-morphism design with:
- Dynamic gradient backgrounds
- Backdrop blur effects
- Custom CSS properties for consistent theming
- Smooth transitions and hover effects

### Adding New Countries
To add support for additional countries:
1. Update the country options in `App.jsx`
2. The Nager.Date API supports many countries - check their documentation
3. Add new country codes to the dropdown options

## 📁 Project Structure

```
vacation-calendar/
├── src/
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Application-specific styles
│   ├── Calendar.jsx              # Calendar rendering and holiday integration
│   ├── ImageManager.jsx          # Image upload and management system
│   ├── index.css                 # Global styles and CSS variables
│   ├── main.jsx                  # Application entry point
│   └── assets/                   # Static assets (icons, images)
├── public/                       # Public static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint


## 🖼️ Image Functionality

The Vacation Calendar includes comprehensive image management capabilities that allow you to personalize your calendar with photos, memories, and visual reminders.



## 📄 License

This project is open source and available under the MIT License.



**Made with ❤️**
