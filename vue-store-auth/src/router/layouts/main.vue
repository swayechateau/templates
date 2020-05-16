<script>
import NavBar from '@/components/nav-bar.vue'

export default {
  components: { NavBar },
}
</script>

<template>
  <div>
    <NavBar />
    <slot />
  </div>
</template>
