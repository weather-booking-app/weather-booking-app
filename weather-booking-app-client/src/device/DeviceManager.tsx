import { Preferences } from '@capacitor/preferences';

interface IDeviceManager {
    deviceId: string | Promise<string>
}

class DeviceManager implements IDeviceManager {
    private static instance: DeviceManager;
    deviceId: string | Promise<string>;

    private constructor() {
        // Prevent direct object creation
        this.deviceId = DeviceManager.getOrCreateDeviceId();
    }

    static getInstance(): DeviceManager {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
            DeviceManager.instance.deviceId = DeviceManager.getOrCreateDeviceId()
        }
        return DeviceManager.instance;
    }

    getDeviceId() {
        return this.deviceId;
    }


    static async updateDeviceId(newDeviceId?: string) {
        await Preferences.set({
            key: 'deviceId',
            value: newDeviceId ?? '',
        });
    }

    static async getOrCreateDeviceId(): Promise<string> {
        // Attempt to get existing deviceId
        const existingDeviceId = await Preferences.get({ key: 'deviceId' });

        if (existingDeviceId.value) {
            return existingDeviceId.value;
        }

        throw new Error('DeviceId not found');
    };
}

export default DeviceManager;
