<script lang="ts" setup>
import { type User } from "@/entities";
import { getFormattedAlias } from "@/shared/formatters";

const DEFAULT_AVATAR_SRC = "https://images.placeholders.dev/50";

defineProps<{ user: User }>();
</script>

<template>
  <div class="user-card">
    <div class="user-card__avatar">
      <img
        :src="user.avatar ?? DEFAULT_AVATAR_SRC"
        alt="Аватарка пользователя"
      />
    </div>

    <div class="user-card__title">
      {{ user.name ?? (user.alias && getFormattedAlias(user.alias)) }}
    </div>
  </div>
</template>

<style lang="css" scoped>
.user-card {
  display: grid;
  grid-template-areas: "avatar title";
  grid-template-rows: 40px;
  grid-template-columns: 40px;
  grid-column-gap: 20px;
  padding: 10px;

  .user-card__avatar {
    grid-area: avatar;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .user-card__title {
    grid-area: title;
    display: flex;
    align-items: center;
    overflow: hidden;

    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
