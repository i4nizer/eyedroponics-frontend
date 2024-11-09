<template>
    <v-container class="d-flex flex-column justify-start" fluid>
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
import NPKChart from "@/components/dashboard/NPKChart.vue";
import PHChart from "@/components/dashboard/PHChart.vue";
import Camera from "@/components/dashboard/Camera.vue";
import layout from "@/utils/layout";


layout.showAppBar.value = true;
layout.showNavDrawer.value = true;  

</script>
