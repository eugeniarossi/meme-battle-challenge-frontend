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
    <img :src="parsePreview(meme)[0]" :alt="meme.title">
    <div class="infos px-4">
        <p>Id {{ meme.id }}</p>
        <p>Title {{ meme.title }}</p>
        <p>Score {{ meme.score }}</p>
    </div>
</template>

<style lang="scss" scoped></style>