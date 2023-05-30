<template>
    <DefaultLayout>
        <div class="container">
            <div class="row">
                <div class="col-9">
                    <div>
                        <b-card no-body class="overflow-hidden">
                            <b-row no-gutters style="background-color: #111;">
                                <b-col md="6" class="h-75">
                                    <b-card-img :src="movie.thumb_url" class="rounded-0 h-100"></b-card-img>
                                    <router-link :to="{name: 'movie-watch', params: {slug: slug, ep: 1}}" class="button">Xem ngay</router-link>
                                </b-col>
                                <b-col md="6" class="text-light">
                                    <h3 class="my-0">{{ movie.name }}</h3>
                                    <p>{{ movie.origin_name }}</p>
                                    <div>
                                        <p>Trạng thái: {{ movie.episode_current }} {{ movie.lang }}</p>
                                        <p>Thể loại:
                                            <span v-for="(item, index) in category" :key="index">
                                                {{ item.name }}
                                            </span>
                                        </p>
                                    </div>
                                    <p>Đạo diễn:
                                        <span class="ml-0" v-for="(item, index) in director" :key="index" >
                                            <span v-if="index !== director.length - 1"> {{ item }},</span>
                                            <span v-else> {{ item }}</span>
                                        </span>
                                    </p>
                                    <p>Diễn viên:
                                        <span v-for="(item, index) in actor" :key="index">
                                            <span v-if="index !== actor.length - 1"> {{ item }},</span>
                                            <span v-else> {{ item }}</span>
                                        </span>
                                        
                                    </p>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>
                    <div class="text-light">
                        <h4 class="my-0 text-danger">Nội dung chi tiết</h4>
                        <h4>{{ movie.name }}</h4>
                        <span>{{ movie.content }}</span>
                    </div>
                </div>
                <div class="col-3">
                    <PreMovie/>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import axios from 'axios';
import PreMovie from '@/components/PreMovie.vue';
import DefaultLayout from '@/components/Default-layout.vue'
export default {
    props: {
        slug: {
            type: String,   
            required: true
        },
    },
    components: {
        DefaultLayout,
        PreMovie
    },
    data() {
        return {
            movie: {},
            category: [],
            director: [],
            actor: [],
        }
    },
    
    async created() {
        await this.getMovieBySlug()
    },
    watch: {
        slug(newSlug) {
      this.getMovieBySlug(newSlug);
      document.documentElement.scrollTop = 0;
    }
  },
    methods: {
        async getMovieBySlug() {
            try {
                const response = await axios.get(`https://ophim1.com/phim/${this.slug}`)
                this.movie = response.data.movie
                this.category = this.movie.category
                this.director = this.movie.director
                this.actor = this.movie.actor
                console.log(this.listEpisodes);
            }
            catch (e) {
                console.log(e);
            }
        },
    }
}
</script>
<style>
.button {
    display: block;
    text-decoration: none;
    text-align: center;
    background-color: blueviolet;
    padding: 4px;
    border: 1px solid #000;
    color: #fff;
    font-weight: 500;
}
.button:hover {
    cursor: pointer;
}
</style>