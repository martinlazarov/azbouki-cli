import * as fs from 'fs';
import * as path from 'path'

export default class ModuleGenerator {

    constructor() {
        //option variables
        this.generate = this.generate.bind(this);
    }

    generateModule(moduleName: string) {
        console.log(`Generating module ${moduleName}...`);
        const sourceDir = path.join(__dirname, '../source');

        const sources = [
            { path: path.join(sourceDir, 'Controller.js'), name: `${moduleName}Controller.js`},
            { path: path.join(sourceDir, 'index.js'), name: `index.js`},
            { path: path.join(sourceDir, 'Repository.js'), name: `${moduleName}Repository.js`},
            { path: path.join(sourceDir, 'Routes.js'), name: `${moduleName}Routes.js`},
        ];

        const newDirPath = path.join('./', moduleName);

        if (!fs.existsSync(newDirPath)){
            fs.mkdirSync(newDirPath);
        }

        sources.forEach(source => {

            fs.readFile(source.path, 'utf8', function (err:any, tpl:string) {// TODO: Update template!

                if (err) {
                    console.error(err);
                }
                const newContent = tpl.replace(/Placeholder/g, moduleName);

                // TODO: folder name should be capital
                fs.writeFile(path.join(newDirPath, source.name), newContent, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log(`created ${source.name}`);
                });

            });

        });
    }

    public generate(item: string, itemName: string) {
        if (item === "module") {
            this.generateModule(itemName);
        }
    }
}