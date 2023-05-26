import {FileSystemModule} from "./CapacitorFilesystemModule.js";
import { FilerModule}  from "./filermodule.js";
import { ServerModule} from "./servermodule.js";

const appFileSystem = new FileSystemModule();
const appFiler = new FilerModule(appFileSystem, "PatronetX",toClient);
const appServerModule = new ServerModule(appFileSystem, "PatronetX", toClient);

console.log("local interocitor scripts loaded");

function toLocal(o) {
    console.log( o);
    switch (o.call)
    {
        case 'filer':
            appFiler.filer(o);
            break;

        case 'server':
            appServerModule.server(o);
            break;
    }
}

function toClient(o) {
    console.log("toClient" + o);
    _fromHost(o);
}

function test1() {
    console.log("just a dummy function");
}

//export {toLocal, myFiler}
window.toLocal = toLocal;
window.test1 = test1;
window.appFiler = appFiler;
window.appFileSystem = appFileSystem;
window.appServerModule = appServerModule;