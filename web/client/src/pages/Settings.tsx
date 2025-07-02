import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Smartphone, Mail, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '../App';
import { supabase } from '../lib/supabaseClient';

interface NotificationSettings {
  pushNotifications: boolean;
  emailAlerts: boolean;
  smsAlerts: boolean;
  dailyReports: boolean;
  thresholdAlerts: boolean;
  thresholdValue: number[];
  alertTiming: string;
  location: string;
  email: string;
}

export function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailAlerts: false,
    smsAlerts: false,
    dailyReports: true,
    thresholdAlerts: true,
    thresholdValue: [100],
    alertTiming: 'immediate',
    location: 'Delhi, India',
    email: ''
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data,
          thresholdValue: data.alert_threshold ? [data.alert_threshold] : prev.thresholdValue,
        }));
      }
    };
    fetchUserProfile();
  }, [user]);

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

  // Geocode the location input
  async function geocodeLocation(input: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    }
    return null;
  }

  const handleSave = async () => {
    if (!user) return;
    setSaveStatus('idle');
    // Geocode the location before saving
    const geocoded = await geocodeLocation(settings.location);
    if (!geocoded) {
      setSaveStatus('error');
      // Optionally show error to user: "Location not found"
      return;
    }
    const updates = {
      location: geocoded, // Save the geocoded object
      alert_threshold: settings.thresholdValue[0],
    };
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);
    if (error) {
      setSaveStatus('error');
    } else {
      setSaveStatus('success');
    }
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  // Helper to get display name for location input
  function getLocationInputValue(location: string | { display_name?: string }) {
    if (typeof location === 'object' && location !== null && 'display_name' in location) {
      return location.display_name;
    }
    return location as string;
  }

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
                value={getLocationInputValue(settings.location)}
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
                placeholder={user?.email || 'your.email@example.com'}
                disabled={!settings.emailAlerts}
                className={!settings.emailAlerts ? 'opacity-50' : ''}
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
        className="flex flex-col items-end"
      >
        <div className="mb-2 h-6">
          {saveStatus === 'success' && <span className="text-green-600">Settings saved!</span>}
          {saveStatus === 'error' && <span className="text-red-600">Error saving settings.</span>}
        </div>
        <Button size="lg" className="px-8" onClick={handleSave}>
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}