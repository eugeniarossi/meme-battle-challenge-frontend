<script>
// importo BattleComponent
import BattleComponent from './BattleComponent.vue';
// importo LeaderboardComponent
import LeaderboardComponent from './LeaderboardComponent.vue';

export default {
    name: 'AppHome',
    components: {
        BattleComponent,
        LeaderboardComponent
    }
}
</script>

<template>
    <h2>Hello</h2>
    <BattleComponent />
</template>

<style scoped lang="scss">
h2 {
    color: blue;
}
</style>