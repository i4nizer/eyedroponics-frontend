<template>
    <v-container class="pa-10">
        <CreateProject class="mb-5"></CreateProject>
        <ProjectList class="mb-5"></ProjectList>
    </v-container>
</template>

<script setup>
import layout from '@/utils/layout';
import { defineAsyncComponent, ref } from 'vue';

const CreateProject = defineAsyncComponent(() => import('@/components/projects/CreateProject.vue'))
const ProjectList = defineAsyncComponent(() => import('@/components/projects/ProjectList.vue'))


// show layout
layout.showAppBar.value = true
layout.showNavDrawer.value = true


</script>
