/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';


const headlessTask = async ({taskId}) =>{
    await vdUtils.getAndUploadAllVideos(true);
    BackgroundFetch.finish(taskId);
}

BackgroundFetch.registerHeadlessTask(headlessTask)
AppRegistry.registerComponent(appName, () => App);
