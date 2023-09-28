import Model from './models/model'
import View from './views/view'
import AppController from './controllers/controller';

export class App {
    constructor() { }
    
    async start() {
        const controller = new AppController(new Model(), new View());
        await controller.init();
    }
}



