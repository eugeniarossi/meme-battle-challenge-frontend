<script>
// importo axios
import axios from 'axios';
// importo lo store
import store from '../store';

// importo CardElement
import CardElement from './CardElement.vue';

export default {
    name: 'BattleComponent',
    components: {
        CardElement,
    },
    data() {
        return {
            memes: [], // memes attualmente nella battle
            store
        }
    },
    methods: {
        // funzione che esegue una chiamata api per ottenere un nuovo meme
        async getMeme() {
            // controlla che non ci siano già due elementi in 'memes'
            if (this.memes.length < 2) {
                try {
                    const newMeme = await axios.get(this.store.apiMemes).then(response => response.data);
                    // salva i dati della chiamata API nella variabile newMeme

                    this.memes.push(newMeme); // aggiunge 'newMeme' all'array 'memes'
                } catch (error) {
                    console.error('Errore:', error);
                    throw error;
                }
            }
        },
        // funzione che avvia la challenge
        async startChallenge() {
            while (this.memes.length < 2) { // finchè la lunghezza dell'array 'memes' non è 2
                try {
                    await this.getMeme(); // esegue la funzione getMeme() 
                    await new Promise(resolve => setTimeout(resolve, 700)); // timeout per evitare che prenda lo stesso meme della prima chiamata
                } catch (error) {
                    console.error('Errore:', error);
                    break; // in caso di errore esce dal loop
                }
            }
        },
        // funzione per inserire un nuovo meme nel db
        saveMemeToDb(index) {
            const meme = this.memes[index];
            // oggetto da inviare al backend
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
            // chiamata post al db a cui passo l'oggetto data
            axios.post(this.store.apiDbUrl, data)
                .then((response) => {
                    //console.log(response);
                });
        },
        async updateScore(id) {
            // fa una richiesta update per aggiornare lo score di un meme già presente nel db
            await axios.put(`${this.store.apiDbUrl}/${id}`, {}) // passo l'id del meme
                .then(response => {
                    //console.log('Punteggio del meme aggiornato con successo', id);
                }).catch(error => {
                    //console.error('Errore durante aggiornamento del punteggio del meme:', error);
                });
        },
        // funzione che richiama i memes dal db e li salva in 'dbMemes'
        async getDbMemes() {
            try {
                const response = await axios.get(this.store.apiDbUrl);
                this.store.dbMemes = response.data;
            } catch (error) {
                //console.error('Errore durante il recupero dei dati:', error);
            }
        },
        // funzione che registra il voto 
        async voteMeme(index) {
            const votedMeme = this.memes[index]; // salva il meme votato in 'meme'

            await this.getDbMemes(); // prende i memes del db e li salva in 'dbMemes'

            // dichiara variabili necessarie per il ciclo for
            let found = false;
            let memeId;

            // controlla se il meme votato è presente nel db confrontando le url
            for (let i = 0; i < this.store.dbMemes.length; i++) {
                if (votedMeme.url === this.store.dbMemes[i].url) { // se presente
                    found = true;
                    memeId = this.store.dbMemes[i].id; // salva l'id del meme
                    break; // interrompe il ciclo
                }
            }

            if (!found) { // se il meme votato non è presente nel db
                votedMeme.score = 1; // gli assegna la proprietà score con valore 1
                this.saveMemeToDb(index); // e lo inserisce nel db
            } else {
                this.updateScore(memeId); // se è presente aggiorna lo score
            }

            // elimina il meme perdente dall'array 'memes'
            this.memes.splice(0, index); // rimuove gli elementi prima dell'index del meme vincitore
            this.memes.splice(index + 1) // rimuove gli elementi dopo l'index del meme vincitore

            this.getMeme(); // chiama un nuovo meme

            this.getDbMemes(); // richiama dinuovo i memes aggiornati nel db
        },
        // gestisce il voto al click
        async handleVote(index) {
            await this.voteMeme(index); // esegue la funzione per salvare il voto
            this.$emit('updateLeaderboard'); // fa un emit di updateLeaderboard
        }
    },
    created() {
        // esegue la funzione per avviare la challenge
        this.startChallenge();
    }
}
</script>

<template>
    <!-- battle col -->
    <div class="battle-col col col-xl-7 d-flex flex-column align-items-center flex-grow-1">
        <!-- header -->
        <h3 class="mt-3 mb-4">Meme Battle Challenge</h3>
        <!-- battle card -->
        <div
            class="battle-card d-flex flex-column flex-md-row justify-content-center align-items-center m-4 py-3 px-4 card">
            <div class="m-2 m-md-3" v-for="(meme, index) in memes">
                <!-- card element (element to repeat) -->
                <CardElement :meme="meme" @click="memes.length > 1 && handleVote(index)" />
                <!-- la funzione handleVote viene eseguita solo quando ci sono almeno due memes -->
            </div>
        </div>
        <!-- /battle card -->
    </div>
    <!-- /battle col -->
</template>

<style lang="scss" scoped>
.battle-card {
    background-color: #222f43;

    -webkit-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.30);
    box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.30);
}

h3 {
    color: #88b8ff;
    font-family: 'Roboto Mono', monospace;
}
</style>