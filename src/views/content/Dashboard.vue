<template>
    <v-container class="d-flex flex-column justify-start pa-10" fluid>
        <v-row>
            <!-- NPK Levels Chart -->
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>NPK Levels</v-card-title>
                    <v-card-text>
                        <NPKChart />
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- pH Level Chart -->
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>pH Level</v-card-title>
                    <v-card-text>
                        <PHChart />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <!-- Live Stream from ESP32-CAM -->
            <v-col cols="12">
                <Camera />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import layout from "@/utils/layout";

const NPKChart = defineAsyncComponent(() => import("@/components/dashboard/NPKChart.vue"))
const PHChart = defineAsyncComponent(() => import("@/components/dashboard/PHChart.vue"))
const Camera = defineAsyncComponent(() => import("@/components/dashboard/Camera.vue"))


layout.showAppBar.value = true;
layout.showNavDrawer.value = true;  

</script>
