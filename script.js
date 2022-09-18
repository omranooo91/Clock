class State {
    constructor(seconds, minutes, hours) {
        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;
    }

    static now() {
        const now = new Date();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = now.getHours() + minutes / 60;
        return new State(seconds, minutes, hours);
    }
}

class Clock {
    constructor(state) {
        this.state = state;
        this.tick = this.tick.bind(this);
        requestAnimationFrame(this.tick);

    }

    tick() {
        this.setState(State.now());
        requestAnimationFrame(this.tick);
    }
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        const { seconds, minutes, hours } = this.state;

        //render secondes
        document.querySelector(".second").style.transform =
            `rotate(${Math.floor(seconds) / 60 * 360}deg)`;


        //render minutes
        document.querySelector(".minute").style.transform =
            `rotate(${Math.floor(minutes) / 60 * 360}deg)`;

        //render hours
        document.querySelector(".hours").style.transform =
            `rotate(${Math.floor(hours) / 60 * 360}deg)`;

    }
}


const CLOCK = new Clock();