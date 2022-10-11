//
//  ASScreenRecorder.h
//  ScreenRecorder
//
//  Created by Alan Skipp on 23/04/2014.
//  Copyright (c) 2014 Alan Skipp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>

typedef void (^VideoCompletionBlock)(NSURL* fileName);
@protocol ASScreenRecorderDelegate;

@interface ASScreenRecorder : NSObject
@property (nonatomic, readonly) BOOL isRecording;
@property (nonatomic, readonly) int currRoomID;
@property (nonatomic, readonly) long long roomStartTime;
@property (nonatomic, readonly) BOOL isForce;
// delegate is only required when implementing ASScreenRecorderDelegate - see below
@property (nonatomic, weak) id <ASScreenRecorderDelegate> delegate;
// if saveURL is nil, video will be saved into camera roll
// this property can not be changed whilst recording is in progress
@property (strong, nonatomic) NSURL *videoURL;


+ (instancetype)sharedInstance;
- (void)setRoomInfo:(NSDictionary*)roomInfo;
- (BOOL)startRecording:(BOOL)isNew;
- (void)stopRecording:(BOOL)isForce;
- (void)clearCache;
- (void)deleteFile:(NSString*)fileName;
- (NSArray*)getVideosFiles;
@end


// If your view contains an AVCaptureVideoPreviewLayer or an openGL view
// you'll need to write that data into the CGContextRef yourself.
// In the viewcontroller responsible for the AVCaptureVideoPreviewLayer / openGL view
// set yourself as the delegate for ASScreenRecorder.
// [ASScreenRecorder sharedInstance].delegate = self
// Then implement 'writeBackgroundFrameInContext:(CGContextRef*)contextRef'
// use 'CGContextDrawImage' to draw your view into the provided CGContextRef
@protocol ASScreenRecorderDelegate <NSObject>
- (void)writeBackgroundFrameInContext:(CGContextRef*)contextRef;
@end
