<template>
    <DefaultLayout>
        <div class="container" style="overflow: hidden;">
            <div class="row">
                <h3 class="text-center text-light">Danh sách phim</h3>
                <h3 class="text-light">Sắp xếp theo:</h3>
                <div v-for="(item, index) in listSearchMovie" :key="index" class="col-2 my-1">
                    <ItemMovie :movie="item" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import axios from 'axios'
import ItemMovie from '@/components/ItemMovie.vue';
import DefaultLayout from '@/components/Default-layout.vue';
export default {
    props: {
        keyword: {
            type: String,
            required: true
        }
    },
    components: {
        ItemMovie,
        DefaultLayout
    },
    data() {
        return {
            listSearchMovie: []
        }
    },
    watch: {
        keyword(newKey) {
            this.getMovieByKeyWord(newKey)
        }
    },
    async created() {
        await this.getMovieByKeyWord()
    },
    methods: {
        async getMovieByKeyWord() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/tim-kiem.json?keyword=${this.keyword}`)
            this.listSearchMovie = response.data.pageProps.data.items
        }
    }
}
</script>