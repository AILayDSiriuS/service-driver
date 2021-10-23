<template>
  <div id="playlists-page">
    <Header/>
    <div class="container">
      <div class="row section">
        <a class="col" href="/">&lt; Главная</a>
      </div>
      <div class="row">
        <div class="section-title col-10">      
          <h2>Плейлисты</h2>
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
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
        <Playlist title="Первый плейлист" date="3" count="5" link="#" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Playlists',
  components: {
    Header: () => import('@/components/Header.vue'),
    Playlist: () => import('@/components/Blocks/Playlist.vue'),
    Footer: () => import('@/components/Footer.vue')
  }
}
</script>

<style>
  .blue {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    height: 54px;
    border-radius: 7px;
  }
</style>
