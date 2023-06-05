<template>
    <DefaultLayout>
        <div class="container" style="overflow: hidden;">
            <div class="row">
                <h3 class="text-center text-light">Danh sách {{ this.typeSlug }} {{ this.name }}</h3>
                <h3 class="text-light">Sắp xếp theo:</h3>
                <div v-for="(item, index) in listFilterMovie" :key="index" class="col-2 my-1">
                    <ItemMovie :movie="item" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/Default-layout.vue';
import axios from 'axios'
import ItemMovie from '@/components/ItemMovie.vue';
export default {
    props: {
        slug: {
            type: String,
            required: true
        },
        typeSlug: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
    },
    components: {
        ItemMovie,
        DefaultLayout
    },
    data() {
        return {
            listFilterMovie: []
        }
    },
    watch: {
        slug(newSlug) {
            this.getMovie(newSlug)
        },
    },
    async created() {
        await this.getMovie()
    },
    methods: {
        async getMovie() {
            if (this.type === 'category') this.getMovieByCategory() 
            else if (this.type === 'country') this.getMovieByCountry()
            else this.getMovieBySlug()
            console.log(this.listFilterMovie);

        },
        async getMovieBySlug() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/${this.slug}.json?slug=${this.slug}`)
            this.listFilterMovie = response.data.pageProps.data.items
        },
        async getMovieByCategory() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/the-loai/${this.slug}.json?slug=${this.slug}`)
            this.listFilterMovie = response.data.pageProps.data.items
        },
        async getMovieByCountry() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/quoc-gia/${this.slug}.json?slug=${this.slug}`)
            this.listFilterMovie = response.data.pageProps.data.items
        },
       
    }
}
</script>