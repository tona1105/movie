<template>
    <DefaultLayout>
        <div class="container" style="overflow: hidden;">
            <div class="row">
                <h3 class="text-center text-light">Danh sách {{ this.typeSlug }} {{ this.name }}</h3>
                <div>
                    <h3 class="text-light" style="display: inline-block;">Sắp xếp theo:</h3>
                    <div class="btn btn-primary mx-2 mb-2" :class="{ 'btn-info': click === 1 }"
                    style="border: none;" 
                    @click="sortByYearInc">
                        Mới nhất
                    </div>
                    <div class="btn btn-primary mx-2 mb-2" :class="{ 'btn-info': click === 2 }"
                    style="border: none;" 
                    @click="sortByYearDec">
                        Cũ nhất
                    </div>
                    <div class="btn btn-primary mx-2 mb-2" :class="{ 'btn-info': click === 3 }" 
                    style="border: none;"
                    @click="sortByText">Chữ cái
                    </div>
                </div>
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
            listFilterMovie: [],
            click: 0
        }
    },
    watch: {
        slug(newSlug) {
            this.getMovie(newSlug)
            this.click = 0
        },
    },
    async created() {
        await this.getMovie()
    },
    methods: {
        async getMovie() {
            if (this.type === 'category') this.getMovieByCategory()
            else if (this.type === 'country') this.getMovieByCountry()
            else if (this.type === 'new') this.getNewMovie()
            else this.getMovieBySlug()
            console.log(this.listFilterMovie);

        },
        async getNewMovie() {
            const response = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1`)
            this.listFilterMovie = response.data.items
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
        sortByYearInc() {
            this.listFilterMovie.sort((a, b) => new Date(b.year) - new Date(a.year))
            this.click = 1
            console.log('sort1');
        },
        sortByYearDec() {
            this.listFilterMovie.sort((a, b) => new Date(a.year) - new Date(b.year))
            this.click = 2
            console.log('sort2');
            
        },
        sortByText() {
            this.listFilterMovie.sort((a, b) => a.name.localeCompare(b.name))
            this.click = 3
            console.log('sort3');

        }

    }
}
</script>

<style>
.clicked {
    background-color: blueviolet;
}
</style>