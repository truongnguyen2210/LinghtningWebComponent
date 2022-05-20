import { LightningElement, track } from 'lwc';

export default class HelloWebComponent extends LightningElement {
    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }
    dateTime = new Date().toLocaleDateString().concat(` `, new Date().toLocaleTimeString());
    currentDate = new Date().toDateString();
    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }
    get currentDate() {
        return dateTime;
    }
}