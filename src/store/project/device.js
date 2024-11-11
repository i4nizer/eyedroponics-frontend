import { defineStore } from "pinia";
import { ref, watch } from "vue";
import notif from "@/utils/notif";
import api from "@/utils/api";



export const useDeviceStore = defineStore('device', () => {

    // ---state
    const all = ref(JSON.parse(localStorage.getItem('device-all')) || [])
    
    
    // ---getters
    
    
    // ---watchers
    watch(all, (nv) => localStorage.setItem('device-all', JSON.stringify(nv)), { deep: true })
    

    // ---actions
    const get = (id) => all.value.find(d => d._id == id)
    
    const load = async (projects) => {
        try {
            all.value = []
            for (const p of projects) {
                const res = await api.get(`/user/project/${p._id}/device`)
                all.value = [ ...all.value, ...res.data.obj]
            }
        } catch (error) { notif.add(error.toString(), 'error') }
    }

    const create = async (name, projectId, sensors = []) => {
        return await api
            .post(`/user/project/${projectId}/device`, { name, sensors })
            .then(res => all.value.push(res.data.obj))
            .catch(err => console.log(err))
    }

    const update = async (id, name, projectId, sensors = []) => {
        return await api
            .patch(`/user/project/${projectId}/device/${id}`, { name, sensors })
            .then(res => all.value[all.value.findIndex(d => d._id == id)] = res.data.obj)
            .catch(err => notif.addError(err))
    }
    
    const remove = async (id, projectId) => {
        return await api
            .delete(`/user/project/${projectId}/device/${id}`)
            .then(res => all.value = all.value.filter(d => d._id != id))
            .catch(err => notif.addError(err))
    }



    // expose
    return {
        all,
        get,
        load,
        create,
        update,
        remove,
    }

})