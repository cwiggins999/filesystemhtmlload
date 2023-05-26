import '@capacitor/core';
import {  Device} from '@capacitor/device';
import { Filesystem,Directory, Encoding} from '@capacitor/filesystem';
import { WebView } from '@capacitor/core';
import {CapacitorHttp} from '@capacitor/core';

export async function getDeviceInfo() {
    let info = await Device.getInfo();
    return info;
  };
  

  window.CapFSPlugin = Filesystem;
  window.FSDirectoryEnum = Directory;
  window.WebView = WebView;
  window.CapacitorHttp = CapacitorHttp;