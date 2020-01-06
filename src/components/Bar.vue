<template>
  <div class="com">
    <h2>Bar 组件</h2>
    <p>{{$store.state.count}}</p>
    <button @click="$store.commit('lmx')">-</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>