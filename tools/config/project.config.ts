import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      {src: 'socket.io/lib/index.js', inject: 'libs'},
      {src: 'socket.io-client/lib/index.js', inject: 'libs'},
      {src: 'tether/dist/js/tether.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true}
    ];

    this.APP_ASSETS = [
      //...
      // { src: `${this.ASSETS_SRC}/main.css`, inject: true }, // the old css file
      { src: `${this.ASSETS_SRC}/main.scss`, inject: true }, // renamed SASS file
    ];

    this.CSS_PROD_BUNDLE = 'main.css';

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);
  }
}
