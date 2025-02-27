//  Copyright © 2019 650 Industries. All rights reserved.

#import <ABI39_0_0EXUpdates/ABI39_0_0EXUpdatesConfig.h>
#import <ABI39_0_0EXUpdates/ABI39_0_0EXUpdatesSelectionPolicyNewest.h>

NS_ASSUME_NONNULL_BEGIN

@interface ABI39_0_0EXUpdatesSelectionPolicyNewest ()

@property (nonatomic, strong) NSArray<NSString *> *runtimeVersions;

@end

@implementation ABI39_0_0EXUpdatesSelectionPolicyNewest

- (instancetype)initWithRuntimeVersions:(NSArray<NSString *> *)runtimeVersions
{
  if (self = [super init]) {
    _runtimeVersions = runtimeVersions;
  }
  return self;
}

- (instancetype)initWithRuntimeVersion:(NSString *)runtimeVersion
{
  return [self initWithRuntimeVersions:@[runtimeVersion]];
}

- (nullable ABI39_0_0EXUpdatesUpdate *)launchableUpdateFromUpdates:(NSArray<ABI39_0_0EXUpdatesUpdate *> *)updates
{
  ABI39_0_0EXUpdatesUpdate *runnableUpdate;
  NSDate *runnableUpdateCommitTime;
  for (ABI39_0_0EXUpdatesUpdate *update in updates) {
    if (![_runtimeVersions containsObject:update.runtimeVersion]) {
      continue;
    }
    NSDate *commitTime = update.commitTime;
    if (!runnableUpdateCommitTime || [runnableUpdateCommitTime compare:commitTime] == NSOrderedAscending) {
      runnableUpdate = update;
      runnableUpdateCommitTime = commitTime;
    }
  }
  return runnableUpdate;
}

- (NSArray<ABI39_0_0EXUpdatesUpdate *> *)updatesToDeleteWithLaunchedUpdate:(ABI39_0_0EXUpdatesUpdate *)launchedUpdate updates:(NSArray<ABI39_0_0EXUpdatesUpdate *> *)updates
{
  if (!launchedUpdate) {
    return @[];
  }

  NSMutableArray<ABI39_0_0EXUpdatesUpdate *> *updatesToDelete = [NSMutableArray new];
  for (ABI39_0_0EXUpdatesUpdate *update in updates) {
    if ([launchedUpdate.commitTime compare:update.commitTime] == NSOrderedDescending) {
      [updatesToDelete addObject:update];
    }
  }
  return updatesToDelete;
}

- (BOOL)shouldLoadNewUpdate:(nullable ABI39_0_0EXUpdatesUpdate *)newUpdate withLaunchedUpdate:(nullable ABI39_0_0EXUpdatesUpdate *)launchedUpdate filters:(nullable NSDictionary *)filters
{
  if (!newUpdate) {
    return false;
  }
  if (!launchedUpdate) {
    return true;
  }
  return [launchedUpdate.commitTime compare:newUpdate.commitTime] == NSOrderedAscending;
}

@end

NS_ASSUME_NONNULL_END
