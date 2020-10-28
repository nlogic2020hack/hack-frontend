<template>
  <b-container class="bv-example-row mb-5">
    <b-row class="text-center mt-4" align-h="start">
      <b-col cols="10" align-self="start">
        <b-form-input
            v-model="query"
            type="text"
            placeholder="Введи запрос"
            size="lg"
        ></b-form-input>
      </b-col>

      <b-col>
        <b-button
            variant="primary"
            align-self="end"
            size="lg"
        >
          Поиск
        </b-button>
      </b-col>
    </b-row>

    <b-row class="text-center mt-3">
      <b-col cols="8">

        <b-alert :show="isLoading">
          Файл {{ this.currentFileName }} в обработке, подожди немного
        </b-alert>

        <b-alert variant="success" :show="isDone">
          Файл {{ this.currentFileName }} обработался, поищи его в базе)
        </b-alert>

        <b-alert variant="danger" :show="isError" dismissible>
          Файл {{ this.currentFileName }} не смог обработаться(
        </b-alert>

        <b-form-file
            v-if="!isLoading"
            v-model="file"
            placeholder="Добавь файл в базу"
            accept="image/jpeg, image/png, application/pdf"
        >
        </b-form-file>

      </b-col>

      <b-col cols="2">
        <b-button
            :disabled="this.file == null"
            variant="primary"
            v-on:click="uploadFile"
        >
          Загрузить файл
        </b-button>
      </b-col>

    </b-row>

    <b-row class="text-center mt-4" align-h="start" align-v="baseline">
      <b-col cols="10" align-self="start">
        <Table
            :key="reload"
        />
      </b-col>

      <b-col>
        Здесь будут фильтры
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import Table from '../components/Table'

export default {
  name: 'Home',
  data () {
    return {
      file: null,
      currentFileName: null,
      query: null,
      isLoading: false,
      isError: false,
      isDone: false,
      reload: false,
    }
  },
  methods: {
    async uploadFile() {
      this.isError = false
      this.isDone = false

      const data = new FormData();
      data.append('file', this.file, this.file.name);
      this.currentFileName = this.file.name

      this.file = null
      this.isLoading = true;

      const resp = await fetch(process.env.VUE_APP_BASE_URL  + '/process', {
        method: 'post',
        body: data
      })
      const result = await resp.json();
      if (!result.result)
        this.isError = true

      this.isDone = true;
      this.isLoading = false;
      this.reload = !this.reload
    }
  },
  components: {
    Table
  }
}
</script>

<style scoped>

</style>
