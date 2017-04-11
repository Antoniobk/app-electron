<template>
  <div class="modal-mask modal-profile" v-if="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <div class="content_profile">
            <div class="contact_picture">
              <img :src="!isDataNull(person.picture_medium) ? person.picture_medium : !isDataNull(person.picture) ? person.picture : '../assets/img/placeholder@3x.png'">
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
                <b>Birthday:</b><br>{{ person.born | year }}
              </p>
            </template>
            <button type="button" class="btn-save btn-cancel-modal" @click="show=!show"><i class="material-icons">clear</i></button>
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
    props: ['show', 'person', 'type']
  }
</script>

