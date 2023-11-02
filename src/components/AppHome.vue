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
            layoutReversed: false, // definisco una variabile per tracciare il layout
            store,
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
        },
        changeLayout() {
            this.layoutReversed = !this.layoutReversed;

            const rowLayout = document.getElementById('row-layout'); // seleziona l'elemento row-layout
            const buttonLayout = document.getElementById('layout-button'); // seleziona il button layout

            if (this.layoutReversed) {
                rowLayout.classList.add('flex-xl-row-reverse');
                buttonLayout.classList.remove('layout-button-right');
                buttonLayout.classList.add('layout-button-left');
            } else {
                rowLayout.classList.remove('flex-xl-row-reverse');
                buttonLayout.classList.remove('layout-button-left');
                buttonLayout.classList.add('layout-button-right');
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
    <!-- change layout button -->
    <button id="layout-button" class="layout-button-right btn d-none d-xl-block" @click="changeLayout()">
        <small><i class="fa-solid fa-right-left"></i> Change layout</small>
    </button>
    <!-- /change layout button -->
    <!-- container -->
    <div class="container-fluid p-0 m-0">
        <!-- row -->
        <div id="row-layout"
            class="row w-100 flex-column flex-xl-row align-items-start align-items-xl-center justify-content-between p-0 m-0">
            <!-- Leaderboard Component -->
            <LeaderboardComponent :scoreOrderedMemes="scoreOrderedMemes" />
            <!-- passo al componente la classifica tramite props -->
            <!-- Battle Component -->
            <BattleComponent @updateLeaderboard="getLeaderboard()" /> <!-- ascolto l'evento emit del componente  -->
        </div>
        <!-- /row -->
    </div>
    <!-- /container -->
</template>

<style scoped lang="scss">
#layout-button {
    position: absolute;
    top: .625rem;
    background-color: #6794d7;
}

#layout-button:hover {
    color: white;
}

#layout-button:active {
    background-color: transparent;
}

.layout-button-right {
    right: .625rem;
}

.layout-button-left {
    left: .625rem;
}

.container {
    height: 100vh;
}
</style>