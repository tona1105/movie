<template>
    <div>
        <DefaultLayout @getListByCountry="getListByCountry">
            <div class="container p-2" id="home-page">
                <div class="row">
                    <!-- Slider recommend movie -->
                    <h3 class="text-light">PHIM ĐỀ XUẤT</h3>
                    <flickity v-if="Object.keys(random12inListMovie).length > 0" class="carousel" ref="flickity"
                        :options="flickityOptions">
                        <div class="carousel-cell mx-md-2 col-md-4 col-lg-pc" v-for="(item, index) in random12inListMovie"
                            :key="index" style="height: 300px;">
                            <ItemMovie :movie="item" />
                        </div>
                    </flickity>
                    <!-- List movie -->
                    <div class="col-sm col-md-9">
                        <div class="row">
                            <div>
                                <router-link :to="{ name: 'movie-list', params: { slug: 'phim-bo', name: 'phim bộ' } }"
                                    class="col-3" style="text-decoration: none;">
                                    <h3 class="text-light mt-2">PHIM BỘ</h3>
                                </router-link>
                            </div>
                            <div v-for="(item, index) in listSeriesMovie" :key="index"
                                class="col-6 col-md-4 col-lg-3 text-light mb-4 ">
                                <ItemMovie :movie="item" v-lazyload />
                            </div>
                        </div>
                        <div class="row">
                            <div class="">
                                <router-link :to="{ name: 'movie-list', params: { slug: 'phim-le', name: 'phim lẻ' } }"
                                    class="col-3" style="text-decoration: none;">
                                    <h3 class="text-light mt-2">PHIM LẺ</h3>
                                </router-link>
                            </div>
                            <div v-for="(item, index) in listSingleMovie" :key="index"
                                class="col-6 col-md-4 col-lg-3 text-light mb-4 ">
                                <ItemMovie :movie="item" v-lazyload/>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <router-link
                                    :to="{ name: 'movie-list', params: { slug: 'hoat-hinh', name: 'phim hoạt hình' } }"
                                    class="col-3" style="text-decoration: none;">
                                    <h3 class="text-light mt-2">PHIM HOẠT HÌNH</h3>
                                </router-link>
                            </div>
                            <div v-for="(item, index) in listCartoon" :key="index"
                                class="col-6 col-md-4 col-lg-3 text-light  ">
                                <ItemMovie :movie="item" v-lazyload />
                            </div>

                        </div>
                        <router-view></router-view>
                    </div>
                    <!-- Top movie -->
                    <div class="col-3 ml-3 premovie">
                        <div class="row">
                            <PreMovie />
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
import VueLazyload from 'vue-lazyload';
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
        Vue.use(VueLazyload, {
            listenEvents: ['scroll'],
        });
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
    }
}

</script>
  
<style>
html,
body {
    /* overflow-y: auto; */

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


@media screen and (min-width : 320px) and (max-width: 767px) {
    .carousel-cell {
        margin: 0 0.25rem;
        width: 50%;
        left: 4px !important;
    }

    .premovie {
        display: none;
    }
}

@media screen and (min-width : 992px) {
    .col-lg-pc {
        width: 20%;
    }
}
</style>
  