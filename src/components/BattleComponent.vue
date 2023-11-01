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
            } /////// posso fare una chiamata post per salvare dati nel db qui ///
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
        voteMeme(index) {
            const meme = this.memes[index];
            meme.score = meme.score + 1;
            console.log('SCORE', meme.score);

            this.memes.splice(0, index); // rimuovi gli elementi prima dell'indice
            this.memes.splice(index + 1) // rimuovi gli elementi dopo l'indice
            console.log('MEMES', this.memes);

            this.getMeme();
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