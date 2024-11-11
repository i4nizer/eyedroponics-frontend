<template>
    <v-table class="border">
        <thead> 
            <tr> 
                <th>Device</th> 
                <th>Api Key</th> 
                <th width="150">Sensors</th> 
                <th width="220">Actions</th> 
            </tr> 
        </thead>
        <tbody>
            <!-- List of Devices -->
            <tr 
                v-if="hasDevices()"
                v-for="(dev, index) in (getProjectDevices())"
                :key="dev?._id || index"
                class="pa-5"
            >
                <td>{{ dev?.name }}</td>
                <td>{{ dev?.key ? '...' + dev?.key.substring(dev?.key.length - 10) : 'No Key' }}</td>
                <td>
                    <!-- List of Device Sensors -->
                    <v-chip 
                        v-if="dev?.sensors.length > 0"
                        v-for="(sensor, index) in dev?.sensors" 
                        :key="index"
                    >{{ sensor }}</v-chip>
                    <v-chip v-else>No Sensors Added</v-chip>
                </td>
                <td width="350">
                    <!-- <v-btn 
                        class="bg-blue mr-2" 
                        elevation="1"
                    >Edit</v-btn> -->
                    <EditDevice :project="project" :device="dev"></EditDevice>
                    <v-btn 
                        class="bg-green mr-2" 
                        elevation="1" 
                        @click="copyKey(dev?.key)" 
                        :disabled="!dev?.key"
                    >Copy Key</v-btn>
                    <v-btn 
                        class="bg-red mr-2" 
                        elevation="1" 
                        :disabled="removingDevice"
                        :loading="removingDevice"
                        @click="removeDevice(dev?._id, project?._id)"
                    >Remove</v-btn>
                </td>
            </tr>
            <tr v-else><td colspan="4" class="text-center">No Devices Yet</td></tr>
        </tbody>
    </v-table>
</template>

<script setup>
import { useDeviceStore } from '@/store/project/device';
import notif from '@/utils/notif';
import { defineAsyncComponent, ref } from 'vue';

const EditDevice = defineAsyncComponent(() => import("@/components/projects/EditDevice.vue"))


const props = defineProps(['project'])
const device = useDeviceStore()

const removingDevice = ref(false)


const copyKey = (key) => {
    navigator.clipboard.writeText(key)
    notif.add('API key copied to your clipboard', 'success')
}

const removeDevice = async (deviceId, projectId) => {
    removingDevice.value = true
    await device
        .remove(deviceId, projectId)
        .finally(() => notif.add('Device removed from project', 'success'))
    removingDevice.value = false
}

const hasDevices = () => (Boolean)(device.all.find(d => d.projectId == props.project?._id))

const getProjectDevices = () => device.all.filter(d => d.projectId == props.project?._id)

</script>

<style lang="scss" scoped>

</style>