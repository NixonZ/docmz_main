package com.docmz_kb;

import android.content.Intent;
import android.os.Bundle;
import android.app.Application;
import android.content.Context;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.docmz_kb.SendSocketID;

public class StartService extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    StartService(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

   @Override
  public String getName() {
    return "StartService";
  }

 @ReactMethod
  public void start() {
      Intent service = new Intent(reactContext.getApplicationContext(), SendSocketID.class);
      Bundle bundle = new Bundle();

      bundle.putString("foo","bar");
      service.putExtras(bundle);

      reactContext.getApplicationContext().startService(service);
  }

}
