<template>
    <v-list class="d-flex flex-row ga-5 flex-wrap justify-start align-start bg-transparent">
        
        <!-- List of Projects -->
        <v-card 
            v-if="project.all.length > 0"
            v-for="(proj, index) in (project.all || [])" 
            :key="proj?._id || index" 
            width="100%"
            class="pa-10 pt-5"    
        >
            <!-- Project Name -->
            <v-card-title class="mb-5">Project: {{ proj?.name }}</v-card-title>

            <!-- Adding of Device -->
            <AddDevice :project-id="proj?._id"></AddDevice>
        
            <!-- Table of Devices with their API Keys -->
            <DeviceTable :project="proj"></DeviceTable>

        </v-card>
        <h1 v-else>No Projects Yet</h1>

    </v-list>
</template>

<script setup>
import { useDeviceStore } from '@/store/project/device';
import { useProjectStore } from '@/store/project/project';
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';

const AddDevice = defineAsyncComponent(() => import('@/components/projects/AddDevice.vue'))
const DeviceTable = defineAsyncComponent(() => import('@/components/projects/DeviceTable.vue'))


const device = useDeviceStore()
const project = useProjectStore()



onBeforeMount(async () => {

    // load 'em
    await project.load()
    await device.load(project.all)

})

</script>

<style lang="scss" scoped>

</style>