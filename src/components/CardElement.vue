<script>

export default {
    name: 'CardElement',
    props: {
        meme: Object
    },
    data() {
        return {
        }
    }
}
</script>

<template>
    <!-- card meme -->
    <div class="card rounded-3 text-center bg-light border-secondary" style="width: 18rem;">
        <!-- meme preview -->
        <img :src="meme.preview[2]" :alt="meme.title" />
        
    </div>
    <!-- /card meme -->
</template>

<style lang="scss"></style>