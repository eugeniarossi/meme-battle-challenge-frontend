<script>

export default {
    name: 'CardElement',
    props: { // dichiaro le props
        meme: Object
    }
}
</script>

<template>
    <!-- card meme -->
    <div class="card rounded-3 bg-light border-secondary p-3">
        <!-- meme preview big -->
        <img :src="meme.preview[2]" :alt="meme.title" class="d-none d-lg-block" v-if="meme.preview[2]" />
        <!-- meme preview small se big non esiste -->
        <img :src="meme.preview[1]" :alt="meme.title" v-else />
        <!-- meme preview small -->
        <img :src="meme.preview[1]" :alt="meme.title" class="d-lg-none" />
    </div>
    <!-- /card meme -->
</template>

<style lang="scss" scoped>
.card:hover {
    cursor: pointer;
    transform: scale(1.05);
}

img {
    max-height: 60vh;
}
</style>