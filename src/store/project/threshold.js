import api from "@/utils/api";
import notif from "@/utils/notif";
import { defineStore } from "pinia";
import { ref, watch } from "vue";



export const useThresholdStore = defineStore('threshold', () => {

    // ---state
    const all = ref(JSON.parse(localStorage.getItem('threshold-all')) || [])
    const nitrogen = ref(JSON.parse(localStorage.getItem('threshold-nitrogen')) || { min: 0, max: 0 })
    const phosphorus = ref(JSON.parse(localStorage.getItem('threshold-phosphorus')) || { min: 0, max: 0 })
    const potassium = ref(JSON.parse(localStorage.getItem('threshold-potassium')) || { min: 0, max: 0 })
    const ph = ref(JSON.parse(localStorage.getItem('threshold-ph')) || { min: 0, max: 0 })
    const activated = ref(localStorage.getItem('threshold-activated') === "true" || false)
    

    // ---getters


    // ---watchers
    watch(all, (nv) => localStorage.setItem('threshold-all', JSON.stringify(nv)), { deep: true })
    watch(nitrogen, (nv) => localStorage.setItem('threshold-nitrogen', JSON.stringify(nv)), { deep: true })
    watch(phosphorus, (nv) => localStorage.setItem('threshold-phosphorus', JSON.stringify(nv)), { deep: true })
    watch(potassium, (nv) => localStorage.setItem('threshold-potassium', JSON.stringify(nv)), { deep: true })
    watch(ph, (nv) => localStorage.setItem('threshold-ph', JSON.stringify(nv)), { deep: true })
    watch(activated, (nv) => localStorage.setItem('threshold-activated', nv === 'true'))


    // ---actions
    const get = (id) => all.value.find(t => t._id == id)

    const load = async () => {
        return await api
            .get('/user/project/threshold')
            .then(res => all.value = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const create = async (nitrogen, phosphorus, potassium, ph, activated) => {
        return await api
            .post('/user/project/threshold', { nitrogen, phosphorus, potassium, ph, activated })
            .then(res => all.value.push(res.data.obj))
            .catch(err => notif.addError(err))
    }

    const update = async (id, nitrogen, phosphorus, potassium, ph, activated) => {
        return await api
            .patch('/user/project/threshold', { _id: id, nitrogen, phosphorus, potassium, ph, activated })
            .then(res => all.value[all.value.findIndex(t => t._id == id)] = res.data.obj)
            .catch(err => notif.addError(err))
    }

    const remove = async (id) => {
        return await api
            .delete(`/user/project/threshold/${id}`)
            .then(res => all.value = all.value.filter(t => t._id != id))
            .catch(err => notif.addError(err))
    }



    // expose
    return {
        all,
        nitrogen,
        phosphorus,
        potassium,
        ph,
        activated,
        get,
        load,
        create,
        update,
        remove,
    }


})