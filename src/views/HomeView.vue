<script lang="ts" setup>
import { getVariants } from "@/api";
import CompanyCard from "@/components/CompanyCard/CompanyCard.vue";
import LiveSearch from "@/components/Livesearch/LiveSearch.vue";
import UserCard from "@/components/UserCard/UserCard.vue";
import composables from "@/composables";
import { isUser } from "@/entities";

const { variants, query } = composables.useQuery(getVariants);
</script>

<template>
  <LiveSearch :variants="variants" @on-input="query">
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
