<template>
  <b-container class="bv-example-row mb-5">
    <b-row class="text-center mt-4" align-h="start">
      <b-col align-self="start">
        <b-form-input
            v-model="query"
            type="text"
            placeholder="Поиск по тексту документов"
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row class="text-center mt-3">
      <b-col>

        <b-alert :show="isLoading">
          Файл {{ this.currentFileName }} в обработке, подожди немного
        </b-alert>

        <b-alert variant="success" :show="isDone">
          Файл {{ this.currentFileName }} обработан и доступен в базе
        </b-alert>

        <b-alert variant="danger" :show="isError" dismissible>
          Упс, на файле {{ this.currentFileName }} что-то сломалось
        </b-alert>

        <b-form-file
            v-if="!isLoading"
            v-model="file"
            placeholder="Загрузить файл в базу"
            accept="image/jpeg, image/png, application/pdf, image/jpg, image/tiff"
        >
        </b-form-file>

      </b-col>

    </b-row>

    <b-row class="text-center mt-4" align-h="start" align-v="baseline">
      <b-col align-self="start">
        <Table
            :key="reload"
            :query="query"
        />
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
      if (!result.result || result.result === 'failed')
        this.isError = true
      else
        this.isDone = true;

      this.isLoading = false;
      this.reload = !this.reload
    }
  },
  components: {
    Table
  },
  watch: {
    file: async function() {
      if (this.file)
        await this.uploadFile()
    }
  }
}
</script>
