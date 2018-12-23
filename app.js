const playerState = {
  health: 0,
  maxAttack: 10,
  minAttack: 3,
  heal: 10
}

const monsterState = {
  health: 0,
  maxAttack: 15,
  minAttack: 1,
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
  },
  methods: {
    startGame() {
      this.gameIsRunning = true
      this.player.health = 100
      this.monster.health = 100
    },
    resetState() {
      this.player = {...playerState}
      this.monster = {...monsterState}
      this.battleLogs = []
    },
    isGameEnd() {
      // player win
      if(this.monster.health <= 0) {
        this.gameIsRunning = false
        alert('You Won!')
        this.resetState()
        return true
      }
      // player loose
      else if(this.player.health <= 0) {
        alert('You Loose!')

        // ask to run a new game
        if(confirm('Start new game?')) {
          this.resetState()
          this.startGame()
          this.gameIsRunning = true
          return true
        }

        this.gameIsRunning = false
        return true
      }

      return false
    },
    giveUp() {
      alert(`End Game ?`);
      this.playerGiveUp = true
      this.gameIsRunning = false
      this.resetState()
    },
    logBattle(monsterLog, playerLog) {
      const log = {...battleLog}
      log.monster = monsterLog
      log.player = playerLog

      this.battleLogs.push(log)
    },
    randomInRange(maxDamage, minDamage) {
      return Math.max((Math.floor(Math.random() * maxDamage) + 1), minDamage)
    },
    playerAttack() {
      if(this.isGameEnd()) return
      // player attack reduce monster health
      const playerDamage = this.randomInRange(this.player.maxAttack, this.player.minAttack)
      this.monster.health -= playerDamage
      
      if(this.isGameEnd()) return
      // monster attack reduce player health
      const monsterDamage = this.randomInRange(this.monster.maxAttack, this.monster.minAttack)
      this.player.health -= monsterDamage

      this.logBattle(`MONSTER HIST PLAYER FOR ${monsterDamage}`, 
        `PLAYER HIST MONSTER FOR ${playerDamage}`)

      if(this.isGameEnd()) return
    },
    playerSpecialAttack() {
      if(this.isGameEnd()) return
      // player attack reduce player health
      const playerDamage = this.randomInRange(this.player.maxAttack + 5, this.player.minAttack + 5)
      this.monster.health -= playerDamage

      if(this.isGameEnd()) return
      // monster attack reduce player health
      this.player.health -= this.randomInRange(this.monster.maxAttack + 5, this.monster.minAttack + 5)

      this.logBattle(`MONSTER HIST PLAYER FOR ${this.monster.specialAttack}`, 
        `PLAYER HIST MONSTER FOR ${playerDamage}`)

      if(this.isGameEnd()) return
    },
    playerHeal() {
      if(this.isGameEnd()) return      

      // don't heal if the health is full
      if(this.player.health >= 100) return 
      
      this.player.health += this.randomInRange(this.player.heal, 1)
      this.logBattle('', `PLAYER HEALS FOR ${this.player.heal}`)
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