//
//  CDPReplay.h
//
//  Created by CDP on 16/11/9.
//  Copyright © 2016年 CDP. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <ReplayKit/ReplayKit.h>


@interface CDPReplay : NSObject
@property (nonatomic,assign,readonly) BOOL isRecording;
+(instancetype)sharedReplay;
-(void)startRecord;
-(void)stopRecord;






@end
