
function FileSystemModule () {
    const name = "Capacitor Filesystem";
    const DeviceDirectory = FSDirectoryEnum.Library;
    const FileEncoding = "utf8";

    this.exists = async function(path)
    {
      try {
        await CapFSPlugin.stat({
          path: path,
          directory: DeviceDirectory,
        });
        return true;
      } catch (e) {
        if (e.message === 'File does not exist' || e.message === 'Entry does not exist.' ) {
          return false;
        } else {
          throw e;
        }
      }

    }

    this.writefilesync = function(path, data){
        //console.log(name + ": writefilesync");
        console.log(name + ": writefilesync unimplemented");
        //fs.writeFile(path, data, err => {if (err) {console.error(err);}});
    }

    this.makedir = async function(path, isRecursive) {
        try {
            let ret = await CapFSPlugin.mkdir({
              path: path,
              directory: DeviceDirectory,
              recursive: isRecursive,
            });
            console.log('Made directory ' + path, ret);            
          } catch (e) {
            if (e.message != "Current directory does already exist.")
              console.error('Unable to make directory', e);
          }   
    }

    /*========== async functions */

    this.readdir = async function(path)  {
      try {
        let ret = await CapFSPlugin.readdir({
          path: path,
          directory: DeviceDirectory,
        });
        //let result = ret[0]["name"];
        let result = ret.files.map(({ name}) => name)
        console.log('Read dir contents', result);
        return result;
      } catch (e) {
        console.error('Unable to read dir', e);
      }
    }

    this.readfile = async function(path) {
      let contents = await CapFSPlugin.readFile({
        path: path,
        directory: DeviceDirectory,
        encoding: FileEncoding,
      });
      return contents.data;

    }

    this.writefile = async function(path, data) {
      try {
        const result = await CapFSPlugin.writeFile({
          path: path,
          data: data,
          directory: DeviceDirectory,
          encoding: FileEncoding,
        });
        console.log('Wrote file', result);
      } catch (e) {
        console.error('Unable to write file ', e);
      }
    };


    this.delete = async function (path){
        //console.log(name + ": delete");
        await CapFSPlugin.deleteFile({
          path: path,
          directory: DeviceDirectory,
        });
        console.log('Deleted');      
      }

    this.rename = async function (oldname, newname){
        //console.log(name + ": rename");
        await CapFSPlugin.rename({
          from: oldname,
          to: newname,
          directory: DeviceDirectory,
          toDirectory: DeviceDirectory
        });
        console.log("renamed from " + oldname + " to " + newname);          
    }

    this.rmdir = async function(path) {
      try {
          let ret = await CapFSPlugin.rmdir({
            path: path,
            directory: DeviceDirectory,
          });
          console.log('Removed ' + path, ret);
        } catch (e) {
          if (e.message != "Folder does not exist.")
            console.error('Unable to remove directory ' + path, e);
        }   
  }

}

//ES6 syntax
export {FileSystemModule}
//CommonJS syntax
//module.exports = FileSystemModule;