//
//  RecorderManager.h
//  screenrecord
//
//  Created by Chenshu on 30/5/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RecorderManager : NSObject <RCTBridgeModule>
@end



@interface ModuleWithEmitter : RCTEventEmitter <RCTBridgeModule>
+ (id)allocWithZone:(NSZone *)zone;
- (void)sendEvent:(NSString*)fileName;
@end
