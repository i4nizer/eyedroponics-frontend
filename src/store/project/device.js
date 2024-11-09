import { defineStore } from "pinia";
import { ref, watch } from "vue";
import notif from "@/utils/notif";
import api from "@/utils/api";



export const useDeviceStore = defineStore('device', () => {

    // ---state
    const all = ref(JSON.parse(localStorage.getItem('device-all')) || [])
    const name = ref(localStorage.getItem('device-name') || '')
    const key = ref(localStorage.getItem('device-key') || '')
    
    
    // ---getters
    
    
    // ---watchers
    watch(all, (nv) => localStorage.setItem('device-all', JSON.stringify(nv)), { deep: true })
    watch(name, (nv) => localStorage.setItem('device-name', nv))
    watch(key, (nv) => localStorage.setItem('device-key', nv))


    // ---actions
    const get = (id) => all.value.find(d => d._id == id)

    const load = async () => {
        return await api
            .get('/user/project/device')
            .then(res => all.value = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const create = async (name, key, projectId) => {
        return await api
            .post('/user/project/device', { name, key, projectId })
            .then(res => all.value.push(res.data.obj))
            .catch(err => notif.addError(err))
    }

    const update = async (id, name, key) => {
        return await api
            .post('/user/project/device', { _id: id, name, key })
            .then(res => all.value[all.value.findIndex(d => d._id == id)] = res.data.obj)
            .catch(err => notif.addError(err))
    }
    
    const remove = async (id) => {
        return await api
            .delete(`/user/project/device/${id}`)
            .then(res => all.value = all.value.filter(d => d._id == id))
            .catch(err => notif.addError(err))
    }



    // expose
    return {
        all,
        name,
        key,
        get,
        load,
        create,
        update,
        remove,
    }

})