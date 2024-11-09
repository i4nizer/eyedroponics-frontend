import api from "@/utils/api";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import notif from "@/utils/notif";


export const useProjectStore = defineStore('project', () => {

    // ---state
    const all = ref(JSON.parse(localStorage.getItem('project-all')) || [])
    const name = ref(localStorage.getItem('project-name') || '')
    
    
    // ---getters
    
    
    // ---watchers
    watch(all, (nv) => localStorage.setItem('project-all', JSON.stringify(nv)), { deep: true })
    watch(name, (nv) => localStorage.setItem('project-name', nv))
    
    
    // ---actions
    const get = (id) => all.value.find(p => p._id == id)

    const load = async () => {
        return await api
            .get('/user/project')
            .then(res => all.value = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const create = async (name) => {
        return await api
            .post('/user/project', { name })
            .then(res => all.value.push(res.data.obj))
            .catch(err => notif.addError(err))
    }

    const update = async (id, name) => {
        return await api
            .patch('/user/project', { _id: id, name })
            .then(res => all.value[all.value.findIndex(p => p._id == id)] = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const remove = async (id) => {
        return await api
            .delete(`/user/project/${id}`)
            .then(res => all.value = all.value.filter(p => p._id != id))
            .catch(err => notif.addError(err))
    }
    

    // expose
    return {
        id,
        name,
        creation,
        set,
        get,
        load,
        create,
        update,
        remove,
    }

})