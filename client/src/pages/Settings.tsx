import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Smartphone, Mail, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface NotificationSettings {
  pushNotifications: boolean;
  emailAlerts: boolean;
  smsAlerts: boolean;
  dailyReports: boolean;
  thresholdAlerts: boolean;
  thresholdValue: number[];
  alertTiming: string;
  location: string;
  phone: string;
  email: string;
}

export function Settings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailAlerts: false,
    smsAlerts: false,
    dailyReports: true,
    thresholdAlerts: true,
    thresholdValue: [100],
    alertTiming: 'immediate',
    location: 'Delhi, India',
    phone: '',
    email: ''
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key: keyof NotificationSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      thresholdValue: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Configure your notification preferences and alert settings
        </p>
      </motion.div>

      {/* Location Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Location Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Primary Location</Label>
              <Input
                id="location"
                value={settings.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter city name or PIN code"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Receive instant alerts on your device
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>

            {/* Email Alerts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-base font-medium">Email Alerts</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get air quality alerts via email
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={() => handleToggle('emailAlerts')}
              />
            </div>

            {/* SMS Alerts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-base font-medium">SMS Alerts</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Receive text message notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.smsAlerts}
                onCheckedChange={() => handleToggle('smsAlerts')}
              />
            </div>

            {/* Daily Reports */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-base font-medium">Daily Reports</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Daily air quality summary reports
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.dailyReports}
                onCheckedChange={() => handleToggle('dailyReports')}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alert Thresholds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Alert Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Threshold Alerts</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get notified when AQI exceeds your set threshold
                </p>
              </div>
              <Switch
                checked={settings.thresholdAlerts}
                onCheckedChange={() => handleToggle('thresholdAlerts')}
              />
            </div>

            {settings.thresholdAlerts && (
              <div className="space-y-4">
                <div>
                  <Label>AQI Threshold: {settings.thresholdValue[0]}</Label>
                  <div className="mt-2">
                    <Slider
                      value={settings.thresholdValue}
                      onValueChange={handleSliderChange}
                      max={300}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50 (Good)</span>
                    <span>150 (Unhealthy)</span>
                    <span>300 (Hazardous)</span>
                  </div>
                </div>

                <div>
                  <Label>Alert Timing</Label>
                  <Select value={settings.alertTiming} onValueChange={(value) => handleInputChange('alertTiming', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                disabled={!settings.emailAlerts}
                className={!settings.emailAlerts ? 'opacity-50' : ''}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 9876543210"
                disabled={!settings.smsAlerts}
                className={!settings.smsAlerts ? 'opacity-50' : ''}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex justify-end"
      >
        <Button size="lg" className="px-8">
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}