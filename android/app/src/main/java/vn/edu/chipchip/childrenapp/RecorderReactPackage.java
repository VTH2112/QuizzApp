package vn.edu.chipchip.childrenapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;



import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RecorderReactPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(
                              ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new RecorderManager(reactContext));

    return modules;
  }

  // Backward compatibility
   public List<Class<? extends JavaScriptModule>> createJSModules() {
       return new ArrayList<>();
   }

}