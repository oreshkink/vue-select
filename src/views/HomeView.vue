<script lang="ts" setup>
import { getVariants } from "@/api";
import CompanyCard from "@/components/CompanyCard/CompanyCard.vue";
import LiveSearch from "@/components/Livesearch/LiveSearch.vue";
import UserCard from "@/components/UserCard/UserCard.vue";
import { isUser } from "@/entities";
</script>

<template>
  <LiveSearch
    :on-search="getVariants"
    @on-select="
      (variant) => {
        console.log('Выбран вариант', variant);
      }
    "
    @on-unselect="
      () => {
        console.log('Удален вариант');
      }
    "
  >
    <template #dropdown-variant="{ variant }">
      <UserCard v-if="isUser(variant)" :user="variant" />

      <CompanyCard v-else :company="variant" />
    </template>
  </LiveSearch>
</template>

<style>
input {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
