<script>

export default {
    name: 'LeaderboardItem',
    props: { // dichiaro le props
        meme: Object
    },
    methods: {
        // funzione per trasformare in array il contenuto di preview
        parsePreview(meme) {
            const parsePreview = JSON.parse(meme.preview);
            return parsePreview;
        }
    }
}
</script>

<template>
    <!-- item -->
    <div class="item d-flex align-intems-center bg-light">
        <!-- preview -->
        <img :src="parsePreview(meme)[0]" :alt="meme.title">
        <!-- infos -->
        <div class="infos px-4 py-2">
            <!-- title -->
            <h6>Title {{ meme.title }}</h6>
            <!-- score -->
            <strong><i class="fa-solid fa-trophy"></i> {{ meme.score }}</strong>
        </div>
    </div>
    <!-- /item -->
</template>

<style lang="scss" scoped>

.item:hover {
    transform: scale(1.03);
}

img {
    max-width: 30%;
    height: max-content;
}
</style>