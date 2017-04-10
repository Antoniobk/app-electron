<template>
<div class="header-section">
  <div class="vertical-title">
    <h2 v-if="show" transition="slideLeft">{{ title }}</h2>
  </div>
  <template v-if="btn">
    <div class="btn-icon-more" :class="{'btn-icon-mini': isResponsive }" v-if="show"  transition="slideRight">
      <ui-ibutton type="flat" color="anda-secundario" icon="add" @click="onClickEvent()"></ui-ibutton>
    </div>
  </template>
</div>
</template>
<script>
  import mixinsGlobals from '../mixins/globals'
  export default {
    mixins: [mixinsGlobals],
    props: ['title', 'show', 'btn', 'path', 'isdevice'],
    methods: {
      onClickEvent () {
        if (this.isdevice) this.$dispatch('eventPhone')
        else this.backToUrl(this.path)
      }
    }
  }
</script>
