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
        voteMeme(index) {
            const meme = this.memes[index];

            meme.score = meme.score + 1;
/*
            axios.get('http://127.0.0.1:8000/api/memes')
                .then((response) => {
                    this.dbMemes = response.data;
                    console.log('MEME SALVATI NEL DB', this.dbMemes);
                });
                
                if (!this.dbMemes.includes(meme.title)) { // se lo score del meme è uguale a 1 (il meme non esiste nel db), allora eseguo saveMemeToDb()
                        console.log('NON ESISTE NEL DB', meme.title)
                        this.saveMemeToDb(index); 
                    } else {
                        console.log('ESISTE GIà');
                    } */
            if (meme.title === 1) { // se lo score del meme è uguale a 1 (il meme non esiste nel db), allora eseguo saveMemeToDb()
                this.saveMemeToDb(index); /////////// DA CORREGERE PERCHè POTREBBE COMPARIRE DINUOVO UNO STESSO MEME ////////
            }

            // elimino dall'array memes il meme che ha perso
            this.memes.splice(0, index); // rimuovi gli elementi prima dell'indice
            this.memes.splice(index + 1) // rimuovi gli elementi dopo l'indice

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