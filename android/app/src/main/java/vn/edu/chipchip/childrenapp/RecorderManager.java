package vn.edu.chipchip.childrenapp;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.File;
import java.lang.ref.WeakReference;

import android.os.Build;
import android.util.Log;



public class RecorderManager extends ReactContextBaseJavaModule {

  private static WeakReference<MainActivity> mWeakActivity;

  public RecorderManager(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  public static void updateActivity(MainActivity activity) {
    mWeakActivity = new WeakReference<MainActivity>(activity);
  }
  public static void VideoReady(String fileName){
     
  }

  @Override
  public String getName() {
    return "RecordScreen";
  }

  @ReactMethod
  public void start() {
    mWeakActivity.get().startRecording();
  }

  @ReactMethod
  public void stop() {
    mWeakActivity.get().stopRecording();
    //String filePath = mWeakActivity.get().getVideoPath();
    //getReactApplicationContext()
    //        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
    //        .emit("updateFilePath", filePath);
  }
  @ReactMethod
  public void clearCache(){
    mWeakActivity.get().clearCache();
  }
  @ReactMethod
  public void deleteFile(String fileName){
    try {
      new File(fileName).delete();
    }catch (Exception ex){

    }
  }
  @ReactMethod
  public void getVideosFiles(Promise promise) {
    try {
      String videoPath = getReactApplicationContext().getCacheDir().getPath();
      Log.i("RECORD_VIDEO", "Start Record at: " + videoPath);
      WritableArray arr = new WritableNativeArray();
      File dir = new File(getReactApplicationContext().getCacheDir(), "tmp");
      if (dir.isDirectory())
      {
        String[] fs = dir.list();
        for(int i =0; i < fs.length; i++){
          arr.pushString(dir.getAbsolutePath()+"/"+  fs[i]);
        }
      }

      promise.resolve(arr);
    }catch (Exception ex){
        promise.reject(ex);
    }
  }

  @ReactMethod
  public void getDevicesInfo(Promise promise) {
    String res = Build.MANUFACTURER + " " + Build.MODEL + " " + Build.VERSION.RELEASE;
    promise.resolve(res);
  }
  @ReactMethod
  public void setRoomID( ReadableMap options) {
    mWeakActivity.get().setRoomInfo(options);
  }
}