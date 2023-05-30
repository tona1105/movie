<template>
    <div>
        <DefaultLayout @getListByCountry="getListByCountry" >
            <div class="container p-2" id="home-page">
                <div class="row">
                    <!-- Slider recommend movie -->
                    <h3 class="text-light">PHIM ĐỀ XUẤT</h3>
                    <flickity v-if="Object.keys(random12inListMovie).length > 0" class="carousel" ref="flickity"
                        :options="flickityOptions">
                        <div class="carousel-cell mx-2" v-for="(item, index) in random12inListMovie" :key="index"
                            style="height: 300px; width: 20%">
                            <!-- <img :src="'https://img.ophim1.com/uploads/movies/' + item.thumb_url"
                                class="position-relative w-100 h-100">
                            <div class="fixed-bottom text-center" style="background-color: rgba(0,0,0,.7); color: white">
                                <div class="text-truncate mx-auto" style="max-width: 80%">{{ item.name }}</div>
                                <div class="text-truncate mx-auto" style="max-width: 80%">{{ item.origin_name }}</div>
                            </div> -->
                            <ItemMovie :movie="item"/>
                        </div>
                    </flickity>
                    <!-- List movie -->
                    <div class="col-9">
                        <div class="row">
                            <div class="col-9">
                                <h3 class="text-light mt-2">PHIM BỘ</h3>
                            </div>
                            <div class="col-3" @click="navigateToSeriesMovie">
                                <h3 class="text-light mt-2">Xem thêm</h3>
                            </div>
                            <div v-for="(item, index) in listSeriesMovie" :key="index" class="col-3 text-light mb-4 ">
                                <ItemMovie :movie="item" />
                            </div>
                        </div>
                        <div class="row">
                            <h3 class="text-light mt-2">PHIM LẺ</h3>
                            <div v-for="(item, index) in listSingleMovie" :key="index" class="col-3 text-light mb-4 ">
                                <ItemMovie :movie="item" />
                            </div>
                        </div>
                        <div class="row">
                            <h3 class="text-light mt-2">PHIM HOẠT HÌNH</h3>
                            <div v-for="(item, index) in listSingleMovie" :key="index" class="col-3 text-light  ">
                                <ItemMovie :movie="item" />
                            </div>
                        </div>
                        <router-view></router-view>
                    </div>
                    <!-- Top movie -->
                    <div class="col-3 ml-3">
                        <div class="row">
                            <PreMovie/>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    </div>
</template>
  
<script>
import PreMovie from '@/components/PreMovie.vue'
import Flickity from 'vue-flickity';
import DefaultLayout from '@/components/Default-layout.vue';
import ItemMovie from '@/components/ItemMovie.vue'
import axios from 'axios';
export default {
    components: {
        DefaultLayout,
        ItemMovie,
        Flickity,
        PreMovie
    },
    data() {
        return {
            flickityOptions: {
                initialIndex: 0,
                prevNextButtons: true,
                pageDots: false,
                wrapAround: true,
                freeScroll: false,
                groupCells: 2,
                autoPlay: true
                // any options from Flickity can be used
            },
            listMovie: [],
            listMovieByCountry: [],
            listSeriesMovie: [],
            listSingleMovie: [],
            listCartoon: [],
        }
    },
    async created() {
        await this.getAllMovie()
        await this.getListSeriesMovie()
        await this.getListSingleMovie()
        await this.getListCartoon()
    },
    computed: {
        random12inListMovie() {
            const shuffledList = this.listMovie.sort(() => Math.random() - 0.5);
            return shuffledList.slice(0, 12);
        },
       
    },

    methods: {
        async getAllMovie() {
            try {
                const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/phim-bo.json?slug=phim-bo`)
                const response2 = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/hoat-hinh.json?slug=hoat-hinh`)
                const response3 = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/phim-le.json?slug=phim-le`)
                this.listMovie.push(...response.data.pageProps.data.items);
                this.listMovie.push(...response2.data.pageProps.data.items);
                this.listMovie.push(...response3.data.pageProps.data.items);
            }
            catch (e) {
                console.log(e);
            }
        },
        async getListByCountry(slug) {
            try {
                const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/quoc-gia/${slug}.json`)
                this.listMovieByCountry = response.data.pageProps.data.items
            }
            catch (e) {
                console.log(e);
            }
        },
        async getListSeriesMovie() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/phim-bo.json?slug=phim-bo`)
            this.listSeriesMovie = response.data.pageProps.data.items
        },
        async getListSingleMovie() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/phim-le.json?slug=phim-le`)
            this.listSingleMovie = response.data.pageProps.data.items
        },
        async getListCartoon() {
            const response = await axios.get(`https://ophim6.cc/_next/data/bMep5VbIGtkpBRqoaRU-z/danh-sach/hoat-hinh.json?slug=hoat-hinh`)
            this.listCartoon = response.data.pageProps.data.items
        },
        navigateToSeriesMovie() {
            this.$router.push('/seriesMovie');
        },
    }
}

</script>
  
<style>
html,
body {
    overflow-y: auto;

}

.listmovie {
    background-color: #0f172a;
    width: 100%;
}

.listmovie tr {
    color: #B7BEC8;
}

.thumb-movie {
    width: 3.5rem;
    height: 4rem;
    border-radius: 2px;
}
</style>
  