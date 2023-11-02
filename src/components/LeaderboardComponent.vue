<script>
// importo LeaderboardItem
import LeaderboardItem from './LeaderboardItem.vue';

export default {
    name: 'LeaderboardComponent',
    components: {
        LeaderboardItem
    },
    props: { // dichiaro le props
        scoreOrderedMemes: Array,
    }
}
</script>

<template>
    <div class="leaderboard-col col-auto">
        <button class="btn btn-primary d-xl-none px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">Leaderboard</button>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample">

            <div class="card" style="width: 100;">
                <div class="offcanvas-header d-flex align-items-center justify-content-between px-3">
                    <h4 class="text-center py-2">Leaderboard</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <ul class="offcanvas-body list-group list-group-flush">
                    <li class="list-group-item d-flex p-3" v-for="meme in scoreOrderedMemes">
                        <LeaderboardItem :meme="meme" />
                    </li>
                </ul>
            </div>

        </div>

        <div class="card d-none d-xl-block" style="width: 18rem;">
            <h4 class="text-center py-2">Leaderboard</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex p-3" v-for="meme in scoreOrderedMemes">
                    <LeaderboardItem :meme="meme" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/*
.leaderboard-col {
    position: absolute;
    top: 0;
    left: 0;
}*/
.card {
    max-height: 100vh;
    overflow-y: scroll;
}
</style>