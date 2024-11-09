<template>
    <Bar :data="chartData" :options="options" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const chartData = ref({
    labels: ['N', 'P', 'K'],
    datasets: [{
        label: 'NPK Levels',
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        data: [30, 45, 60,], // Replace with dynamic data
    }],
})


const options = ref({
    responsive: true,
    maintainAspectRatio: false,
})

</script>
