import { reactive } from "vue";

const store = reactive({
    apiDbUrl: 'http://127.0.0.1:8000/api/memes', // url api database
    apiMemes: 'https://meme-api.com/gimme' // url api meme
})

export default store;