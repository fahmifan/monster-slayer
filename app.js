const playerState = {
  health: 0,
  attack: 2,
  specialAttack: 10,
  heal: 1
}

const monsterState = {
  health: 0,
  attack: 1,
  specialAttack: 4,
}

const battleLog = {
  monster: '',
  player: '',
}

const app = new Vue({
  el: '#app',
  data: {
    gameIsRunning: false,
    playerGiveUp: false,
    player: {...playerState},
    monster: {...monsterState},
    battleLogs: [],
    monsterBarWidth: 100,
    playerBarWidth: 100,
  },
  methods: {
    startGame() {
      this.gameIsRunning = true
      this.player.health = 100
      this.monster.health = 100
    },
    giveUp() {
      alert(`End Game ?`);
      this.playerGiveUp = true
      this.gameIsRunning = false
      this.player = {...playerState}
      this.monster = {...monsterState}
    },
    logBattle(monsterLog, playerLog) {
      const log = {...battleLog}
      log.monster = monsterLog
      log.player = playerLog

      this.battleLogs.push(log)
    },
    playerAttack() {
      if(this.monster.health <= 0) {
        this.giveUp()
        return
      }
      this.monster.health -= this.player.attack
      
      if(this.player.health <= 0) {
        this.giveUp()
        return
      }
      this.player.health -= this.monster.attack

      this.logBattle(`MONSTER HIST PLAYER FOR ${this.monster.attack}`, 
        `PLAYER HIST MONSTER FOR ${this.player.attack}`)
    },
    playerSpecialAttack() {
      if(this.monster.health <= 0) {
        this.giveUp()
        return
      }

      this.monster.health -= this.player.specialAttack

      if(this.player.health <= 0) {
        this.giveUp()
        return
      }
      this.player.health -= this.monster.specialAttack

      this.logBattle(`MONSTER HIST PLAYER FOR ${this.monster.specialAttack}`, 
        `PLAYER HIST MONSTER FOR ${this.player.specialAttack}`)
    },
    playerHeal() {
      this.player.health < 100 && (this.player.health += this.player.heal)
      this.logBattle('', 
      `PLAYER HEALS FOR ${this.player.attack}`)
    }
  },
  computed: {
    monsterHealthBarWidth() {
      return {
        width: this.monster.health + "%",
        backgroundColor: 'green', 
        margin: 0, 
        color: 'white',
      }
    },
    playerHealthBarWidth() {
      return {
        width: this.player.health + "%",
        backgroundColor: 'green', 
        margin: 0, 
        color: 'white',
      }
    }
  },
})