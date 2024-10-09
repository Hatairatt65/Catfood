import Api from '@/services/Api'
export default {
    index() {
        return Api().get('catfoods')
    },
    show(catfoodId) {
        return Api().get('catfood/' + catfoodId)
    },
    post(catfood) {
        return Api().post('catfood', catfood)
    },
    put(catfood) {
        return Api().put('catfood/' + catfood.id, catfood)
    },
    delete(catfood) {
        return Api().delete('catfood/' + catfood.id, catfood)
    },
}