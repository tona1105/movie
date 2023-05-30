<template>
    <defaultLayout>
        <div class="container">
            <div class="row">
                <div style="height: 600px;" class="text-center">
                    <iframe :src=srcEp width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="col-9">
                    <h3>TẬP PHIM</h3>
                    <router-link class="btn btn-light mx-1 my-1" :class="{'active': item.name === ep}" style="width: 50px;" 
                    v-for="(item, index) in listEpisodes" :key="index"
                    :to="{name: 'movie-watch', params: {slug: slug, ep:item.name}}">
                        {{ item.name }}
                    </router-link>

                </div>
            </div>

        </div>
    </defaultLayout>
</template>

<script>
import axios from 'axios'
import defaultLayout from '@/components/Default-layout.vue'
export default {
    props: {
        slug: {
            type: String,
            required: true
        },
        ep: {
            type: String,
            required: true
        },
    },
    components: {
        defaultLayout,
    },
    data() {
        return {
            listEpisodes: [],
            movie: [],
            srcEp: '',
        }
    },
    watch: {
        ep(newEp) {
            this.playMovieByEp(newEp)
        }
    },
    async created() {
        await this.getMovieBySlug()
        await this.playMovieByEp()
    },
    methods: {
        async getMovieBySlug() {
            try {
                const response = await axios.get(`https://ophim1.com/phim/${this.slug}`)
                this.movie = response.data.movie
                this.listEpisodes = response.data.episodes[0].server_data
                console.log(this.listEpisodes);
            }
            catch (e) {
                console.log(e);
            }
        },
        async playMovieByEp() {
            try {
                if(isNaN(this.ep)) {
                    this.srcEp = this.listEpisodes[0].link_embed
                }
                else {
                    this.srcEp = this.listEpisodes[this.ep-1].link_embed
                }
            }
            catch (e) {
                console.log(e);
            }
        },
    }
}
</script>

<style>
.active {
    background-color: blue !important;
    color: white !important;
}
</style>