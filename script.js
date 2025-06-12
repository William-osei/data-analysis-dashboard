class DataDashboard {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.charts = {};
        this.init();
    }

    init() {
        this.bindEventListeners();
        this.loadSampleData();
        this.setupCharts();
    }

    bindEventListeners() {
        document.getElementById('dataSource').addEventListener('change', (e) => {
            if (e.target.value === 'csv') {
                document.getElementById('csvFile').click();
            } else {
                this.loadData(e.target.value);
            }
        });

        document.getElementById('csvFile').addEventListener('change', (e) => {
            this.handleCSVUpload(e);
        });

        document.getElementById('refreshData').addEventListener('click', () => {
            const source = document.getElementById('dataSource').value;
            this.loadData(source);
        });

        document.getElementById('exportData').addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('searchFilter').addEventListener('input', (e) => {
            this.filterData(e.target.value);
        });

        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortData(e.target.value);
        });
    }

    generateSampleData() {
        const categories = ['Sales', 'Marketing', 'Development', 'Support', 'HR'];
        const names = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Service X', 'Service Y'];
        const data = [];

        for (let i = 0; i < 50; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            
            data.push({
                name: names[Math.floor(Math.random() * names.length)] + ` ${i + 1}`,
                value: Math.floor(Math.random() * 1000) + 100,
                category: categories[Math.floor(Math.random() * categories.length)],
                date: date.toISOString().split('T')[0]
            });
        }
        return data;
    }

    generateRandomData() {
        const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
        const data = [];

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 60));
            
            data.push({
                name: `Item ${i + 1}`,
                value: Math.floor(Math.random() * 2000) + 50,
                category: categories[Math.floor(Math.random() * categories.length)],
                date: date.toISOString().split('T')[0]
            });
        }
        return data;
    }

    loadData(source) {
        let newData = [];
        
        switch (source) {
            case 'sample':
                newData = this.generateSampleData();
                break;
            case 'random':
                newData = this.generateRandomData();
                break;
            default:
                newData = this.generateSampleData();
        }
        
        this.data = newData;
        this.filteredData = [...this.data];
        this.updateDashboard();
    }

    loadSampleData() {
        this.loadData('sample');
    }

    handleCSVUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                const data = [];

                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim() === '') continue;
                    const values = lines[i].split(',').map(v => v.trim());
                    
                    if (values.length >= 4) {
                        data.push({
                            name: values[0] || `Item ${i}`,
                            value: parseFloat(values[1]) || 0,
                            category: values[2] || 'Uncategorized',
                            date: values[3] || new Date().toISOString().split('T')[0]
                        });
                    }
                }

                if (data.length > 0) {
                    this.data = data;
                    this.filteredData = [...this.data];
                    this.updateDashboard();
                } else {
                    alert('No valid data found in CSV file. Please ensure it has columns: name, value, category, date');
                }
            } catch (error) {
                alert('Error parsing CSV file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    exportToCSV() {
        if (this.filteredData.length === 0) {
            alert('No data to export');
            return;
        }

        const headers = ['Name', 'Value', 'Category', 'Date'];
        const csvContent = [
            headers.join(','),
            ...this.filteredData.map(row => 
                [row.name, row.value, row.category, row.date].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    filterData(searchTerm) {
        if (!searchTerm) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        this.updateDashboard();
    }

    sortData(sortBy) {
        this.filteredData.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'value':
                    return b.value - a.value;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });
        this.updateTable();
    }

    calculateStats() {
        if (this.filteredData.length === 0) {
            return { total: 0, average: 0, max: 0, min: 0 };
        }

        const values = this.filteredData.map(item => item.value);
        return {
            total: this.filteredData.length,
            average: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
            max: Math.max(...values),
            min: Math.min(...values)
        };
    }

    updateStats() {
        const stats = this.calculateStats();
        
        document.getElementById('totalRecords').textContent = stats.total;
        document.getElementById('averageValue').textContent = stats.average;
        document.getElementById('maxValue').textContent = stats.max;
        document.getElementById('minValue').textContent = stats.min;
    }

    setupCharts() {
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        };

        // Line Chart
        this.charts.line = new Chart(document.getElementById('lineChart'), {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Bar Chart
        this.charts.bar = new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: { labels: [], datasets: [] },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Pie Chart
        this.charts.pie = new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: { labels: [], datasets: [] },
            options: commonOptions
        });

        // Doughnut Chart
        this.charts.doughnut = new Chart(document.getElementById('doughnutChart'), {
            type: 'doughnut',
            data: { labels: [], datasets: [] },
            options: commonOptions
        });
    }

    updateCharts() {
        if (this.filteredData.length === 0) return;

        // Prepare data for charts
        const categoryData = this.getCategoryData();
        const timeSeriesData = this.getTimeSeriesData();
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

        // Update Line Chart (time series)
        this.charts.line.data = {
            labels: timeSeriesData.labels,
            datasets: [{
                label: 'Values Over Time',
                data: timeSeriesData.values,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };

        // Update Bar Chart (categories)
        this.charts.bar.data = {
            labels: categoryData.labels,
            datasets: [{
                label: 'Values by Category',
                data: categoryData.values,
                backgroundColor: colors.slice(0, categoryData.labels.length),
                borderColor: colors.slice(0, categoryData.labels.length),
                borderWidth: 1
            }]
        };

        // Update Pie Chart
        this.charts.pie.data = {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.values,
                backgroundColor: colors.slice(0, categoryData.labels.length)
            }]
        };

        // Update Doughnut Chart
        this.charts.doughnut.data = {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.values,
                backgroundColor: colors.slice(0, categoryData.labels.length)
            }]
        };

        // Update all charts
        Object.values(this.charts).forEach(chart => chart.update());
    }

    getCategoryData() {
        const categoryTotals = {};
        
        this.filteredData.forEach(item => {
            categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.value;
        });

        return {
            labels: Object.keys(categoryTotals),
            values: Object.values(categoryTotals)
        };
    }

    getTimeSeriesData() {
        const dateTotals = {};
        
        this.filteredData.forEach(item => {
            dateTotals[item.date] = (dateTotals[item.date] || 0) + item.value;
        });

        const sortedDates = Object.keys(dateTotals).sort();
        
        return {
            labels: sortedDates,
            values: sortedDates.map(date => dateTotals[date])
        };
    }

    updateTable() {
        const tbody = document.getElementById('dataTableBody');
        tbody.innerHTML = '';

        this.filteredData.forEach((item, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.value.toLocaleString()}</td>
                <td><span class="category-badge">${item.category}</span></td>
                <td>${item.date}</td>
            `;
        });

        document.getElementById('recordCount').textContent = `(${this.filteredData.length} records)`;
    }

    updateDashboard() {
        this.updateStats();
        this.updateCharts();
        this.updateTable();
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new DataDashboard();
});

