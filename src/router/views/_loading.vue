<script>
import Layout from '../layouts/main.vue'

export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <Transition appear>
      <h1> Loading</h1>
    </Transition>
  </Layout>
</template>

