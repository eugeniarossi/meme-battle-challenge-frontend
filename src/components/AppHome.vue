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
        // funzione per aggiungere classe css ad un elemento
        addClass(element, className) {
            element.classList.add(className);
        },
        // funzione per rimuovere classe css ad un elemento
        removeClass(element, className) {
            element.classList.remove(className);
        },
        // funzione per cambiare layout
        changeLayout() {
            //al click layoutReversed diventa true
            this.layoutReversed = !this.layoutReversed;

            const rowLayout = document.getElementById('row-layout'); // seleziona l'elemento row-layout
            const buttonLayout = document.getElementById('layout-buttons'); // seleziona il button layout

            if (this.layoutReversed) { // inverto le classi
                this.addClass(rowLayout, 'flex-xl-row-reverse');
                this.removeClass(buttonLayout, 'layout-buttons-right');
                this.addClass(buttonLayout, 'layout-buttons-left');
            } else {
                this.removeClass(rowLayout, 'flex-xl-row-reverse');
                this.removeClass(buttonLayout, 'layout-buttons-left');
                this.addClass(buttonLayout, 'layout-buttons-right');
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
    <div id="layout-buttons" class="d-flex layout-buttons-right">
        <button id="layout-position-button" class="layout-button mx-1 btn d-none d-xl-block" @click="changeLayout()">
            <i class="fa-solid fa-right-left"></i> Change layout
        </button>
    </div>
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
#layout-buttons {
    position: absolute;
    top: .625rem;
}

.layout-button {
    background-color: #6794d7;
    font-size: .8125rem;
}

.layout-button:hover {
    color: white;
}

.layout-button:active {
    background-color: transparent;
}

.layout-buttons-right {
    right: .625rem;
}

.layout-buttons-left {
    left: .625rem;
}

.container {
    height: 100vh;
}
</style>