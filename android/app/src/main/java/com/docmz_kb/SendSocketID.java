package com.docmz_kb;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class SendSocketID extends HeadlessJsTaskService {

//     public static void startService(@NonNull Context context) {
//         //if (!AppDetector.isAppInForeground(context)) {
//             Intent intentService = new Intent(context, MyTaskService.class);
//             context.startService(intentService);
//         //    HeadlessJsTaskService.acquireWakeLockNow(context);
//         //}
//     }

    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig(
            "SendSocketID",
            Arguments.fromBundle(extras),
            5000, // timeout for the task
            false // optional: defines whether or not  the task is allowed in foreground. Default is false
            ); 
        }
    return null;
    }
}   