<template>
  <b-modal
      :id="modalId"
      size="xl"
      centered
      hide-footer
      :title="fileName"
  >

    <b-pagination
        v-model="currentPage"
        :total-rows="pagesNumber"
        :per-page="1"
        aria-controls="pages-table"
    ></b-pagination>

    <b-table
        id="pages-table"
        :items="currentPages"
        :fields="fields"
        :per-page="1"
        :current-page="currentPage"
        :fixed="true"
    >
      <template v-slot:cell(entities)="row">
        <ul v-for="(entityData, entityName) in row.item.entities">
          <li v-for="eData in entityData">
            <b>{{ eData.display_name }}</b> - {{ eData.value }}
          </li>
        </ul>
      </template>

      <template v-slot:cell(image)="row">
          <Page
              v-bind:url="row.item.url"
              v-bind:entities="JSON.parse(JSON.stringify(row.item.entities))"
          />
      </template>

    </b-table>
  </b-modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Page from "@/components/Page";

export default {
  name: "Modal",
  data() {
    return {
      currentPage: 1,
      fields: [
        {key: 'image', thStyle: {display: 'none'}},
        {key: 'entities', thStyle: {display: 'none'}}
      ]
    }

  },
  methods: {
    ...mapActions(['fetchDocument']),
  },
  computed: {
    pagesNumber() {
      return this.currentPages.length
    },
    ...mapGetters(['currentDocument', 'currentPages']),
  },
  async mounted() {
    await this.fetchDocument(this.docId);
  },
  components: {
    Page
  },
  props: {
    docId: {
      required: true,
    },
    modalId: {
      required: true,
    },
    fileName: {
      required: true,
    },
  }
}
</script>

<style scoped>
</style>