<script>

export default {
    name: 'CardElement',
    props: {
        meme: Object
    },
    data() {
        return {
            loading: true,
        }
    },
    methods: {
        handleImageLoad() {
            this.loading = false; /////////////////// ELIMINARE O IMPLEMENTARE
        },
    }
}
</script>

<template>
    <!-- card meme -->
    <div class="card rounded-3 text-center bg-light border-secondary" style="width: 18rem;">
        <!-- meme preview -->
        <img :src="meme.preview[2]" :alt="meme.title" />
        <div class="card-body" v-if="!meme.score === 0">
            <!-- punteggio -->
            <h4 class="card-title">Punteggio: {{ meme.score }}</h4>
        </div>
    </div>
    <!-- /card meme -->
</template>

<style lang="scss"></style>