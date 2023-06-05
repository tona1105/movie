import FilterMovie from './pages/FilterMovie.vue'
import index from './pages/index.vue'
import movieDetail from './pages/movieDetail'
import movieWatch from './pages/movieWatch'
import searchMovie from './pages/searchMovie'
export default [
    {
        path: '/',
        component: index
    },
    {
        path: '/phim/:slug',
        name: 'movie-detail',
        component: movieDetail,
        props: true
    },
    {
        path: '/phim/:slug/tap-:ep',
        name: 'movie-watch',
        component: movieWatch,
        props: true
    },
    {
        path: '/danh-sach/:slug',
        name: 'movie-list',
        component: FilterMovie,
        props: true
    },
    {
        path: '/tim-kiem/:keyword',
        name: 'search-movie',
        component: searchMovie,
        props: true
    },
]