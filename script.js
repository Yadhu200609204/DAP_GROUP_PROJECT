document.addEventListener('DOMContentLoaded', function () {
    const charts = {};

    const chartTypes = ['frequency', 'storage', 'price'];
    chartTypes.forEach(chartType => {
        fetch(`/static/data/${chartType}.json`)
            .then(response => response.json())
            .then(data => {
                charts[chartType] = data;
            });
    });

    function renderChart(containerId, chartData) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        if (chartData.type === 'bar') {
            Plotly.newPlot(container, [{ x: chartData.x, y: chartData.y, type: 'bar' }]);
        } else if (chartData.type === 'pie') {
            Plotly.newPlot(container, [{ labels: chartData.labels, values: chartData.values, type: 'pie' }]);
        } else if (chartData.type === 'scatter') {
            Plotly.newPlot(container, [{ x: chartData.x, y: chartData.y, mode: 'markers', type: 'scatter' }]);
        }
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
            document.getElementById(tabName).style.display = 'block';
            renderChart(`chart-container-${tabName}`, charts[tabName]);
        });
    });
});
