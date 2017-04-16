<template>
  <div class="modal-mask modal-profile" v-if="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <div class="content_profile">
            <div class="contact_picture">
              <img v-if="!isDataNull(person.picture)" :src="person.picture">
              <img v-else src="../assets/img/person.png">
            </div>
            <h3>{{ person.first_name + ' ' + person.last_name}}</h3>
            <template v-if="type == 'device'">
              <p>{{ (language == 'es')?'Compartió el dispositivo contigo':'Shared the device with you' }}</p>
            </template>
            <template v-else>
              <p v-if="person.email">
                <b>Email:</b><br>{{ person.email }}
              </p>
              <p v-if="person.phone_number">
                <b>Phone:</b><br>{{ person.phone_number }}
              </p>
              <p v-if="person.born">
                <b>Birthday:</b><br>{{ person.born | ddmmyy }}
              </p>
            </template>
            <br>
            <mu-raised-button @click="onClose" label="Cancel" class="btn-color" fullWidth/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixinsGlobals from '../mixins/globals'

  export default {
    name: 'modal-profile',
    mixins: [mixinsGlobals],
    props: ['show', 'person', 'type'],
    methods: {
      onClose () {
        this.$emit('close', 'close')
      }
    }
  }
</script>

