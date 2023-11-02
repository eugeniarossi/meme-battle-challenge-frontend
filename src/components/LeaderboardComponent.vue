<script>
export default {
    name: 'LeaderboardComponent',
    components: {
    },
    props: {
        scoreOrderedMemes: Array,
    },
    methods: {
        parsePreview(meme) {
            const parsePreview = JSON.parse(meme.preview);
            return parsePreview;
        }
    }
}
</script>

<template>
    <div class="card" style="width: 18rem;">
        <h4>Leaderboard</h4>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex" v-for="meme in scoreOrderedMemes">
                <img :src="parsePreview(meme)[0]" :alt="meme.title">
                <div class="infos">
                    <p>Id {{ meme.id }}</p>
                    <p>Title {{ meme.title }}</p>
                    <p>Score {{ meme.score }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss"></style>