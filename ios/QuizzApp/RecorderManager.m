//
//  RecorderManager.m
//  screenrecord
//
//  Created by Chenshu on 30/5/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RecorderManager.h"
#import <React/RCTLog.h>
#import "ASScreenRecorder.h"
#import "AppDelegate.h"
#import "CDPReplay.h"


@implementation RecorderManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setRoomID:(NSDictionary*)roomInfo)
{
  //NSString *path = [options objectForKey:@"path"]
  RCTLogInfo(@"setRoomID!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  [recorder setRoomInfo:roomInfo];
}


RCT_EXPORT_METHOD(start)
{
  RCTLogInfo(@"started!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  //[recorder clearCache];
  if (!recorder.isRecording) {
    [recorder startRecording:YES];
    RCTLogInfo(@"Start recording");
  }
}

RCT_EXPORT_METHOD(stop)
{
  RCTLogInfo(@"stop!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  
  if (recorder.isRecording) {
    [recorder stopRecording:YES];
  }
}
RCT_EXPORT_METHOD(clearCache)
{
  RCTLogInfo(@"clearCache!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  
  [recorder clearCache];
}
RCT_EXPORT_METHOD(deleteFile:(NSString*)fileName)
{
  RCTLogInfo(@"deleteFile!");
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  
  [recorder deleteFile:fileName];
}

RCT_EXPORT_METHOD(getVideosFiles:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  ASScreenRecorder *recorder = [ASScreenRecorder sharedInstance];
  NSArray* res =[recorder getVideosFiles];
  resolve(res);
}

RCT_EXPORT_METHOD(getDevicesInfo:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSString* name = [[UIDevice currentDevice] name];
  NSString* model = [[UIDevice currentDevice] systemVersion];
  NSString* res  = [NSString stringWithFormat:@"%@ %@" ,name, model];
  resolve(res);
}


@end


@implementation ModuleWithEmitter
{
  bool hasListeners;
}
RCT_EXPORT_MODULE();
+ (id)allocWithZone:(NSZone *)zone {
    static ModuleWithEmitter *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}
// Will be called when this module's first listener is added.
-(void)startObserving {
  RCTLogInfo(@"startObserving!");
    hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
}

- (void)sendEvent:(NSString*)fileName {
  if (hasListeners) {
    [self sendEventWithName:@"updateFilePath" body:@{@"file": fileName}];
  }
}
- (NSArray<NSString *> *)supportedEvents {
    return @[@"updateFilePath"];
}

@end
