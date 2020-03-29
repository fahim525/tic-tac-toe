<template>
  <div class="container">
    <div class="flex-container flex-container--100vh">
      <div class="flex--v-centered">
        <Title>Tic-Tac-Game Application</Title>
        <div class="form players is-full-width">
          <div class="player">
            <label for="player-x" class="form__label">
              <strong>Player X</strong>
            </label>
            <input
              v-model="playerX"
              class="form__input"
              id="player-x"
              type="text"
              placeholder="Insert player name"
            />
          </div>

      
          <div class="player">
            <label for="player-o" class="form__label">
              <strong>Player O</strong>
            </label>
             <input
              v-model="playerO"
              class="form__input"
              id="player-o"
              type="text"
              placeholder="Insert player name"
            /> 
          </div>
          <p v-if="url">
              Invitation Link
              <a href="javaScript:void" @click="onOpenNewWindow" >{{ url }}</a>
            </p>
          <div class="next text--center">
            <button
              :disabled="!hasPlayers"
              class="btn btn--secondary"
              @click="start({'O':playerO, 'X':playerX})"
            >{{ buttonValue }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Title from "../atoms/Title";
import io from "socket.io-client";
export default {
  name: "Players",
  components: {
    Title
  },

  data() {
    return {
      playerO: "",
      playerX: "",
      socket: {},
      url: null
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.url = window.location.origin+'/0123456789';
  },
  computed: {
    hasPlayers() {
      return this.playerO && this.playerX;
    },

    buttonValue() {
      return this.hasPlayers ? "Play" : "Fill out the form";
    }
  },

  methods: {
    ...mapMutations(["setPlayers"]),

    start(players) {
     // this.setPlayers(players);
      this.socket.emit("players", players);
      this.$forceUpdate();
    },
    onOpenNewWindow(){
      window.open(this.url, 'Another player', 'height=900, width=1200, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, directories=no, status=no');
    }
  },

  mounted() {
    document.title = "Players";
  }
};
</script>
