<template>
  <div>
  <b-table
      id="table-database"
      :current-page="currentPage"
      :items="getFilesForTable()"
      :per-page="perPage"
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
  <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="getFilesForTable().length"
      :per-page="perPage"
      aria-controls="table-database"
  >
  </b-pagination>
  </div>

</template>


<script>
import Document from "@/components/Document";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
  data () {
    return {
      fields: ['id', {key: 'date',label: 'Date Added'}, {key: 'name',label: 'File Name'}, 'show_details'],
      docId: null,
      searchResults: null,
      currentPage: 1,
      perPage: 10,

    }
  },
  methods: {
    ...mapActions(['fetchFiles']),
    modalId(docId, fileId) {
      return 'document-modal-' + docId + '-' + fileId;
    },
    setCurrentDocId(docId) {
      this.docId = docId
    },
    getFilesForTable() {
      if (this.searchResults) {
        return this.searchResults
      }
      return this.allFiles
    }
  },
  computed: mapGetters(['allFiles']),
  async mounted() {
    await this.fetchFiles();
  },
  components: {
    Document
  },
  props: {
    query: {
      required: false,
    }
  },
  watch: {
    query: function() {
      if (this.query != null && this.query !== '') {
        console.log('!')
        fetch(
            process.env.VUE_APP_BASE_URL + '/files/search/' + this.query
        )
            .then(response => response.json())
            .then(json => json.result)
            .then((json => {
              this.searchResults = json
            }))
      }
      else {
        console.log('?')

        this.searchResults = this.allFiles
      }
    }
  }
}
</script>

<style scoped>

</style>