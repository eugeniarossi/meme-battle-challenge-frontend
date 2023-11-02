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
            dbMemes: null,
            scoreOrderedMemes: null,
        }
    },
    methods: {
        async getLeaderboard() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/memes');
                this.dbMemes = response.data;
                this.scoreOrderedMemes = [...this.dbMemes].sort((a, b) => b.score - a.score); // ordina i meme secondo il valore di score in ordine decrescente
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        }
    },
    created() {
        this.getLeaderboard();
    }
}
</script>

<template>
    <BattleComponent @getLeaderboard="getLeaderboard()" />
    <LeaderboardComponent :scoreOrderedMemes="scoreOrderedMemes" />
</template>

<style scoped lang="scss">
h2 {
    color: blue;
}
</style>