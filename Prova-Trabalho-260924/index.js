const { createApp } = Vue;

createApp({
    data() {
        return {
            hero: { life: 100, name: "Moça Bem-Feita", isDefending: false },
            villain: { life: 100, name: "Tripa Seca", isDefending: false },
            winner: null,
        };
    },
    methods: {
        attack(isHero) {
            const damage = Math.floor(Math.random() * 10) + 5; // Gera dano aleatório entre 5 e 15
            if (isHero) {
                if (!this.villain.isDefending) {
                    this.villain.life -= damage;
                    if (this.villain.life < 0) this.villain.life = 0;
                }
                this.addLog("Heroi atacou e causou " + damage + " de dano!");
            } else {
                if (!this.hero.isDefending) {
                    this.hero.life -= damage;
                    if (this.hero.life < 0) this.hero.life = 0;
                }
                this.addLog("Vilão atacou e causou " + damage + " de dano ao heroi!");
            }
            this.playSound('attackSound');
            this.checkWinner();
            if (isHero && !this.winner) {
                setTimeout(this.villainAction, 500); // Resposta do vilão após 0,5 segundo
            }
        },
        defense(isHero) {
            if (isHero) {
                this.hero.isDefending = true;
                this.addLog("Heroi está se defendendo!");
            } else {
                this.villain.isDefending = true;
                this.addLog("Vilão está se defendendo!");
            }
            this.playSound('defenseSound');
            if (isHero && !this.winner) {
                setTimeout(() => {
                    this.villain.isDefending = false;
                    this.villainAction();
                }, 500);
            }
        },
        usePotion(isHero) {
            const healAmount = Math.floor(Math.random() * 20) + 10; // Cura aleatória entre 10 e 30
            if (isHero) {
                this.hero.life += healAmount;
                if (this.hero.life > 100) this.hero.life = 100;
                this.addLog("Heroi usou uma poção e recuperou " + healAmount + " de vida!");
            } else {
                this.villain.life += healAmount;
                if (this.villain.life > 100) this.villain.life = 100;
                this.addLog("Vilão usou uma poção e recuperou " + healAmount + " de vida!");
            }
            this.checkWinner();
            if (isHero && !this.winner) {
                setTimeout(() => {
                    this.villainAction();
                }, 500);
            }
        },
        flee(isHero) {
            if (isHero) {
                this.addLog("Heroi fugiu da batalha!");
                this.winner = "Vilão";
            }
        },
        villainAction() {
            const actions = ['attack', 'defense', 'usePotion'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            this[randomAction](false);
        },
        checkWinner() {
            if (this.villain.life <= 0) {
                this.winner = "Heroi";
                this.playSound('victorySound');
            } else if (this.hero.life <= 0) {
                this.winner = "Vilão";
                this.playSound('victorySound');
            }
        },
        playSound(soundRef) {
            this.$refs[soundRef].play();
        },
        addLog(message) {
            console.log(message);
        }
    }
}).mount("#app");
