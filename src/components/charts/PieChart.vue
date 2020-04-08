<script>
import { Pie } from 'vue-chartjs'
export default {
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      data: {
        labels: this.chartData.name,
        datasets: [
          {
            backgroundColor: ['#368CD7', '#ed6a5a', '#f4f1bb', '#9bc1bc', '#e6ebe0', '#36c9c6', '#3c896d', '#80a4ed', '#d4cb92', '#595a4a'],
            pointBackgroundColor: 'white',
            borderWidth: 0,
            pointBorderColor: '#249EBF',
            data: this.chartData.count
          }
        ]
        
      },
      options: {
          legend: {
            display: true,
            position: 'right'
          },
          responsive: true,
          maintainAspectRatio: false,
        }
    }
  },
  extends: Pie,
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>