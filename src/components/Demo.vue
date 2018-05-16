<template>
  <div style="padding-top: 20px">
    <ui-swiper :interval="3000" style="height: 180px">
      <ui-swiper-item  v-for="(banner, index) in banners" :key="index">
        <img :src="banner" style="max-width: 100%;">
      </ui-swiper-item>
    </ui-swiper>

    <ui-swiper :interval="3000" direction="vertical" style="height: 180px">
      <ui-swiper-item  v-for="(banner, index) in banners" :key="index">
        <img :src="banner" style="max-width: 100%;">
      </ui-swiper-item>
    </ui-swiper>
  </div>
</template>

<script>
// or global lazy load
import Swiper from './Swiper/Swiper.vue'
import SwiperItem from './Swiper/SwiperItem.vue'
export default {
  data () {
    return {
      banners: ['http://img.article.pchome.net/00/51/80/56/pic_lib/s960x639/7s960x639.jpg', 'http://5.595818.com/2014/pic/000/358/d7bd0ddc25574b0205ec56e57db5cf3a.jpg', 'http://5.133998.com/2014/pic/000/362/64cf3cf5e69921c7143fa9e9ab2c727c.jpg']
    }
  },
  components: {
    'UiSwiper': Swiper,
    'UiSwiperItem': SwiperItem
  }
}
</script>
