package com.reactnativerecordscreen

import android.app.Activity
import android.app.Activity.RESULT_OK
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.CamcorderProfile
import android.media.MediaRecorder
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Environment
import android.os.IBinder
import android.util.DisplayMetrics
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*
import android.util.Log

class RecordScreenModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val REQUEST_CODE = 1000
    private var screenDensity: Int = 0;
    private var projectManager: MediaProjectionManager? = null;
    private var mediaProjection: MediaProjection? = null;
    private var mediaRecorder: MediaRecorder? = null;
    private lateinit var mService: RecordScreenService
    private var mediaStorageDir: File?=null;
    private var videoPath:String = "";
    private var mVirtualDisplay: VirtualDisplay? = null
    private var mBound: Boolean = false
    internal var videoUri: String = "";
    private var startPromise: Promise? = null;
    override fun getName(): String {
        return "RecordScreen"
    }

    val connection = object : ServiceConnection {
        override fun onServiceConnected(className: ComponentName, service: IBinder) {
            val binder = service as RecordScreenService.LocalBinder
            mService = binder.getService()
            mBound = true
        }

        override fun onServiceDisconnected(arg0: ComponentName) {
            mBound = false
        }
    }

    private val mActivityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
      override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent) {
        if (requestCode != REQUEST_CODE) {
            startPromise?.reject("RECORDING_WRONG_CODE", "Wrong request code.")
            return
        }

        if (resultCode != RESULT_OK) {
            startPromise?.reject("RECORDING_REJECTED.", "User rejected recording");
            return
        }

          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
              val captureIntent = Intent(reactApplicationContext, RecordScreenService::class.java).apply {
                  reactApplicationContext.bindService(this, connection, Context.BIND_AUTO_CREATE)
                  action = RecordScreenService.ACTION_START
                  putExtra(RecordScreenService.EXTRA_RESULT_DATA, data!!)
                  putExtra(RecordScreenService.SCREEN_WIDTH_DATA, RecordScreenService.DISPLAY_WIDTH)
                  putExtra(RecordScreenService.SCREEN_HEIGHT_DATA, RecordScreenService.DISPLAY_WIDTH)
                  putExtra(RecordScreenService.SCREEN_DENSITY_DATA, screenDensity)
              }
              ContextCompat.startForegroundService(reactApplicationContext, captureIntent)
              print("started recording")
              startPromise?.resolve(null)

              return
          }

          initRecorder()
        mediaProjection = projectManager!!.getMediaProjection(resultCode, data)
        mediaProjection!!.registerCallback(MediaProjectionCallback(), null)
        mVirtualDisplay = createVirtualDisplay()
        mediaRecorder?.start()

        startPromise?.resolve(null)
      }
    }

    init {
      reactContext.addActivityEventListener(mActivityEventListener);
    }

    inner class MediaProjectionCallback: MediaProjection.Callback() {
      override fun onStop() {
        // ボタンが押されたら
        // super.onStop()
      mediaRecorder!!.setOnErrorListener(null)
      mediaRecorder!!.setOnInfoListener(null)
            mediaRecorder!!.stop();
            mediaRecorder!!.reset();

        mediaProjection = null;

      }
    }

    @ReactMethod
    fun setup(readableMap: ReadableMap) {
      projectManager = this.reactApplicationContext.getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager

      val metrics = DisplayMetrics()
      reactApplicationContext.currentActivity?.windowManager?.defaultDisplay?.getMetrics(metrics)
      screenDensity = metrics.densityDpi

        mediaStorageDir = File(this.reactApplicationContext.getCacheDir(), "tmp");

        if (!mediaStorageDir!!.exists()){
            mediaStorageDir!!.mkdirs();
        }
    }

    private fun createVirtualDisplay(): VirtualDisplay? {
        return mediaProjection?.createVirtualDisplay("MainActivity",
                RecordScreenService.DISPLAY_WIDTH, RecordScreenService.DISPLAY_HEIGHT, screenDensity,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                mediaRecorder?.getSurface(), null /*Callbacks*/, null
                /*Handler*/);
    }

    private fun shareScreen() {
      if (mediaProjection == null) {
        val i = projectManager!!.createScreenCaptureIntent()
        this.currentActivity!!.startActivityForResult(i, REQUEST_CODE)
        return
      }

        mVirtualDisplay = createVirtualDisplay()
      mediaRecorder!!.start()

      startPromise?.resolve(null)
    }

    @ReactMethod
    fun startRecording(promise: Promise) {
      startPromise = promise

      shareScreen()
    }

    private fun initRecorder() {
      try {
          val fName = "android_" + RecordScreenService._roomID.toString() + "_" + System.currentTimeMillis().toString() + "_VIDEOENDTIME_" + RecordScreenService._startTime.toString() + ".mp4"
          videoPath = mediaStorageDir!!.getPath() + File.separator + fName;

          mediaRecorder = MediaRecorder()


          mediaRecorder!!.setOnErrorListener(object : MediaRecorder.OnErrorListener {
              override fun  onError(mr:MediaRecorder?, what: Int, extra: Int) {
                  Log.w("onEror","MediaRecorder onError:"+what);
              }
          });
          mediaRecorder!!.setOnInfoListener(object : MediaRecorder.OnInfoListener {
              override fun  onInfo(mr: MediaRecorder, what: Int, extra: Int) {
                  Log.w("RecordActivity","MediaRecorder onInfo:"+what);

                  if (what == MediaRecorder.MEDIA_RECORDER_INFO_MAX_DURATION_REACHED) {
                      Log.w("RecordActivity","END-----")
                      mediaRecorder!!.setOnInfoListener(null)
                      mediaRecorder!!.stop()
                      mediaRecorder!!.reset()
                      val newName: String = videoPath.replace("VIDEOENDTIME", System.currentTimeMillis().toString() + "")
                      val from = File(videoPath)
                      from.renameTo(File(newName))
                      initRecorder()
                      mVirtualDisplay!!.release()
                      mVirtualDisplay = null
                      mVirtualDisplay = createVirtualDisplay()
                      mediaRecorder!!.start()
                  }
              }
          });

          mediaRecorder!!.setVideoSource(MediaRecorder.VideoSource.SURFACE);
          mediaRecorder!!.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
          mediaRecorder!!.setVideoSize(RecordScreenService.DISPLAY_WIDTH, RecordScreenService.DISPLAY_HEIGHT);
          mediaRecorder!!.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
          mediaRecorder!!.setVideoEncodingBitRate(512 * 1000);
          mediaRecorder!!.setVideoFrameRate(18);
          mediaRecorder!!.setMaxDuration(60000);

          Log.i("FUCKKKKKKKKKKKKKK", videoPath);
          mediaRecorder!!.setOutputFile(videoPath)

          mediaRecorder!!.prepare()
      } catch (e: IOException) {
        e.printStackTrace()
      }
    }

    @ReactMethod
    fun stopRecording(promise: Promise) {
      try {
          println("stopping")
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
              videoUri = mService.stop()
          } else {
              mediaRecorder!!.setOnErrorListener(null)
              mediaRecorder!!.setOnInfoListener(null)
              mediaRecorder!!.stop();
              mediaRecorder!!.release();
          }

        val response = WritableNativeMap();
        val result = WritableNativeMap();
        result.putString("videoUrl", videoUri);
        response.putString("status", "success");
        response.putMap("result", result);

        promise.resolve(response);
      } catch (err: RuntimeException) {
        err.printStackTrace();
        promise.reject(err)
      }
    }

    @ReactMethod
    fun clean(promise: Promise) {
        println("clean");
        promise.resolve(null);
    }

    @ReactMethod
    fun setRoomID(options:ReadableMap) {
        RecordScreenService._roomID = options.getInt("roomID");
        RecordScreenService._startTime = options.getDouble("startTime").toLong();
    }
}