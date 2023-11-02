<script>
// importo axios
import axios from 'axios';

// importo BattleComponent
import BattleComponent from './BattleComponent.vue';
// importo LeaderboardComponent
import LeaderboardComponent from './LeaderboardComponent.vue';

export default {
    name: 'AppHome',
    components: {
        BattleComponent,
        LeaderboardComponent
    },
    data() {
        return {
            dbMemes: null, // memes presenti nel database
            scoreOrderedMemes: null, // memes presenti nel db in ordine decrescente secondo il valore 'score'
        }
    },
    methods: {
        // funzione che richiama i memes del db e stila una classifica
        async getLeaderboard() {
            try {
                // chiamata GET per ottenere tutti i memes presenti nel database 
                const response = await axios.get('http://127.0.0.1:8000/api/memes');
                this.dbMemes = response.data;
                this.scoreOrderedMemes = [...this.dbMemes].sort((a, b) => b.score - a.score); // ordina i meme secondo il valore 'score' in ordine decrescente
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        }
    },
    created() {
        // eseguo la funzione per stilare la classifica
        this.getLeaderboard();
    }
}
</script>

<template>
    <div class="container-fluid p-0 m-0">
        <div class="row w-100 flex-column flex-xl-row align-items-start align-items-xl-center justify-content-between">
            <LeaderboardComponent :scoreOrderedMemes="scoreOrderedMemes" />
            <!-- passo al componente la classifica tramite props -->
            <BattleComponent @updateLeaderboard="getLeaderboard()" /> <!-- ascolto l'evento emit del componente  -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    height: 100vh;
}
</style>