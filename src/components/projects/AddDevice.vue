<template>
    <v-form class="d-flex ga-5" v-model="valid">
        <v-text-field 
            v-model="name"
            label="Add Device To Get API Key"
            hint="Enter your device name"
            density="compact"
            variant="outlined"
            clearable
            :rules="[rules.required, rules.min3]"
        ></v-text-field>
        <v-btn 
            @click="addDevice"
            class="bg-success" 
            :disabled="!valid"
        >Add</v-btn>
    </v-form>
</template>

<script setup>
import rules from '@/utils/rules';
import { useDeviceStore } from '@/store/project/device';
import { ref } from 'vue';


const device = useDeviceStore()
const props = defineProps(['projectId'])

const name = ref('')

const valid = ref(false)
const loading = ref(false)


const addDevice = async () => {
    if (loading.value) return
    loading.value = true

    await device
        .create(name.value, props.projectId)
        .finally(() => loading.value = false)
}

</script>

<style lang="scss" scoped>

</style>