<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth} from './modules/useAuth'

const { isLoggedIn, userRole } = useAuth()
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/" v-if="isLoggedIn">Home</RouterLink>
        <RouterLink to="/login" v-if="!isLoggedIn">Sign in</RouterLink>
        <RouterLink to="/logout" v-if="isLoggedIn">Sign out</RouterLink>
        <RouterLink to="/register" v-if="!isLoggedIn">Register</RouterLink>
        <RouterLink to="/admin" v-if="userRole === 'admin'">Admin</RouterLink>
        
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  place-items: center;
  justify-content: center;
  padding-right: calc(var(--section-gap) / 2);
}

header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

nav {
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
