package vn.edu.chipchip.childrenapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import
import java.io.IOException;
import java.io.File;
import android.content.Context;
import android.hardware.display.DisplayManager;
import android.hardware.display.VirtualDisplay;
import android.media.MediaRecorder;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.SparseIntArray;
import android.view.Surface;
import com.facebook.react.bridge.WritableArray;
import android.util.Log;
import androidx.core.content.ContextCompat;

public class MainActivity extends ReactActivity {

    private static final String TAG = "MainActivity";
    private static final int REQUEST_CODE = 1000;
    private int mScreenDensity;
    private MediaProjectionManager mProjectionManager;
    private static final int DISPLAY_WIDTH = 650;
    private static final int DISPLAY_HEIGHT = 364;
    private MediaProjection mMediaProjection;
    private VirtualDisplay mVirtualDisplay;
    private MediaProjectionCallback mMediaProjectionCallback;
    private MediaRecorder mMediaRecorder=null;
    private static final SparseIntArray ORIENTATIONS = new SparseIntArray();
    private String videoPath;
    private File mediaStorageDir;
    private int _roomID = 0;
    private long _startTime = 0;
    
    static {
        ORIENTATIONS.append(Surface.ROTATION_0, 90);
        ORIENTATIONS.append(Surface.ROTATION_90, 0);
        ORIENTATIONS.append(Surface.ROTATION_180, 270);
        ORIENTATIONS.append(Surface.ROTATION_270, 180);
    }

