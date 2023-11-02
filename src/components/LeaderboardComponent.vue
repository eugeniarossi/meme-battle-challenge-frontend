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
    <!-- leaderboard col -->
    <div class="leaderboard-col col-3 mb-3 mb-xl-0">
        <!-- offcanvas-button -->
        <button class="offcanvas-button btn d-xl-none px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">Leaderboard</button>
        <!-- offcanvas -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample">
            <div class="card bg-light" style="width: 100;">
                <!-- offcanvas-header -->
                <div class="offcanvas-header d-flex align-items-center justify-content-between px-3">
                    <h4 class="text-center py-2">Leaderboard <i class="fa-solid fa-trophy"></i></h4>
                    <!-- close button -->
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <!-- /offcanvas-header -->
                <!-- offcanvas-body -->
                <ul class="offcanvas-body list-group list-group-flush">
                    <li class="list-group-item d-flex p-3 bg-light" v-for="meme in scoreOrderedMemes">
                        <!-- Leaderboard list Item -->
                        <LeaderboardItem :meme="meme" />
                    </li>
                </ul>
                <!-- /offcanvas-body -->
            </div>
        </div>
        <!-- /offcanvas -->

        <!-- static-leaderboard -->
        <div class="static-leaderboard card d-none d-xl-block bg-light">
            <div class="heading d-flex  justify-content-between align-items-center px-3 pt-3 pb-2">
                <h4>Leaderboard</h4>
                <h4><i class="fa-solid fa-trophy"></i></h4>
            </div>
            <!-- ul -->
            <ul class="static-ul list-group list-group-flush">
                <li class="list-group-item" v-for="meme in scoreOrderedMemes">
                    <!-- Leaderboard list Item -->
                    <LeaderboardItem :meme="meme" />
                </li>
            </ul>
            <!-- ul -->
        </div>
        <!-- /static-leaderboard -->
    </div>
    <!-- /leaderboard col -->
</template>

<style lang="scss" scoped>
.card {
    max-height: 100vh;
}

.heading {
    height: 8vh;
}
.static-ul {
    height: 92vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

.offcanvas-button {
    background-color: #88b8ff;
}

.offcanvas-button:hover {
    color: white;
}
</style>