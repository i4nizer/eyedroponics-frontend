<template>
    <Line :data="chartData" :options="options" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)


const chartData = ref({
    labels: ['Time 1', 'Time 2', 'Time 3'],
    datasets: [{
        label: 'pH Level',
        backgroundColor: '#8e44ad',
        borderColor: '#8e44ad',
        data: [6.5, 7.0, 6.8],
        fill: false,
    }],
})


const options = ref({
    responsive: true,
    maintainAspectRatio: false,
})


</script>
