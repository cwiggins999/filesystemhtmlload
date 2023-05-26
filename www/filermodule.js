function FilerModule( myFileSystem, pfolder, clientfunction){
    this.filesys = myFileSystem;
    this.folder = pfolder;
    this.clientfunction = clientfunction;
    
this.filer = async function (m){
  var callback = this.clientfunction;
  console.log("calling filer");
    switch(m.sub){
      case "list":{
        console.log("list");
        let l = await this.filesys.readdir(this.folder + '/Shows');
        l.sort();
        callback({call: 'filer', sub: 'list' , data: l});
        break;
      }
      case "open":{
        console.log("filer:Open");
        let t = this.folder + '/Shows/' + m.data;
        let s = await (this.filesys.readfile(t)); 
        callback({call: 'filer', sub: 'open', data: s});
        break
      }
      case "save":{
        let t = this.folder + '/Shows/' + m.target;
        //for Capacitor, checking file exists isn't necessary
        //let e = this.filesys.exists(t);
        //if (e){await this.filesys.delete(t);}
        //TODO - ADJUST NODE VERSION FOR ASYNC
        this.filesys.writefile(t, m.data);
        break;
      }
      case "rename":{
        let p = this.folder + '/Shows/';
        await this.filesys.rename(p + m.target, p + m.data);
        break;
      }
      case "delete":{
        let t = this.folder + '/Shows/' + m.target;
        let e = this.filesys.exists(t);
        if (e){await this.filesys.delete(t);}
        break;
      }
      case "library":{
        let lf = await this.filesys.readdir(this.folder + '/User/Library');        
        lf.sort();
        let l = []; let t = ['show','asset','scene','object','device'];
        for(let i = 0; i < t.length; i++){
          for(let f = 0; f < lf.length; f++){
            if(lf[f].startsWith(t[i])){l.push(lf[f])}
          }
        }
        callback({call: 'filer', sub: 'library', data: l});
        break;
      }
      case "store":{
        let t = this.folder + '/User/Library' + m.target;
        //let e = this.filesys.exists(t);
        //if (e){await this.filesys.delete(t);}
        this.filesys.writefile(t, m.data);
        break
      }
      case "libraryname":{
        let p = this.folder + '/User/Library/';
        await this.filesys.rename(p + m.target, p + m.data);
        break
      }
      case "deletelibrary":{
        let t = this.folder + '/User/Library/' + m.target;
        let e = this.filesys.exists(t);
        if (e){await this.filesys.delete(t);}
        callback({call: 'filer', sub: 'deletelibrary'});
        break
      }
      case "insert":{
        let t = this.folder + '/User/Library/' + m.target;
        console.log(t);
        let o = await this.filesys.readfile(t);
        callback({call: 'filer', sub: 'insert:', dat: o})
      }
      case "prefs":{
        let prefs = await this.filesys.readfile(this.folder  + '/User/Prefs');
        callback({call: 'filer', sub: 'prefs', data: prefs});
        break
      }
      case "update":{
        let t = this.folder + '/User/Prefs';
        //let e = this.filesys.exists(t);
        //if (e){await this.filesys.delete(t);}
        this.filesys.writefile(t, m.data);
        break
      }
      case "folder":{
        dialog.showOpenDialog(win, {
          properties: ['openDirectory']
        }).then(result => {
          callback({call: 'filer', sub: 'folder', data: result.filePaths});
        }).catch(err => {
          console.log(err);
        });
        break;
      }
      case "launch":{
        shell.openExternal(m.data);
        break;
      }
    }
  }
}

//ES6 module syntax
export {FilerModule}
//CommonJS syntax
//module.exports = FilerModule;