<script>
// importo axios
import axios from 'axios';
// importo lo store
import store from '../store';

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
            databaseMemes: [], // memes presenti nel database
            scoreOrderedMemes: null, // memes presenti nel db in ordine decrescente secondo il valore 'score'
            store
        }
    },
    methods: {
        // funzione che richiama i memes del db e stila una classifica
        async getLeaderboard() {
            try {
                // chiamata GET per ottenere tutti i memes presenti nel database 
                const response = await axios.get(this.store.apiDbUrl);
                this.databaseMemes = response.data;
                this.scoreOrderedMemes = [...this.databaseMemes].sort((a, b) => b.score - a.score); // ordina i meme secondo il valore 'score' in ordine decrescente
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
    <!-- container -->
    <div class="container-fluid p-0 m-0">
        <!-- row -->
        <div class="row w-100 flex-column flex-xl-row align-items-start align-items-xl-center justify-content-between">
            <!-- Leaderboard Component -->
            <LeaderboardComponent :scoreOrderedMemes="scoreOrderedMemes" /> <!-- passo al componente la classifica tramite props -->
            <!-- Battle Component -->
            <BattleComponent @updateLeaderboard="getLeaderboard()" /> <!-- ascolto l'evento emit del componente  -->
        </div>
        <!-- /row -->
    </div>
    <!-- /container -->
</template>

<style scoped lang="scss">
.container {
    height: 100vh;
}
</style>