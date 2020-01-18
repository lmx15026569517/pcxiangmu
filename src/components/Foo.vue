<template>
  <div class="com">
    <h2>Foo 组件</h2>
    <p>{{$store.state.count}}</p>
    <!-- commit()调用方法 -->
    <button @click="$store.commit('add')">+</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
