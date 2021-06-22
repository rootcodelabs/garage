# dependencies
1. react-native-permissions
2. 
2. Twillio Video React native

# install these before running the project
1. npm install react-native-permissions --save

    ``` ANDROID ```
    modify ```android manifest.xml``` and add these
     ```sh
    include ':react-native-camera'
    project(':react-native-camera').projectDir = new File(rootProject.projectDir,   '../node_modules/react-native-camera/android')
    ``` 

    ``` IOS ```
    modify ```ios podfile``` and add these
     ```sh
    permissions_path = '../node_modules/react-native-permissions/ios'

    pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
    pod 'Permission-Microphone', :path => "#{permissions_path}/Microphone"
    ``` 

    more information at ```https://github.com/zoontek/react-native-permissions```

2. npm install react-native-camera --save

    to link ```react-native link react-native-camera```

    ``` ANDROID ```
    modify ```android/app/build.gradle```
    and add the following lines to ```missingDimensionStrategy 'react-native-camera', 'general'``` insdie ```defaultConfig```
    
    ``` IOS ```
    ```sh
    cd ios && pod install
    ```  

    ** and please follow the instructions from this link https://react-native-camera.github.io/react-native-camera/docs/installation for more information


3. npm install react-native-sound-player

    For RN >= 0.60 you can skip this step.
    to link ```react-native link react-native-sound-player```

    after linking is complete, we will have to add the sound files to our specific android/ios projects

    ``` ANDROID ```
    on Android put the files inside ```{project_root}/android/app/src/main/res/raw/``` and if the 'raw' folder doesnt exist, pleasr create it.

    
    ``` IOS ```
    on IOS, open the project workspace with xCode and ```and add the necessary sound files and "Copy items if needed" option```
 
    ```sh
    NOTE - for this library to work without errors or warnings , we need to initially add 3 sound files named 'connecting.mp3', 'notification.mp3', 'ringing.mp3'
    ``` 

4. npm install react-native-vector-icons --save

    and follow the instructions in this URL to add cutom fonts to the android/ios projects
    ```https://github.com/oblador/react-native-vector-icons```

    ```sh
    NOTE - for this library to work without errors or warnings , we need to initially add font files 
    'SourceSansPro' and 'Kollektif'
    ``` 

5. npm i react-native-svg --save 

    add ```assets FOLDER``` inside project ```src``` folder and

    link ```react-native link react-native-svg```

    if linking doesnt work , please follow the instructions from the link ```https://www.npmjs.com/package/react-native-svg```

    ```sh
    NOTE - for this library to work without errors or warnings , we need to initially add a few svg files required as children components of the library.
    Please go through the 'usage' to see how the svgs have been included. 

    ``` 

6. npm i react-native-svg-transformer --save

    configure svg transformer by addig these in ```metro.config.js```

    ````sh
    const { assetExts, sourceExts } = require('metro-config/src/defaults/defaults');

    module.exports = {
        resolver: {
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
        transformer: {
            getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
            }),
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },  
    };
    ````

    ```TypeScript users```

    If you are using TypeScript, you need to add this to your declarations.d.ts file (create one if you don't have one already, but don't put in the root folder of your project):

      ```sh
    declare module "*.svg" {
        import React from 'react';
        import { SvgProps } from "react-native-svg";
        const content: React.FC<SvgProps>;
        export default content;
    }
    ``` 

7. npm install react-native-incall-manager

    follow the instructions in this link to configure ```https://github.com/react-native-webrtc/react-native-incall-manager```

8. npm install https://github.com/blackuy/react-native-twilio-video-webrtc --save

    follow the instructions in this URL to configure twilio video in the app
    ```https://github.com/blackuy/react-native-twilio-video-webrtc```


9. npm i react-native-twilio-video-callkit


# usage
1. ```import Video from 'react-native-twilio-video-callkit'```

    and use it 


    ```sh
     <Video
        twilioVideoRef={}
        videoStatus={}
        setVideoStatus={}
        currentCall={}
        currentCallType={}
        twillioTrack={}
        setTwillioTrack={}
        onCutCallAfterConnect={}
        dipatchOnCutCall={}
        dispatchOnCallIgnore={}
        dispatchOnCallAnswer={}
        handleCallDecline={}
        onMicSwitch={}
        isAudioEnabled={}
        onCameraSwitch={}
        soundPlayer={}
        appState={}
        inCallManager={}
        isHeadphoneConnected={false}
        isBluetoothConnected={false}
      >
        <!-- These are the svgs -->
        <CallCutIcon></CallCutIcon>
        <CallStartIcon></CallStartIcon>
        <SwitchCameraIcon></SwitchCameraIcon>
        <MuteIcon></MuteIcon>
        <MuteRed></MuteRed>
      </Video>
    ```


# IMPORTANT NOTE

Before running the example project, we need to setup firebase and include the 'google-services.json' in Android and 'GoogleService-Info.plist' in iOS (this is for push notification)

# props





## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
