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
        }
    },
    created() {
        this.startChallenge();
    }
}
</script>

<template>
    <div class="row d-flex">
        <div class="col" v-for="meme in memes">
            <CardElement :meme="meme" />
        </div>
    </div>
</template>

<style lang="scss"></style>