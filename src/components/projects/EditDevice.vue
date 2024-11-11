<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                color="primary"
                text="Edit"
                elevation="1"
                class="mr-2"
                ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Edit Device">
                <v-form class="pa-5 d-flex flex-column align-end" v-model="valid" @submit.prevent="saveDevice(isActive)">
                    <v-text-field
                        v-model="deviceName"
                        label="Add Device To Get API Key"
                        hint="Enter your device name"
                        clearable
                        width="100%"
                        variant="outlined"
                        :rules="[rules.required, rules.min3]"
                    >
                    </v-text-field>
                    <v-select
                        v-model="deviceSensors"
                        clearable
                        chips
                        label="Select Sensors"
                        multiple
                        width="100%"
                        variant="outlined"
                        :items="['NPK', 'pH', 'Camera']"
                    ></v-select>
                    <v-btn
                        text="Save"
                        color="success"
                        size="large"
                        width="fit-content"
                        :disabled="!valid || loading"
                        :loading="loading"
                        @click="saveDevice(isActive)"
                    ></v-btn>
                </v-form>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
import { useDeviceStore } from '@/store/project/device';
import notif from '@/utils/notif';
import rules from '@/utils/rules';
import { ref } from 'vue';


const props = defineProps(['project', 'device'])
const device = useDeviceStore()

const valid = ref(false)
const loading = ref(false)

const deviceName = ref(props.device?.name || '')
const deviceSensors = ref(props.device?.sensors || [])


const saveDevice = async (isActive) => {
    loading.value = true
    await device
        .update(props.device?._id, deviceName.value, props.project?._id, deviceSensors.value)
        .finally(() => notif.add('Device successfully updated', 'success'))
    loading.value = false
    isActive.value = false
}



</script>

<style lang="scss" scoped></style>
