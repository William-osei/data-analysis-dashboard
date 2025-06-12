# 📊 Data Analysis Dashboard

An interactive data visualization platform built with HTML5, CSS3, JavaScript, and Chart.js. This dashboard provides real-time data processing, filtering, and multiple chart visualizations.

## ✨ Features

- **📈 Multiple Chart Types**: Line, Bar, Pie, and Doughnut charts
- **🔍 Real-time Filtering**: Search and filter data instantly
- **📁 CSV Support**: Upload and export CSV files
- **📊 Statistical Analysis**: Automatic calculation of key metrics
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean and professional interface
- **⚡ Fast Performance**: Optimized for smooth interactions

## 🚀 Live Demo

[View Live Demo](https://william-osei.github.io/data-dashboard)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript ES6+**: Interactive functionality
- **Chart.js**: Professional chart rendering
- **Font Awesome**: Beautiful icons

## 📖 How to Use

### 1. Data Sources
- **Sample Data**: Pre-loaded demo data
- **Random Data**: Dynamically generated random dataset
- **CSV Upload**: Upload your own CSV files

### 2. Interactive Features
- **Search**: Filter data by name or category
- **Sort**: Sort data by name, value, or category
- **Export**: Download filtered data as CSV
- **Refresh**: Generate new random data

### 3. Visualizations
- **Line Chart**: Shows trends over time
- **Bar Chart**: Category-wise distribution
- **Pie Chart**: Data composition overview
- **Doughnut Chart**: Performance metrics

## 💾 CSV File Format

When uploading CSV files, use this format:
```csv
Name,Value,Category,Date
Product A,1500,Sales,2024-01-15
Service B,850,Marketing,2024-01-16
Item C,1200,Development,2024-01-17
```

## 🎯 Key Statistics

The dashboard automatically calculates:
- **Total Records**: Number of data entries
- **Average Value**: Mean of all values
- **Maximum Value**: Highest value in dataset
- **Minimum Value**: Lowest value in dataset

## 📱 Responsive Design

- **Desktop**: Full grid layout with all features
- **Tablet**: Optimized grid for medium screens
- **Mobile**: Stacked layout for easy mobile viewing

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/William-osei/data-dashboard.git
   cd data-dashboard
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server for development

3. **Local Development Server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎨 Customization

### Color Theme
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* Add your custom colors */
}
```

### Chart Configuration
Customize charts in `script.js`:
```javascript
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // Add your chart options
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**William Osei Aborah**
- GitHub: [@William-osei](https://github.com/William-osei)
- Portfolio: [william-osei.github.io/portfolio](https://william-osei.github.io/portfolio)
- Email: trickskidwilliam@gmail.com

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for excellent charting library
- [Font Awesome](https://fontawesome.com/) for beautiful icons
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) for responsive layouts

---

⭐ **Star this repository if you found it helpful!**