    @Override
    public void onNewIntent(Intent intent) {
         super.onNewIntent(intent);
         setIntent(intent);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        RecorderManager.updateActivity(this);

        DisplayMetrics metrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(metrics);
        mScreenDensity = metrics.densityDpi;

        mMediaRecorder = null;
        mediaStorageDir = null;
        mProjectionManager = (MediaProjectionManager) getSystemService(Context.MEDIA_PROJECTION_SERVICE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != REQUEST_CODE) {
            Log.e(TAG, "Unknown request code: " + requestCode);
            return;
        }
        if (resultCode != RESULT_OK) {
//            mMediaProjection = null;
//            shareScreen();
            return;
        }

        try {
           mMediaProjectionCallback = new MediaProjectionCallback();
           mMediaProjection = mProjectionManager.getMediaProjection(resultCode, data);
           mMediaProjection.registerCallback(mMediaProjectionCallback, null);
           mVirtualDisplay = createVirtualDisplay();
           mMediaRecorder.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    

    public void startRecording() {
        try {
            if(mMediaRecorder==null)
                mMediaRecorder = new MediaRecorder();

            mediaStorageDir = new File(getApplicationContext().getCacheDir(), "tmp");
            if (!mediaStorageDir.exists()){
                mediaStorageDir.mkdirs();
            }

            initRecorder();
            // shareScreen();
        } catch (Exception e) {
            e.printStackTrace();
            mMediaRecorder = null;
            mMediaProjection = null;
        }
    }
    
    

    public void stopRecording() {
        if (mMediaRecorder == null) {
            return;
        }
        try {
            mMediaRecorder.setOnErrorListener(null);
            mMediaRecorder.setOnInfoListener(null);
            mMediaRecorder.stop();
            mMediaRecorder.reset();
            
            stopScreenSharing();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

	private void shareScreen() {
        if (mMediaProjection == null) {
            startActivityForResult(mProjectionManager.createScreenCaptureIntent(), REQUEST_CODE);
            return;
        }
		mVirtualDisplay = createVirtualDisplay();
        mMediaRecorder.start();
    }

    


    private void initRecorder() {
        try {
            if(mMediaRecorder == null){
                mMediaRecorder = new MediaRecorder();
                Log.i("NEW_MediaRecorder", "MediaRecorder");
            }

            String fName = "android_" + _roomID + "_" + System.currentTimeMillis() + "_VIDEOENDTIME_" + _startTime + ".mp4";
            videoPath = mediaStorageDir.getPath() + File.separator + fName;
            Log.i("RECORD_VIDEO", "Start Record at: " + videoPath);

            mMediaRecorder.setVideoSource(MediaRecorder.VideoSource.SURFACE);
            mMediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            mMediaRecorder.setOutputFile(videoPath);
            mMediaRecorder.setVideoEncodingBitRate(256 * 1000);
            mMediaRecorder.setVideoFrameRate(18);
            mMediaRecorder.setVideoSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
            mMediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
            int rotation = getWindowManager().getDefaultDisplay().getRotation();
            int orientation = ORIENTATIONS.get(rotation + 90);
            mMediaRecorder.setOrientationHint(orientation);

            mMediaRecorder.setMaxDuration(60000);
            mMediaRecorder.prepare();
            shareScreen();
            Log.i("INFO_Start", "Start Record videoPath" + videoPath);

            mMediaRecorder.setOnErrorListener(new MediaRecorder.OnErrorListener(){
                @Override
                public  void onError(MediaRecorder mr, int what, int extra){
                    Log.w("onEror","MediaRecorder onError:"+what);
                }
             });

             mMediaRecorder.setOnInfoListener(new MediaRecorder.OnInfoListener() {
                @Override
                public void onInfo(MediaRecorder mr, int what, int extra) {
                    Log.w("RecordActivity","MediaRecorder onInfo:"+what);

                    if (what == MediaRecorder.MEDIA_RECORDER_INFO_MAX_DURATION_REACHED) {
                        mMediaRecorder.setOnInfoListener(null);
                        // mMediaRecorder.setOnErrorListener(null);
                        mMediaRecorder.stop();
                        mMediaRecorder.reset();
                        mMediaRecorder.release();
                        mMediaRecorder = null;
                        Log.i("INFO_Record_Finish", "Start Record Finish" + videoPath);
                        String newName = videoPath.replace("VIDEOENDTIME",System.currentTimeMillis() + "");
                        Log.i("INFO_RenameFile", "Start Rename Finish" + newName);
                        File from = new File(videoPath);
                        from.renameTo(new File(newName));

                        initRecorder();
                         mVirtualDisplay.release();
                         mVirtualDisplay = null;
                         mVirtualDisplay = createVirtualDisplay();
                    }
                }
            });
        } catch (Exception e) {
            Log.i("ERROR_RECORD", "ERROR_RECORD_Finish" + e);
            e.printStackTrace();
        }
    }
    private class MediaProjectionCallback extends MediaProjection.Callback {
        @Override
        public void onStop() {
            stopRecording();
        }
    }

    private void stopScreenSharing() {
        if (mVirtualDisplay == null) {
            return;
        }
        mVirtualDisplay.release();
        mVirtualDisplay = null;
        mMediaRecorder.release();
        mMediaRecorder = null;
        destroyMediaProjection();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        destroyMediaProjection();
    }

    private void destroyMediaProjection() {
        if (mMediaProjection != null) {
            mMediaProjection.unregisterCallback(mMediaProjectionCallback);
            mMediaProjection.stop();
            mMediaProjection = null;
        }
        Log.i(TAG, "MediaProjection Stopped");
    }


    @Override
    protected String getMainComponentName() {
        return "QuizApp";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
    @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    public String getVideoPath() {
        return videoPath;
    }

    public void clearCache(){
        File dir = new File(getApplicationContext().getCacheDir(), "tmp");
        if (dir.isDirectory())
        {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++)
            {
                new File(dir, children[i]).delete();
            }
        }
    }
    public WritableArray getAllFiles(){
        WritableArray arr = new WritableNativeArray();
        File dir = new File(getApplicationContext().getCacheDir(), "tmp");
        if (dir.isDirectory())
        {
            String[] fs = dir.list();
            for(int i =0; i < fs.length; i++){
                arr.pushString(dir.getAbsolutePath()+"/"+  fs[i]);
            }
        }
        return arr;
    }

    public void setRoomInfo(ReadableMap options){
        _roomID =  options.getInt("roomID");
        _startTime = (long)options.getDouble("startTime");
    }

    public void deleteAFileWithName(String fileName){
        new File(fileName).delete();
    }
    private VirtualDisplay createVirtualDisplay() {
        return mMediaProjection.createVirtualDisplay("MainActivity",
                DISPLAY_WIDTH, DISPLAY_HEIGHT, mScreenDensity,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                mMediaRecorder.getSurface(), null /*Callbacks*/, null
                /*Handler*/);
    }
}
