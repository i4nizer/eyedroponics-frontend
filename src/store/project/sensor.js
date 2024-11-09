import { defineStore } from "pinia";
import { ref, watch } from "vue";
import notif from "@/utils/notif";
import api from "@/utils/api";



export const useSensorStore = defineStore('sensor', () => {

    // ---state
    const all = ref(JSON.parse(localStorage.getItem('sensor-all')) || [])
    const name = ref(localStorage.getItem('sensor-name') || '')

    
    // ---getters
    
    
    // ---watchers
    watch(all, (nv) => localStorage.setItem('sensor-all', JSON.stringify(nv)), { deep: true })
    watch(name, (nv) => localStorage.setItem('sensor-name', nv))
    
    
    // ---actions
    const get = (id) => all.value.find(s => s._id == id)

    const load = async () => {
        return await api
            .get('/user/project/device/sensor')
            .then(res => all.value = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const create = async (name, deviceId) => {
        return await api
            .post('/user/project/device/sensor', { name, deviceId })
            .then(res => all.value.push(res.data.obj))
            .catch(err => notif.addError(err))
    }

    const update = async (id, name) => {
        return await api
            .patch('/user/project/device/sensor', { _id: id, name })
            .then(res => all.value[all.value.findIndex(s => s._id == id)] = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const remove = async (id) => {
        return await api
            .delete(`/user/project/device/sensor/${id}`)
            .then(res => all.value = all.value.filter(s => s._id == id))
            .catch(err => notif.addError(err))
    }


    // expose
    return {
        all,
        name,
        get,
        load,
        create,
        update,
        remove,
    }

})