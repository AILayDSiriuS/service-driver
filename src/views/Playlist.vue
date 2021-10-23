<template>
  <div id="playlist-page">
    <Header/>
    <div class="container">
      <div class="row section">
        <div class="col">
          <a href="/">&lt; Главная</a>
          <a href="/">&lt; Плейлисты</a>
        </div>
      </div>
      <div class="row">
        <div class="section-title col-10">      
          <h2>Плейлист A</h2>
        </div>
        <div class="col-2">
          <select class="form-control">
            <option>Популярные</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
      <div class="row">
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
        <Video title="Первое видео" date="3" length="3:15" link="#" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Playlist',
  components: {
    Header: () => import('@/components/Header.vue'),
    Video: () => import('@/components/Blocks/Video.vue'),
    Footer: () => import('@/components/Footer.vue')
  }
}
</script>

<style>

</style>
