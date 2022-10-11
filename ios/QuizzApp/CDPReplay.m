//
//  CDPReplay.m
//
//  Created by CDP on 16/11/9.
//  Copyright © 2016年 CDP. All rights reserved.
//

#import "CDPReplay.h"

#ifdef DEBUG
#    define CDPLog(fmt,...) NSLog(fmt,##__VA_ARGS__)
#else
#    define CDPLog(fmt,...) /* */
#endif


@interface CDPReplay () <RPPreviewViewControllerDelegate>

@end

@implementation CDPReplay

+(instancetype)sharedReplay{
    static CDPReplay *replay=nil;
    static dispatch_once_t token;
    dispatch_once(&token, ^{
        replay=[[CDPReplay alloc] init];
    });
    return replay;
}

-(BOOL)isRecording{
    return [RPScreenRecorder sharedRecorder].recording;
}
#pragma mark - Start / end recording

-(void)startRecord{
    if ([RPScreenRecorder sharedRecorder].recording==YES) {
        CDPLog(@"CDPReplay:Already started recording");
        return;
    }
    if ([self systemVersionOK]) {
        if ([[RPScreenRecorder sharedRecorder] isAvailable]) {
            CDPLog(@"CDPReplay:Recording start initialization");
            
            [[RPScreenRecorder sharedRecorder] startRecordingWithMicrophoneEnabled:YES handler:^(NSError *error){
                if (error) {
                    CDPLog(@"CDPReplay: Start recording error %@",error);
                }
                else{
                    CDPLog(@"CDPReplay:Start recording");
                }
            }];
        }
        else {
            CDPLog(@"CDPReplay:Environment does not support ReplayKit recording");
        }
    }
    else{
        CDPLog(@"CDPReplay:The system version needs to be iOS9.0 and above to support ReplayKit recording");
    }
}
-(void)stopRecord{
    CDPLog(@"CDPReplay:Ending recording");
    [[RPScreenRecorder sharedRecorder] stopRecordingWithHandler:^(RPPreviewViewController *previewViewController, NSError *  error){
        if (error) {
            CDPLog(@"CDPReplay:Ending recording error %@", error);
        }
        else {
            CDPLog(@"CDPReplay:Recording completed");
        }
    }];
}

#pragma mark
-(BOOL)systemVersionOK{
    if ([[UIDevice currentDevice].systemVersion floatValue]<9.0) {
        return NO;
    } else {
        return YES;
    }
}
@end
