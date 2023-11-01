<script>
// importo axios
import axios from 'axios';
// importo CardElement
import CardElement from './CardElement.vue'

export default {
    name: 'BattleComponent',
    components: {
        CardElement,
    },
    data() {
        return {
            memes: [], // memes attualmente nella battle
            votedMeme: null, // meme votato
            dbMemes: [],
        }
    },
    methods: {
        async getMeme() {
            if (this.memes.length < 2) {
                try {
                    const newMeme = await axios.get('https://meme-api.com/gimme').then(response => response.data);
                    // salvo i dati della chiamata API nella variabile newMeme

                    // aggiungo la proprietà score e assegno 0
                    newMeme.score = 0;

                    this.memes.push(newMeme); // pusho newMeme nell'array memes
                } catch (error) {
                    console.error('Errore:', error);
                    throw error;
                }
            }
        },
        async startChallenge() {
            while (this.memes.length < 2) {
                try {
                    await this.getMeme(); // chiamo getMeme() 
                    console.log('ora la lunghezza di memes è', this.memes.length);
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    console.error('Errore:', error);
                    break; // in caso di errore esce dal loop
                }
            }
        },
        saveMemeToDb(index) {
            const meme = this.memes[index];
            // Object to send to backend
            const data = {
                author: meme.author,
                nsfw: meme.nsfw,
                postLink: meme.postLink,
                preview: meme.preview,
                score: meme.score,
                spoiler: meme.spoiler,
                subreddit: meme.subreddit,
                title: meme.title,
                ups: meme.ups,
                url: meme.url
            };
            axios.post('http://127.0.0.1:8000/api/memes', data)
                .then((response) => {
                    console.log(response);
                });
        },
        async getMemesUrls() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/memes');
                this.dbMemes = response.data;

            } catch (error) {
                console.error('Errore durante il recupero degli url dei meme dal server:', error);
            }
        },
        async voteMeme(index) {
            const meme = this.memes[index];
            meme.score = meme.score + 1; //// CAMBIARE

            await this.getMemesUrls();

            if (!this.dbMemes.includes(meme.url)) { // se non esiste già un meme nel db con lo stesso url del meme votato allora aggiungo il meme al db
                this.saveMemeToDb(index); // richiamo la funzione saveMemeToDb 
            } else {
                console.log('ESISTE GIà'); ///// QUI EDIT //////////////////////////////////////////7*********************
            }

            // elimino il meme perdente dall'array memes
            this.memes.splice(0, index); // rimuovi gli elementi prima dell'index del meme vincitore
            this.memes.splice(index + 1) // rimuovi gli elementi dopo l'index del meme vincitore

            this.getMeme(); // chiama un nuovo meme
        }
    },
    created() {
        this.startChallenge();
    }
}
</script>

<template>
    <div class="row d-flex">
        <div class="col" v-for="(meme, index) in memes">
            <CardElement :meme="meme" @click="memes.length > 1 && voteMeme(index)" />
            <!-- la funzione voteMeme viene eseguita solo se la lughezza di memes è maggiore di uno -->
        </div>
    </div>
</template>

<style lang="scss"></style>