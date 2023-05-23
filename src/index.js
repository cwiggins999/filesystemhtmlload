import '@capacitor/core';
import {  Device} from '@capacitor/device';
import { Filesystem,Directory, Encoding} from '@capacitor/filesystem';

export async function getDeviceInfo() {
    let info = await Device.getInfo();
    return info;
  };

  window.FSPlugin = Filesystem;
  window.DirectoryEnum = Directory;