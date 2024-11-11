<template>
    <v-form class="rounded pa-10 bg-grey-darken-4 d-flex ga-5" v-model="valid">
        <v-text-field 
            v-model="project.name" 
            label="Create Your Project Here" 
            hint="Enter your project name"
            variant="outlined"
            clearable
            :rules="[rules.required, rules.min3]"
        />
        <v-btn 
            @click="createProject" 
            :disabled="!valid" 
            :loading="loading" 
            size="x-large"
            class="pl-5 pr-5 bg-success"
        >Create</v-btn>
    </v-form>
</template>

<script setup>
import rules from '@/utils/rules';
import { useProjectStore } from '@/store/project/project';
import { ref } from 'vue';


const project = useProjectStore()

const valid = ref(false)
const loading = ref(false)


const createProject = async () => {
    loading.value = true
    await project
        .create(project.name)
        .finally(() => loading.value = false)
}

</script>

<style lang="scss" scoped>

</style>