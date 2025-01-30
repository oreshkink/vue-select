<script lang="ts" setup>
import { type Company } from "@/entities";

const DEFAULT_AVATAR_SRC = "https://images.placeholders.dev/50";

defineProps<{ company: Company }>();
</script>

<template>
  <div class="company-card">
    <div class="company-card__avatar">
      <img
        :src="company.avatar ?? DEFAULT_AVATAR_SRC"
        alt="Аватарка пользователя"
      />
    </div>

    <div class="company-card__title">
      <span>
        {{ company.name ?? (company.alias && company.alias) }}
      </span>
    </div>

    <div class="company-card__note">Компания</div>
  </div>
</template>

<style lang="css" scoped>
.company-card {
  display: grid;
  grid-template-areas:
    "avatar title"
    "note note";
  grid-template-rows: 40px 20px;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 20px;
  padding: 10px;

  .company-card__avatar {
    grid-area: avatar;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .company-card__title {
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

  .note {
    grid-area: note;
  }
}
</style>
