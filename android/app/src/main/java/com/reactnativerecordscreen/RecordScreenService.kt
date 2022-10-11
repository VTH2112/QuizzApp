package com.reactnativerecordscreen

import android.app.Activity
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.CamcorderProfile
import android.media.MediaRecorder
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Binder
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import java.io.File
import java.io.IOException
import kotlin.concurrent.thread
import kotlin.experimental.and

class RecordScreenService : Service() {
    private lateinit var mediaProjectionManager: MediaProjectionManager
    private var mediaProjection: MediaProjection? = null
    private var mediaRecorder: MediaRecorder? = null;
    internal var videoUri: String = "";
    private val binder = LocalBinder()
    private var mediaStorageDir:File?=null;
    private var videoPath:String = "";
    private var mVirtualDisplay: VirtualDisplay? = null
    private var mScreenDensity = 0

    override fun onCreate() {
        super.onCreate()
        mediaStorageDir = null;
        mediaStorageDir = File(getApplicationContext().getCacheDir(), "tmp");

        if (!mediaStorageDir!!.exists()){
            mediaStorageDir!!.mkdirs();
        }

        
        // TODO: Add code for starting the service and getting notifications
        createNotificationChannel()

        startForeground(SERVICE_ID, NotificationCompat.Builder(this,
                NOTIFICATION_CHANNEL_ID).build())

        mediaProjectionManager = applicationContext.getSystemService(
                Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
    }

    inner class LocalBinder : Binder() {
        // Return this instance of LocalService so clients can call public methods
        fun getService(): RecordScreenService = this@RecordScreenService
    }

    override fun onBind (intent: Intent): IBinder {
        return binder
    }

    private fun createNotificationChannel() {
        val serviceChannel = NotificationChannel(NOTIFICATION_CHANNEL_ID,
                "Record Screen Service Channel", NotificationManager.IMPORTANCE_DEFAULT)

        val manager = getSystemService(NotificationManager::class.java) as NotificationManager
        manager.createNotificationChannel(serviceChannel)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {

        return if (intent != null) {
            mScreenDensity = intent!!.getIntExtra(SCREEN_DENSITY_DATA, 0);
            when (intent.action) {
                ACTION_START -> {
                    mediaProjection = mediaProjectionManager.getMediaProjection(Activity.RESULT_OK, intent.getParcelableExtra(EXTRA_RESULT_DATA)!!) as MediaProjection

                    initRecorder()
                    mVirtualDisplay = createVirtualDisplay()
                    mediaRecorder!!.start()
                    Service.START_STICKY
                }
                else -> throw IllegalArgumentException("Unexpected action received: ${intent.action}")
            }
        } else {
            Service.START_NOT_STICKY
        }
    }

    private fun createVirtualDisplay(): VirtualDisplay? {
        return mediaProjection?.createVirtualDisplay("MainActivity",
                DISPLAY_WIDTH, DISPLAY_HEIGHT, mScreenDensity,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                mediaRecorder?.getSurface(), null /*Callbacks*/, null
                /*Handler*/);
    }

    private fun initRecorder() {
        try {
            val fName = "android_" + _roomID.toString() + "_" + System.currentTimeMillis().toString() + "_VIDEOENDTIME_" + _startTime.toString() + ".mp4"
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


            val profile = CamcorderProfile.get(CamcorderProfile.QUALITY_720P)

            mediaRecorder!!.setVideoSource(MediaRecorder.VideoSource.SURFACE);
            mediaRecorder!!.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            mediaRecorder!!.setVideoSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
            mediaRecorder!!.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
            mediaRecorder!!.setVideoEncodingBitRate(512 * 1000);
            mediaRecorder!!.setVideoFrameRate(18);
            mediaRecorder!!.setMaxDuration(60000);

            Log.i("VIDEO URL", videoPath);
            mediaRecorder!!.setOutputFile(videoPath)

            mediaRecorder!!.prepare()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    public fun stop (): String {
        try {
            mediaRecorder!!.setOnErrorListener(null)
            mediaRecorder!!.setOnInfoListener(null)
            mediaRecorder!!.stop();
            mediaRecorder!!.release();
        } catch (err: RuntimeException) {
            println("neco spatne")
            println(err)
        }

        return videoUri
    }

    companion object {
        private const val LOG_TAG = "AudioCaptureService"
        private const val SERVICE_ID = 123
        private const val NOTIFICATION_CHANNEL_ID = "AudioCapture channel"

        private const val NUM_SAMPLES_PER_READ = 1024
        private const val BYTES_PER_SAMPLE = 2 // 2 bytes since we hardcoded the PCM 16-bit format

        const val ACTION_START = "RecordScreenService:Start"
        const val EXTRA_RESULT_DATA = "RecordScreenService:Extra:ResultData"
        const val SCREEN_WIDTH_DATA = "RecordScreenService:Extra:ScreenWidthData"
        const val SCREEN_HEIGHT_DATA = "RecordScreenService:Extra:ScreenHeightData"
        const val SCREEN_DENSITY_DATA = "RecordScreenService:Extra:ScreenDensityData"
        const val DISPLAY_WIDTH = 650
        const val DISPLAY_HEIGHT = 364
        public var _roomID:Int = 0
        public var _startTime:Long = 0;
    }
}