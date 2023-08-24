<template>
  <main>
    <a class="button" href="/world-portal">F1 Gallery - AR Portal Version</a>
    <a class="button" href="/desktop-model"
      >F1 Gallery - Static Viewer Version</a
    >
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
.button {
  background-color: #ffffff;
  border: 0;
  width: auto;
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: #111827;
  font-family: 'Inter var', ui-sans-serif, system-ui, -apple-system, system-ui,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  text-align: center;
  text-decoration: none #d1d5db solid;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button:hover {
  background-color: rgb(249, 250, 251);
}

.button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.button:focus-visible {
  box-shadow: none;
}
</style>
