<script>
import { Bar } from 'vue-chartjs'
export default {
  props: {
    chartData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      data: {
        labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paz', 'Lis', 'Gru'],
        datasets: [
          {
            label: 'Wydano',
            backgroundColor: '#368CD7',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.chartData
          }
        ]
        
      },
      options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
        }
    }
  },
  extends: Bar,
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>