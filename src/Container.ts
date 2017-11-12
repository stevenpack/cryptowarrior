import * as PubSub from 'pubsub-js';

export default class Container {
    eventHub: PubSubJS.Base;

    constructor() {
        this.eventHub = PubSub; 
    }
}