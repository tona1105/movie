<template>
    <div>
        <b-navbar class="header-bg">
            <b-navbar-nav class="mx-5">
                <b-navbar-brand href="/">
                    <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
                    WEB PHIM
                </b-navbar-brand>
                <div>
                    <b-form-input v-model="text" placeholder="Nhập phim muốn tìm" class="mx-5"></b-form-input>
                </div>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item class="header-item mx-3">Phim bộ</b-nav-item>
                <b-nav-item class="header-item mx-3">Phim lẻ</b-nav-item>
                <b-nav-item class="header-item mx-3">Hoạt Hình</b-nav-item>
                <b-nav-item-dropdown text="Thể loại" right class="header-item mx-3">
                    <b-dropdown-item v-for="(category, index) in category" :key="index" href="" :id="category.slug">
                        {{ category.name }}
                    </b-dropdown-item>
                    <!-- <b-dropdown-item href="">Kinh Dị</b-dropdown-item>
                    <b-dropdown-item href="">Cổ Trang</b-dropdown-item> -->
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Quốc gia" class="header-item mx-3">
                    <b-dropdown-item v-for="(country, index) in country" :key="index" href="" @click="getListByCountry(country.slug)">
                        {{ country.name }}
                    </b-dropdown-item>
                    <!-- <b-dropdown-item href="">Nhật Bản</b-dropdown-item>
                    <b-dropdown-item href="">Mỹ</b-dropdown-item> -->
                </b-nav-item-dropdown>
                <b-nav-item class="header-item mx-3">Sắp chiếu</b-nav-item>
            </b-navbar-nav>
        </b-navbar>

    </div>
</template>

<script>
export default {
    data() {
        return {
            category: [
                {
                    name: 'Khoa học viễn tưởng',
                    slug: 'khoa-hoc-vien-tuong'
                },
                {
                    name: 'Trinh thám',
                    slug: 'trinh-tham'
                }
            ],
            country: [
                {
                    name: 'Việt Nam',
                    slug: 'viet-nam'
                },
                {
                    name: 'Mỹ',
                    slug: 'my'
                }
            ],
            text: ''
        }
    },
    methods :{
        getListByCountry(slug) {
            this.$emit('getListByCountry',slug);
        }
    }
}
</script>

<style>
.header-bg {
    background-color: #0f172a;
}

.header-bg .dropdown-menu {
    background-color: #0f172a;
}

.header-bg .navbar-nav .show>.nav-link {
    color: #0258d1;
}

.header-bg .dropdown-item:hover {
    background-color: #8B5CF6;
}

.navbar-expand {
    justify-content: space-between !important;
}

.navbar-brand {
    color: #B7BEC8 !important;
}

.nav-item a {
    color: #B7BEC8;
}

.nav-item:hover .nav-link {
    color: #0258d1;
}
</style>