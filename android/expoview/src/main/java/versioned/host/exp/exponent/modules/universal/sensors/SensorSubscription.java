package versioned.host.exp.exponent.modules.universal.sensors;

import expo.interfaces.sensors.SensorServiceSubscription;
import host.exp.exponent.kernel.services.sensors.SensorKernelServiceSubscription;

public class SensorSubscription implements SensorServiceSubscription {
  private SensorKernelServiceSubscription mSensorKernelServiceSubscription;

  public SensorSubscription(SensorKernelServiceSubscription subscription) {
    mSensorKernelServiceSubscription = subscription;
  }

  @Override
  public void start() {
    mSensorKernelServiceSubscription.start();
  }

  @Override
  public boolean isEnabled() {
    return mSensorKernelServiceSubscription.isEnabled();
  }

  @Override
  public Long getUpdateInterval() {
    return mSensorKernelServiceSubscription.getUpdateInterval();
  }

  @Override
  public void setUpdateInterval(long updateInterval) {
    mSensorKernelServiceSubscription.setUpdateInterval(updateInterval);
  }

  @Override
  public void stop() {
    mSensorKernelServiceSubscription.stop();
  }
}
