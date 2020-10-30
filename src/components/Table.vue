<template>
  <b-table
      :items="allFiles"
      :fields="fields"
      :borderless="true"
      head-variant="light"
      :fixed="true"
  >

    <template v-slot:cell(show_details)="row">
      <b-button variant="link" @click="row.toggleDetails(row)" class="mr-2">
        {{ row.detailsShowing ? '▲' : '▼'}}
      </b-button>

    </template>

    <template v-slot:row-details="row">
      <b-card bg-variant="light">
        <b-list-group>

          <b-list-group-item
              button @click="setCurrentDocId(doc.id)"
              v-b-modal="modalId(doc.id)"
              v-for="doc in row.item.documents" :key="doc.id">
            {{ doc.type }}
            <Document
                v-if="docId === doc.id"
                v-bind:docId="doc.id"
                v-bind:modalId="modalId(doc.id, row.item.name.id)"
                v-bind:fileName="row.item.name"
            />
          </b-list-group-item>

        </b-list-group>
      </b-card>
    </template>

  </b-table>

</template>

<script>
import Document from "@/components/Document";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
  data () {
    return {
      fields: ['id', {key: 'name',label: 'File Name'}, 'show_details'],
      docId: null
    }
  },
  methods: {
    ...mapActions(['fetchFiles']),
    modalId(docId, fileId) {
      return 'document-modal-' + docId + '-' + fileId;
    },
    setCurrentDocId (docId) {
      this.docId = docId
    }
  },
  computed: mapGetters(['allFiles']),
  async mounted() {
    await this.fetchFiles();
  },
  components: {
    Document
  }
}
</script>

<style scoped>

</style>